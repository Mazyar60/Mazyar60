"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { useAuth } from "@/contexts/auth-context"
import { useSession } from "next-auth/react"

interface StakingPosition {
  id: string
  planName: string
  token: "RZ" | "MGC"
  stakedAmount: number
  baseAPR: number
  dailyRate: number
  monthlyRate: number
  lockPeriod: number
  unlockDate: string
  totalEarned: number
  lastClaimDate: string
  status: "active" | "paused" | "unlocked"
  startDate: string
  pendingRewards: number
}

interface MiningContextType {
  positions: StakingPosition[]
  totalStaked: { rz: number; mgc: number }
  totalDailyYield: { rz: number; mgc: number }
  totalEarned: { rz: number; mgc: number }
  pendingRewards: { rz: number; mgc: number }
  activateStaking: (plan: any, token: "RZ" | "MGC", stakedAmount: number) => Promise<void>
  claimRewards: (positionId: string) => Promise<number>
  claimAllRewards: () => Promise<{ rz: number; mgc: number }>
  emergencyWithdraw: (positionId: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

const MiningContext = createContext<MiningContextType | undefined>(undefined)

export function useMining() {
  const context = useContext(MiningContext)
  if (context === undefined) {
    throw new Error("useMining must be used within a MiningProvider")
  }
  return context
}

interface MiningProviderProps {
  children: ReactNode
}

export function MiningProvider({ children }: MiningProviderProps) {
  const [positions, setPositions] = useState<StakingPosition[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { balance, isCorrectNetwork, address } = useWallet()
  const { user } = useAuth()
  const { data: session } = useSession()

  useEffect(() => {
    if (user) {
      const savedPositions = localStorage.getItem(`staking_positions_${user.id}`)
      if (savedPositions) {
        setPositions(JSON.parse(savedPositions))
      }
    }
  }, [user])

  useEffect(() => {
    if (user && positions.length > 0) {
      localStorage.setItem(`staking_positions_${user.id}`, JSON.stringify(positions))
    }
  }, [positions, user])

  useEffect(() => {
    const interval = setInterval(() => {
      updatePendingRewards()
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [positions])

  const updatePendingRewards = () => {
    setPositions((prevPositions) =>
      prevPositions.map((position) => {
        if (position.status !== "active") return position

        const now = new Date()
        const lastClaim = new Date(position.lastClaimDate)
        const timeDiff = now.getTime() - lastClaim.getTime()
        const daysPassed = timeDiff / (1000 * 60 * 60 * 24)

        if (daysPassed > 0) {
          const newRewards = (position.stakedAmount * position.dailyRate * daysPassed) / 100
          return {
            ...position,
            pendingRewards: newRewards,
          }
        }

        return position
      }),
    )
  }

  const activateStaking = async (plan: any, token: "RZ" | "MGC", stakedAmount: number) => {
    if (!session?.user?.id) {
      throw new Error("Please sign in to start staking")
    }

    if (!isCorrectNetwork) {
      throw new Error("Please switch to BNB Smart Chain network")
    }

    if (!address) {
      throw new Error("Wallet not connected")
    }

    setIsLoading(true)
    setError(null)

    try {
      const now = new Date()
      const unlockDate = new Date(now.getTime() + plan.lockPeriod * 24 * 60 * 60 * 1000)

      const response = await fetch("/api/miners/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planName: plan.name,
          token,
          stakedAmount,
          requiredBalance: plan.minStake,
          baseAPR: plan.baseAPR,
          dailyRate: plan.dailyRate,
          lockPeriod: plan.lockPeriod,
          unlockDate: unlockDate.toISOString(),
          upgradeThreshold: plan.maxStake * 1.5, // Set upgrade threshold 50% above max stake
          walletAddress: address,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to activate staking")
      }

      const { minerPlan } = await response.json()

      const newPosition: StakingPosition = {
        id: minerPlan.id,
        planName: minerPlan.planName,
        token: minerPlan.token,
        stakedAmount: minerPlan.stakedAmount,
        baseAPR: minerPlan.baseAPR,
        dailyRate: minerPlan.dailyRate,
        monthlyRate: minerPlan.baseAPR / 12,
        lockPeriod: minerPlan.lockPeriod,
        unlockDate: minerPlan.unlockDate,
        totalEarned: minerPlan.totalEarned,
        lastClaimDate: minerPlan.lastClaimDate,
        status: minerPlan.status,
        startDate: minerPlan.startDate,
        pendingRewards: 0,
      }

      setPositions((prev) => [...prev, newPosition])

      console.log("[v0] Miner plan activated:", minerPlan.id)
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const claimRewards = async (positionId: string): Promise<number> => {
    const position = positions.find((p) => p.id === positionId)
    if (!position) return 0

    const rewards = position.pendingRewards

    setPositions((prev) =>
      prev.map((p) =>
        p.id === positionId
          ? {
              ...p,
              lastClaimDate: new Date().toISOString(),
              totalEarned: p.totalEarned + rewards,
              pendingRewards: 0,
            }
          : p,
      ),
    )

    return rewards
  }

  const claimAllRewards = async (): Promise<{ rz: number; mgc: number }> => {
    let totalRZ = 0
    let totalMGC = 0

    for (const position of positions) {
      if (position.status === "active" && position.pendingRewards > 0) {
        const rewards = await claimRewards(position.id)
        if (position.token === "RZ") {
          totalRZ += rewards
        } else {
          totalMGC += rewards
        }
      }
    }

    return { rz: totalRZ, mgc: totalMGC }
  }

  const emergencyWithdraw = async (positionId: string) => {
    const position = positions.find((p) => p.id === positionId)
    if (!position) return

    // Emergency withdraw with penalty (lose pending rewards)
    setPositions((prev) => prev.filter((p) => p.id !== positionId))
  }

  // Calculate totals
  const totalStaked = positions.reduce(
    (acc, position) => {
      if (position.status === "active") {
        if (position.token === "RZ") {
          acc.rz += position.stakedAmount
        } else {
          acc.mgc += position.stakedAmount
        }
      }
      return acc
    },
    { rz: 0, mgc: 0 },
  )

  const totalDailyYield = positions.reduce(
    (acc, position) => {
      if (position.status === "active") {
        const dailyYield = (position.stakedAmount * position.dailyRate) / 100
        if (position.token === "RZ") {
          acc.rz += dailyYield
        } else {
          acc.mgc += dailyYield
        }
      }
      return acc
    },
    { rz: 0, mgc: 0 },
  )

  const totalEarned = positions.reduce(
    (acc, position) => {
      if (position.token === "RZ") {
        acc.rz += position.totalEarned
      } else {
        acc.mgc += position.totalEarned
      }
      return acc
    },
    { rz: 0, mgc: 0 },
  )

  const pendingRewards = positions.reduce(
    (acc, position) => {
      if (position.status === "active") {
        if (position.token === "RZ") {
          acc.rz += position.pendingRewards
        } else {
          acc.mgc += position.pendingRewards
        }
      }
      return acc
    },
    { rz: 0, mgc: 0 },
  )

  const value: MiningContextType = {
    positions,
    totalStaked,
    totalDailyYield,
    totalEarned,
    pendingRewards,
    activateStaking,
    claimRewards,
    claimAllRewards,
    emergencyWithdraw,
    isLoading,
    error,
  }

  return <MiningContext.Provider value={value}>{children}</MiningContext.Provider>
}
