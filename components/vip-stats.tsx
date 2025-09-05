"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Crown, TrendingUp, Users, Calendar } from "lucide-react"

export function VIPStats() {
  const currentTier = "Gold VIP"
  const memberSince = "Dec 2023"
  const renewalDate = "Jan 25, 2024"
  const vipProgress = 75 // Progress towards next tier

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5 text-primary" />
          Your VIP Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center mb-3">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground">{currentTier}</h3>
          <Badge variant="outline" className="mt-2 text-primary border-primary">
            Active Member
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Member Since</span>
            <span className="font-medium text-foreground">{memberSince}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next Renewal</span>
            <span className="font-medium text-foreground">{renewalDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Rewards Multiplier</span>
            <Badge className="bg-green-500 text-white">1.5x</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress to Diamond</span>
            <span className="text-primary">{vipProgress}%</span>
          </div>
          <Progress value={vipProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">Earn 250 more XP to unlock Diamond VIP benefits</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary/20">
          <div className="text-center">
            <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-400">+47%</div>
            <div className="text-xs text-muted-foreground">Extra Earnings</div>
          </div>
          <div className="text-center">
            <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-blue-400">VIP</div>
            <div className="text-xs text-muted-foreground">Pool Access</div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">This Month's Benefits</span>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>• +0.234 RZ bonus earnings</div>
            <div>• 3 exclusive NFT drops</div>
            <div>• Priority support (avg 2min response)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
