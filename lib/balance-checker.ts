import { PrismaClient } from "@prisma/client"
import { createPublicClient, http, formatEther } from "viem"
import { bsc } from "viem/chains"

const prisma = new PrismaClient()

// BSC RPC client for on-chain balance checks
const publicClient = createPublicClient({
  chain: bsc,
  transport: http("https://bsc-dataseed.binance.org/"),
})

// Token contract addresses
const TOKEN_CONTRACTS = {
  RZ: "0x6BC5AbCc56874D7fACb90C2c3812cc19aAf9B204",
  MGC: "0xbb73BB2505AC4643d5C0a99c2A1F34B3DfD09D11",
} as const

// ERC20 ABI for balance checking
const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
] as const

interface BalanceCheckResult {
  address: string
  token: "RZ" | "MGC"
  balance: number
  decision: "no_change" | "insufficient_balance" | "upgrade_available" | "miner_deactivated"
  planId?: string
}

export class BalanceChecker {
  private cache = new Map<string, { balance: number; timestamp: number }>()
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  async checkOnChainBalance(address: string, token: "RZ" | "MGC"): Promise<number> {
    const cacheKey = `${address}-${token}`
    const cached = this.cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      console.log(`[v0] Using cached balance for ${address} ${token}:`, cached.balance)
      return cached.balance
    }

    try {
      const contractAddress = TOKEN_CONTRACTS[token] as `0x${string}`

      const balance = await publicClient.readContract({
        address: contractAddress,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      })

      const balanceInTokens = Number(formatEther(balance))

      // Cache the result
      this.cache.set(cacheKey, { balance: balanceInTokens, timestamp: Date.now() })

      console.log(`[v0] Fetched on-chain balance for ${address} ${token}:`, balanceInTokens)
      return balanceInTokens
    } catch (error) {
      console.error(`Error fetching balance for ${address} ${token}:`, error)
      throw error
    }
  }

  async checkUserBalances(userId: string): Promise<BalanceCheckResult[]> {
    const results: BalanceCheckResult[] = []

    try {
      // Get user's active miner plans
      const activePlans = await prisma.minerPlan.findMany({
        where: {
          userId,
          status: "active",
        },
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      })

      if (activePlans.length === 0) {
        console.log(`[v0] No active plans found for user ${userId}`)
        return results
      }

      // Get wallet address from profile
      const walletAddress = activePlans[0].user.profile?.walletAddress
      if (!walletAddress) {
        console.log(`[v0] No wallet address found for user ${userId}`)
        return results
      }

      // Check balance for each active plan
      for (const plan of activePlans) {
        const token = plan.token as "RZ" | "MGC"

        try {
          const currentBalance = await this.checkOnChainBalance(walletAddress, token)
          let decision: BalanceCheckResult["decision"] = "no_change"

          // Policy Engine Logic
          if (currentBalance < plan.requiredBalance) {
            // Insufficient balance - deactivate miner
            await prisma.minerPlan.update({
              where: { id: plan.id },
              data: { status: "inactive" },
            })

            await this.createNotification(userId, {
              type: "miner_deactivated",
              title: "Miner Deactivated",
              message: `Your ${plan.planName} has been deactivated due to insufficient ${token} balance. Required: ${plan.requiredBalance}, Current: ${currentBalance.toFixed(2)}`,
              data: { planId: plan.id, token, requiredBalance: plan.requiredBalance, currentBalance },
            })

            decision = "miner_deactivated"
            console.log(`[v0] Deactivated plan ${plan.id} - insufficient balance`)
          } else if (plan.upgradeThreshold && currentBalance >= plan.upgradeThreshold) {
            // Balance increased - suggest upgrade
            await prisma.minerPlan.update({
              where: { id: plan.id },
              data: { upgradeSuggestion: true },
            })

            await this.createNotification(userId, {
              type: "upgrade_available",
              title: "Upgrade Available",
              message: `Your ${token} balance has increased! Consider upgrading your ${plan.planName} for better rewards.`,
              data: { planId: plan.id, token, currentBalance, upgradeThreshold: plan.upgradeThreshold },
            })

            decision = "upgrade_available"
            console.log(`[v0] Upgrade suggested for plan ${plan.id}`)
          }

          results.push({
            address: walletAddress,
            token,
            balance: currentBalance,
            decision,
            planId: plan.id,
          })

          // Create balance snapshot
          await prisma.balanceSnapshot.create({
            data: {
              userId,
              address: walletAddress,
              token,
              balance: currentBalance,
              decision,
              planId: plan.id,
            },
          })
        } catch (error) {
          console.error(`Error checking balance for plan ${plan.id}:`, error)

          // Create failed snapshot with retry logic
          await prisma.balanceSnapshot.create({
            data: {
              userId,
              address: walletAddress,
              token: plan.token,
              balance: 0,
              decision: "no_change",
              planId: plan.id,
              retryCount: 1,
            },
          })
        }
      }
    } catch (error) {
      console.error(`Error in checkUserBalances for ${userId}:`, error)
    }

    return results
  }

  private async createNotification(
    userId: string,
    notification: {
      type: string
      title: string
      message: string
      data?: any
    },
  ) {
    await prisma.notification.create({
      data: {
        userId,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        data: notification.data || {},
      },
    })
  }

  async runPolicyEngine(): Promise<void> {
    console.log("[v0] Starting policy engine run at", new Date().toISOString())

    try {
      // Get all users with active miner plans
      const usersWithActivePlans = await prisma.user.findMany({
        where: {
          minerPlans: {
            some: {
              status: "active",
            },
          },
        },
        select: {
          id: true,
          email: true,
        },
      })

      console.log(`[v0] Found ${usersWithActivePlans.length} users with active plans`)

      // Process each user with exponential backoff for rate limiting
      for (let i = 0; i < usersWithActivePlans.length; i++) {
        const user = usersWithActivePlans[i]

        try {
          const results = await this.checkUserBalances(user.id)
          console.log(`[v0] Processed user ${user.email}: ${results.length} plans checked`)

          // Add delay between users to avoid rate limiting
          if (i < usersWithActivePlans.length - 1) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        } catch (error) {
          console.error(`Error processing user ${user.email}:`, error)
        }
      }

      console.log("[v0] Policy engine run completed")
    } catch (error) {
      console.error("Error in policy engine:", error)
    }
  }

  async retryFailedChecks(): Promise<void> {
    const failedSnapshots = await prisma.balanceSnapshot.findMany({
      where: {
        retryCount: { gt: 0, lt: 3 }, // Retry up to 3 times
        timestamp: {
          lt: new Date(Date.now() - 10 * 60 * 1000), // Older than 10 minutes
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    })

    for (const snapshot of failedSnapshots) {
      try {
        if (snapshot.user.profile?.walletAddress) {
          await this.checkUserBalances(snapshot.userId)
        }
      } catch (error) {
        // Increment retry count
        await prisma.balanceSnapshot.update({
          where: { id: snapshot.id },
          data: { retryCount: snapshot.retryCount + 1 },
        })
      }
    }
  }
}
