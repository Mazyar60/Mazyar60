"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Zap, DollarSign, Clock } from "lucide-react"

export function MiningStats() {
  const [stats, setStats] = useState({
    totalHashRate: 235.5,
    totalEarnings: 0.069,
    dailyEarnings: 0.0234,
    powerConsumption: 3700,
    efficiency: 93.5,
    uptime: 98.8,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalHashRate: prev.totalHashRate + (Math.random() - 0.5) * 10,
        totalEarnings: prev.totalEarnings + Math.random() * 0.0001,
        dailyEarnings: prev.dailyEarnings + Math.random() * 0.0001,
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Mining Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">Total Hash Rate</span>
            </div>
            <p className="text-lg font-bold text-primary">{stats.totalHashRate.toFixed(1)} MH/s</p>
          </div>

          <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="text-xs text-muted-foreground">Total Earnings</span>
            </div>
            <p className="text-lg font-bold text-green-400">{stats.totalEarnings.toFixed(4)} RZ</p>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-muted-foreground">Daily Earnings</span>
            </div>
            <p className="text-lg font-bold text-blue-400">{stats.dailyEarnings.toFixed(4)} RZ</p>
          </div>

          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-orange-400" />
              <span className="text-xs text-muted-foreground">Power Usage</span>
            </div>
            <p className="text-lg font-bold text-orange-400">{stats.powerConsumption}W</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Mining Efficiency</span>
              <span className="text-primary">{stats.efficiency.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.efficiency}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>System Uptime</span>
              <span className="text-green-400">{stats.uptime}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.uptime}%` }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
