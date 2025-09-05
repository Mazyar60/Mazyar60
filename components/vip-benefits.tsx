"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Gift, Zap, Shield, Star, Crown, Gem } from "lucide-react"

export function VIPBenefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Enhanced Rewards",
      description: "Earn up to 2x more tokens from all mining activities",
      tiers: ["Silver: +25%", "Gold: +50%", "Diamond: +100%"],
    },
    {
      icon: Users,
      title: "Exclusive Community",
      description: "Access to VIP-only chat rooms and private mining pools",
      tiers: ["All VIP tiers included"],
    },
    {
      icon: Gift,
      title: "Bonus Rewards",
      description: "Regular bonus drops and exclusive NFT airdrops",
      tiers: ["Weekly", "Daily", "Hourly"],
    },
    {
      icon: Zap,
      title: "Priority Mining",
      description: "Get priority access to the most profitable mining pools",
      tiers: ["Standard pools", "VIP pools", "Private pools"],
    },
    {
      icon: Shield,
      title: "Premium Support",
      description: "Dedicated customer support with faster response times",
      tiers: ["Priority", "Premium", "Dedicated manager"],
    },
    {
      icon: Star,
      title: "Early Access",
      description: "Be the first to try new features and mining algorithms",
      tiers: ["New features", "Beta access", "Alpha testing"],
    },
  ]

  const getTierIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Star className="h-4 w-4 text-gray-400" />
      case 1:
        return <Crown className="h-4 w-4 text-yellow-400" />
      case 2:
        return <Gem className="h-4 w-4 text-blue-400" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
          VIP <span className="text-primary">Benefits</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Unlock exclusive features and maximize your mining potential with our comprehensive VIP benefits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card
            key={index}
            className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <benefit.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">Tier Benefits:</h4>
                {benefit.tiers.map((tier, tierIndex) => (
                  <div key={tierIndex} className="flex items-center gap-2">
                    {getTierIcon(tierIndex)}
                    <span className="text-sm text-muted-foreground">{tier}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/10 border-primary/30">
        <CardContent className="p-8 text-center">
          <Crown className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Go VIP?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Join thousands of miners who have already upgraded their experience with VIP membership
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                <Users className="h-3 w-3 mr-1" />
                12,847 VIP Members
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                2.3x Avg. Earnings
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
