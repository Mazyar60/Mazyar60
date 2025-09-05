"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Calendar, TrendingUp, Download } from "lucide-react"

export function RewardsHistory() {
  const rewardsHistory = [
    {
      id: "1",
      type: "Mining Reward",
      amount: "0.0234 RZ",
      usdValue: "$10.53",
      date: "2024-01-20",
      status: "claimed",
      source: "Quantum Miner Pro",
    },
    {
      id: "2",
      type: "Referral Bonus",
      amount: "0.0156 RZ",
      usdValue: "$7.02",
      date: "2024-01-19",
      status: "claimed",
      source: "Level 1 Referral",
    },
    {
      id: "3",
      type: "Achievement Reward",
      amount: "0.0089 RZ",
      usdValue: "$4.01",
      date: "2024-01-18",
      status: "claimed",
      source: "Week Warrior",
    },
    {
      id: "4",
      type: "Daily Challenge",
      amount: "0.0045 RZ",
      usdValue: "$2.03",
      date: "2024-01-17",
      status: "claimed",
      source: "Efficiency Master",
    },
    {
      id: "5",
      type: "VIP Bonus",
      amount: "0.0123 RZ",
      usdValue: "$5.54",
      date: "2024-01-16",
      status: "pending",
      source: "VIP Silver Tier",
    },
  ]

  const totalEarnings = rewardsHistory
    .filter((r) => r.status === "claimed")
    .reduce((sum, reward) => sum + Number.parseFloat(reward.amount.split(" ")[0]), 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "claimed":
        return "text-green-400 border-green-400/30"
      case "pending":
        return "text-yellow-400 border-yellow-400/30"
      case "expired":
        return "text-red-400 border-red-400/30"
      default:
        return "text-gray-400 border-gray-400/30"
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Rewards History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Claimed Rewards</p>
              <p className="text-xl font-bold text-foreground">{totalEarnings.toFixed(4)} RZ</p>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Rewards List */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {rewardsHistory.map((reward) => (
            <div key={reward.id} className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground">{reward.type}</h4>
                  <p className="text-sm text-muted-foreground">{reward.source}</p>
                </div>
                <Badge variant="outline" className={getStatusColor(reward.status)}>
                  {reward.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-primary">{reward.amount}</p>
                  <p className="text-sm text-muted-foreground">{reward.usdValue}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {new Date(reward.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          View All Rewards
        </Button>
      </CardContent>
    </Card>
  )
}
