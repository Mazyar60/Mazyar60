import { NextResponse } from "next/server"
import { BalanceChecker } from "@/lib/balance-checker"

export const runtime = "nodejs"

export async function GET() {
  try {
    // Verify cron authorization (in production, use proper auth)
    const authHeader = process.env.CRON_SECRET
    if (authHeader && authHeader !== "your-cron-secret") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("[v0] Balance checker cron job started")

    const balanceChecker = new BalanceChecker()

    // Run main policy engine
    await balanceChecker.runPolicyEngine()

    // Retry any failed checks
    await balanceChecker.retryFailedChecks()

    console.log("[v0] Balance checker cron job completed")

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: "Balance check completed successfully",
    })
  } catch (error) {
    console.error("Balance check cron error:", error)
    return NextResponse.json(
      { error: "Balance check failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

export async function POST() {
  // Allow manual triggering via POST
  return GET()
}
