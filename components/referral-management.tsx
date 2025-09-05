"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Users, Copy, Share2, TrendingUp } from "lucide-react"
import { useState } from "react"

export function ReferralManagement() {
  const [copied, setCopied] = useState(false)
  const referralCode = "MINE2024XYZ"
  const referralLink = `https://coinminingrz.vercel.app/ref/${referralCode}`

  const referralStats = {
    level1: {
      count: 8,
      qualified: 5,
      earnings: "0.0234 RZ",
      bonus: "+0.008%",
    },
    level2: {
      count: 23,
      qualified: 12,
      earnings: "0.0089 RZ",
      bonus: "+0.012%",
    },
    totalBonus: "+0.020%",
    nextTierProgress: 65, // Progress towards next VIP tier
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Referral Program
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Referral Link */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Your Referral Link</label>
          <div className="flex gap-2">
            <Input value={referralLink} readOnly className="text-sm" />
            <Button variant="outline" size="sm" onClick={copyReferralLink}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          {copied && <p className="text-xs text-green-400">Link copied to clipboard!</p>}
        </div>

        {/* Total Bonus */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Monthly APR Bonus</p>
              <p className="text-2xl font-bold text-primary">{referralStats.totalBonus}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </div>

        {/* Referral Tiers */}
        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">Level 1 Referrals</h4>
              <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                {referralStats.level1.qualified}/{referralStats.level1.count} Qualified
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Referred</p>
                <p className="font-medium text-foreground">{referralStats.level1.count} friends</p>
              </div>
              <div>
                <p className="text-muted-foreground">APR Bonus</p>
                <p className="font-medium text-primary">{referralStats.level1.bonus}</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-background/50 border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">Level 2 Referrals</h4>
              <Badge variant="outline" className="text-green-400 border-green-400/30">
                {referralStats.level2.qualified}/{referralStats.level2.count} Qualified
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Referred</p>
                <p className="font-medium text-foreground">{referralStats.level2.count} friends</p>
              </div>
              <div>
                <p className="text-muted-foreground">APR Bonus</p>
                <p className="font-medium text-primary">{referralStats.level2.bonus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* VIP Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">VIP Qualification Progress</span>
            <span className="text-foreground">{referralStats.nextTierProgress}%</span>
          </div>
          <Progress value={referralStats.nextTierProgress} className="h-2" />
          <p className="text-xs text-muted-foreground">Reach +0.1% total bonus to unlock VIP Silver tier</p>
        </div>

        <Button className="w-full glow-effect">Share & Earn More</Button>
      </CardContent>
    </Card>
  )
}
