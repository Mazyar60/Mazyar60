"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Star, Gem } from "lucide-react"

interface VIPTier {
  id: string
  name: string
  price: number
  duration: string
  icon: any
  color: string
  benefits: string[]
  multiplier: number
  popular?: boolean
}

export function VIPTiers() {
  const [selectedTier, setSelectedTier] = useState<string>("gold")

  const tiers: VIPTier[] = [
    {
      id: "silver",
      name: "Silver VIP",
      price: 0.1,
      duration: "monthly",
      icon: Star,
      color: "from-gray-400 to-gray-600",
      multiplier: 1.25,
      benefits: [
        "+25% mining rewards",
        "Priority customer support",
        "Exclusive silver badge",
        "Weekly bonus rewards",
        "Access to VIP chat",
      ],
    },
    {
      id: "gold",
      name: "Gold VIP",
      price: 0.25,
      duration: "monthly",
      icon: Crown,
      color: "from-yellow-400 to-yellow-600",
      multiplier: 1.5,
      popular: true,
      benefits: [
        "+50% mining rewards",
        "Premium customer support",
        "Exclusive gold badge",
        "Daily bonus rewards",
        "VIP-only mining pools",
        "Advanced analytics",
        "Early access to features",
      ],
    },
    {
      id: "diamond",
      name: "Diamond VIP",
      price: 0.5,
      duration: "monthly",
      icon: Gem,
      color: "from-blue-400 to-purple-600",
      multiplier: 2.0,
      benefits: [
        "+100% mining rewards",
        "Dedicated account manager",
        "Exclusive diamond badge",
        "Hourly bonus rewards",
        "Private mining pools",
        "Custom analytics dashboard",
        "Beta feature access",
        "Monthly NFT airdrops",
        "Referral bonus boost",
      ],
    },
  ]

  const handleSubscribe = (tierId: string) => {
    // Handle VIP subscription logic
    console.log(`Subscribing to ${tierId} tier`)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative transition-all duration-300 cursor-pointer ${
              selectedTier === tier.id ? "ring-2 ring-primary shadow-lg scale-105" : "hover:shadow-md hover:scale-102"
            } ${tier.popular ? "border-primary/50" : "border-border/50"}`}
            onClick={() => setSelectedTier(tier.id)}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div
                className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4`}
              >
                <tier.icon className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
              <div className="text-3xl font-bold text-primary">
                {tier.price} <span className="text-sm text-muted-foreground">RZ/{tier.duration}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge variant="outline" className="text-primary border-primary">
                  {tier.multiplier}x Rewards Multiplier
                </Badge>
              </div>

              <ul className="space-y-2">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${selectedTier === tier.id ? "glow-effect" : ""}`}
                variant={selectedTier === tier.id ? "default" : "outline"}
                onClick={() => handleSubscribe(tier.id)}
              >
                {selectedTier === tier.id ? "Subscribe Now" : "Select Plan"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">VIP Lifetime Membership</h3>
              <p className="text-muted-foreground text-sm">
                Get permanent VIP benefits with a one-time payment. Limited time offer!
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">5.0 RZ</div>
              <div className="text-sm text-muted-foreground line-through">10.0 RZ</div>
              <Button className="mt-2 glow-effect">
                <Crown className="h-4 w-4 mr-2" />
                Get Lifetime
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
