"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Zap, Cpu, TrendingUp } from "lucide-react"
import { useMining, type MinerDevice } from "@/contexts/mining-context"
import { useState, useEffect } from "react"

interface MinerDeviceProps {
  miner: MinerDevice
}

export function MinerDeviceComponent({ miner }: MinerDeviceProps) {
  const { pauseMiner, resumeMiner, claimRewards } = useMining()
  const [currentRewards, setCurrentRewards] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Calculate pending rewards
  useEffect(() => {
    const calculatePendingRewards = () => {
      if (miner.status !== "active") return

      const now = new Date()
      const lastClaim = new Date(miner.lastClaimDate)
      const timeDiff = now.getTime() - lastClaim.getTime()
      const daysPassed = timeDiff / (1000 * 60 * 60 * 24)
      const pending = miner.stakedAmount * 0.00033 * daysPassed

      setCurrentRewards(pending)
    }

    calculatePendingRewards()
    const interval = setInterval(calculatePendingRewards, 1000)
    return () => clearInterval(interval)
  }, [miner])

  const handleToggleStatus = () => {
    if (miner.status === "active") {
      pauseMiner(miner.id)
    } else {
      resumeMiner(miner.id)
    }
  }

  const handleClaimRewards = async () => {
    setIsAnimating(true)
    try {
      await claimRewards(miner.id)
      setCurrentRewards(0)
    } finally {
      setTimeout(() => setIsAnimating(false), 2000)
    }
  }

  const getDeviceStyle = () => {
    switch (miner.visualType) {
      case "premium":
        return "bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30"
      case "advanced":
        return "bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30"
      default:
        return "bg-gradient-to-br from-gray-900/20 to-slate-900/20 border-gray-500/30"
    }
  }

  const getStatusColor = () => {
    switch (miner.status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "paused":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-red-500/20 text-red-400 border-red-500/30"
    }
  }

  return (
    <Card className={`${getDeviceStyle()} backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-serif font-bold text-foreground">{miner.name}</h3>
          <Badge className={getStatusColor()}>{miner.status.toUpperCase()}</Badge>
        </div>

        {/* Digital Display Screen */}
        <div className="bg-black/50 rounded-lg p-4 mb-4 border border-primary/20">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-xs text-muted-foreground mb-1">STAKED</div>
              <div className="text-primary font-mono text-lg font-bold">
                {miner.stakedAmount.toFixed(2)} {miner.token}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">HASH RATE</div>
              <div className="text-green-400 font-mono text-lg font-bold">{miner.hashRate}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">DAILY YIELD</div>
              <div className="text-blue-400 font-mono text-lg font-bold">
                {miner.dailyYield.toFixed(4)} {miner.token}
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">TOTAL MINED</div>
              <div className="text-purple-400 font-mono text-lg font-bold">
                {miner.totalMined.toFixed(4)} {miner.token}
              </div>
            </div>
          </div>

          {/* Pending Rewards Display */}
          <div className="mt-4 pt-4 border-t border-primary/20">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">PENDING REWARDS</div>
              <div
                className={`text-orange-400 font-mono text-xl font-bold ${
                  isAnimating ? "animate-pulse" : ""
                } ${miner.status === "active" ? "animate-pulse" : ""}`}
              >
                {currentRewards.toFixed(6)} {miner.token}
              </div>
            </div>
          </div>
        </div>

        {/* Miner Visual */}
        <div className="flex items-center justify-center mb-4">
          <div
            className={`w-16 h-16 rounded-lg flex items-center justify-center ${
              miner.status === "active" ? "animate-pulse" : ""
            } ${
              miner.visualType === "premium"
                ? "bg-purple-500/20"
                : miner.visualType === "advanced"
                  ? "bg-blue-500/20"
                  : "bg-gray-500/20"
            }`}
          >
            <Cpu
              className={`w-8 h-8 ${miner.status === "active" ? "text-primary animate-spin" : "text-muted-foreground"}`}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-muted-foreground">Power: {miner.power}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">1% Monthly</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleStatus}
            className="flex-1 bg-transparent"
            disabled={miner.status === "stopped"}
          >
            {miner.status === "active" ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Resume
              </>
            )}
          </Button>
          <Button
            size="sm"
            onClick={handleClaimRewards}
            disabled={currentRewards < 0.000001 || miner.status !== "active"}
            className="flex-1 glow-effect"
          >
            Claim Rewards
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
