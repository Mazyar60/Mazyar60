import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"

export const runtime = "nodejs"

const prisma = new PrismaClient()

const activateSchema = z.object({
  planName: z.string(),
  token: z.enum(["RZ", "MGC"]),
  stakedAmount: z.number().positive(),
  requiredBalance: z.number().positive(),
  baseAPR: z.number().positive(),
  dailyRate: z.number().positive(),
  lockPeriod: z.number().positive(),
  unlockDate: z.string(),
  upgradeThreshold: z.number().positive().optional(),
  walletAddress: z.string(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const validatedData = activateSchema.parse(data)

    // Update user profile with wallet address if not set
    await prisma.profile.upsert({
      where: { userId: session.user.id },
      update: { walletAddress: validatedData.walletAddress },
      create: {
        userId: session.user.id,
        walletAddress: validatedData.walletAddress,
      },
    })

    // Create miner plan
    const minerPlan = await prisma.minerPlan.create({
      data: {
        userId: session.user.id,
        planName: validatedData.planName,
        token: validatedData.token,
        stakedAmount: validatedData.stakedAmount,
        requiredBalance: validatedData.requiredBalance,
        baseAPR: validatedData.baseAPR,
        dailyRate: validatedData.dailyRate,
        lockPeriod: validatedData.lockPeriod,
        unlockDate: new Date(validatedData.unlockDate),
        upgradeThreshold: validatedData.upgradeThreshold,
      },
    })

    console.log("[v0] Miner plan created:", minerPlan.id)

    return NextResponse.json({ minerPlan }, { status: 201 })
  } catch (error: any) {
    console.error("Error activating miner:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to activate miner" }, { status: 500 })
  }
}
