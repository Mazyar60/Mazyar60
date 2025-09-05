"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, Users, TrendingUp, Gift, Share2, DollarSign } from "lucide-react"
import { Header } from "@/components/header"
import { useReferral } from "@/contexts/referral-context"
import { useAuth } from "@/contexts/auth-context"

export default function ReferralPage() {
  const { referralCode, referrals, totalReferrals, activeReferrals, monthlyReferralBonus, generateReferralLink } =
    useReferral()
  const { isAuthenticated } = useAuth()
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const link = generateReferralLink()
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Sign In Required</h1>
            <p className="text-muted-foreground">Please sign in to access the referral system.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Referral Program</h1>
          <p className="text-muted-foreground">
            Earn bonus yields by referring friends to CoinMining.Game. Get rewarded for every active referral!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Referrals</p>
                  <p className="text-2xl font-bold text-foreground">{totalReferrals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Referrals</p>
                  <p className="text-2xl font-bold text-foreground">{activeReferrals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Bonus</p>
                  <p className="text-2xl font-bold text-foreground">+{(monthlyReferralBonus * 100).toFixed(3)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Gift className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Referral Code</p>
                  <p className="text-2xl font-bold text-foreground">{referralCode}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Referral Link */}
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Your Referral Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={generateReferralLink()} readOnly className="flex-1" />
                <Button onClick={handleCopyLink} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-2">How it works:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Share your referral link with friends</li>
                  <li>• They sign up and invest ≥$1000 in mining</li>
                  <li>• You earn +0.01% monthly yield bonus per active referral</li>
                  <li>• Their referrals give you +0.001% monthly yield bonus</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Referral Tree */}
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Referral Tree
              </CardTitle>
            </CardHeader>
            <CardContent>
              {referrals.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No referrals yet</p>
                  <p className="text-sm text-muted-foreground">Share your link to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {referrals.map((referral) => (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {referral.firstName} {referral.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{referral.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={referral.isActive ? "default" : "secondary"}
                          className={
                            referral.isActive
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                          }
                        >
                          Level {referral.level}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${referral.totalInvested.toFixed(2)} invested
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bonus Structure */}
        <Card className="bg-card/80 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle>Referral Bonus Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-green-400 font-bold">L1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Direct Referrals</h4>
                    <p className="text-sm text-muted-foreground">+0.01% monthly yield per active referral</p>
                    <p className="text-xs text-green-400">Must invest ≥$1000 and keep miner active</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-blue-400 font-bold">L2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Indirect Referrals</h4>
                    <p className="text-sm text-muted-foreground">+0.001% monthly yield per active referral</p>
                    <p className="text-xs text-blue-400">Referrals of your referrals</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Safety Limits</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Maximum total monthly yield: 1.5%</li>
                  <li>• Base yield: 1% monthly</li>
                  <li>• Maximum bonus: 0.5% monthly</li>
                  <li>• Includes referral + social task bonuses</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
