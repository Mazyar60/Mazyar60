"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRealtime } from "@/contexts/realtime-context"
import { Activity, Users, Zap, Target } from "lucide-react"

export function LiveMiningStats() {
  const { miningPools, liveStats } = useRealtime()

  const formatHashRate = (hashRate: number) => {
    if (hashRate >= 1000) {
      return `${(hashRate / 1000).toFixed(1)}K MH/s`
    }
    return `${hashRate.toFixed(1)} MH/s`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Live Network Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Global Hash Rate</span>
            </div>
            <div className="text-lg font-bold text-primary">{formatHashRate(liveStats.globalHashRate)}</div>
          </div>

          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-green-400" />
              <span className="text-xs text-muted-foreground">Active Miners</span>
            </div>
            <div className="text-lg font-bold text-green-400">{formatNumber(liveStats.totalMiners)}</div>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-muted-foreground">Blocks Found</span>
            </div>
            <div className="text-lg font-bold text-blue-400">{formatNumber(liveStats.blocksFound)}</div>
          </div>

          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-orange-400" />
              <span className="text-xs text-muted-foreground">Next Block</span>
            </div>
            <div className="text-lg font-bold text-orange-400">{miningPools.nextBlock.toFixed(0)}%</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pool Hash Rate</span>
            <span className="text-primary">{formatHashRate(miningPools.totalHashRate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Pool Miners</span>
            <span className="text-foreground">{formatNumber(miningPools.activeMiners)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Block Reward</span>
            <span className="text-secondary">{miningPools.blockReward} RZ</span>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network Status</span>
            <Badge className="bg-green-500 text-white">
              <Activity className="h-3 w-3 mr-1" />
              Healthy
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
