"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, Clock, TrendingUp, Settings } from "lucide-react"

export function ActiveMinersOverview() {
  const activeMiners = [
    {
      id: "quantum-1",
      name: "Quantum Miner Pro",
      status: "active",
      hashRate: "125.5 MH/s",
      efficiency: 94.2,
      dailyEarnings: "0.0234 RZ",
      timeRemaining: "6h 23m",
      progress: 75,
    },
    {
      id: "fusion-2",
      name: "Fusion Reactor X",
      status: "active",
      hashRate: "89.3 MH/s",
      efficiency: 91.8,
      dailyEarnings: "0.0187 RZ",
      timeRemaining: "2h 45m",
      progress: 88,
    },
    {
      id: "stellar-3",
      name: "Stellar Engine",
      status: "paused",
      hashRate: "0 MH/s",
      efficiency: 0,
      dailyEarnings: "0 RZ",
      timeRemaining: "Paused",
      progress: 45,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400 border-green-400/30"
      case "paused":
        return "text-yellow-400 border-yellow-400/30"
      case "inactive":
        return "text-red-400 border-red-400/30"
      default:
        return "text-gray-400 border-gray-400/30"
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Active Miners
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeMiners.map((miner) => (
          <div key={miner.id} className="p-4 rounded-lg bg-background/50 border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{miner.name}</h4>
                <p className="text-sm text-muted-foreground">{miner.hashRate}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getStatusColor(miner.status)}>
                  {miner.status}
                </Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-foreground">{miner.progress}%</span>
              </div>
              <Progress value={miner.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-primary/10">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Efficiency</span>
                </div>
                <p className="text-sm font-medium text-foreground">{miner.efficiency}%</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Time Left</span>
                </div>
                <p className="text-sm font-medium text-foreground">{miner.timeRemaining}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Daily</span>
                </div>
                <p className="text-sm font-medium text-foreground">{miner.dailyEarnings}</p>
              </div>
            </div>
          </div>
        ))}

        <Button className="w-full glow-effect">Manage All Miners</Button>
      </CardContent>
    </Card>
  )
}
