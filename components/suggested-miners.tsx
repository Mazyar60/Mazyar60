"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, Shield, Rocket, AlertCircle } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

export function SuggestedMiners() {
  const { isConnected, balance, connectWallet } = useWallet()

  const getMinersForBalance = () => {
    if (!isConnected) {
      return [
        {
          id: 1,
          name: "Connect Wallet",
          description: "Connect to see personalized suggestions",
          tokenType: "---",
          requiredBalance: "Connect Wallet",
          hashRate: "---",
          dailyReward: "---",
          multiplier: "---",
          risk: "---",
          icon: AlertCircle,
          color: "text-muted-foreground",
          bgColor: "from-muted/10 to-muted/5",
          borderColor: "border-muted/20",
          disabled: true,
        },
      ]
    }

    const miners = []

    // RZ Token Miners
    if (balance.rz >= 1000) {
      miners.push({
        id: 1,
        name: "Safe RZ Miner",
        description: "Near Balance (Safe)",
        tokenType: "RZ",
        requiredBalance: "1,000 RZ",
        hashRate: "2.5 TH/s",
        dailyReward: "50 RZ",
        multiplier: "×5",
        risk: "Low",
        icon: Shield,
        color: "text-green-400",
        bgColor: "from-green-500/10 to-green-600/5",
        borderColor: "border-green-500/20",
        disabled: false,
      })
    }

    if (balance.rz >= 500) {
      miners.push({
        id: 2,
        name: "Balanced RZ Miner",
        description: "Lower Balance (Balanced)",
        tokenType: "RZ",
        requiredBalance: "500 RZ",
        hashRate: "4.0 TH/s",
        dailyReward: "75 RZ",
        multiplier: "×5",
        risk: "Medium",
        icon: TrendingUp,
        color: "text-primary",
        bgColor: "from-primary/10 to-primary/5",
        borderColor: "border-primary/20",
        disabled: false,
      })
    }

    // MGC Token Miners
    if (balance.mgc >= 500) {
      miners.push({
        id: 3,
        name: "Safe MGC Miner",
        description: "Near Balance (Safe)",
        tokenType: "MGC",
        requiredBalance: "500 MGC",
        hashRate: "5.0 TH/s",
        dailyReward: "120 MGC",
        multiplier: "×10",
        risk: "Low",
        icon: Shield,
        color: "text-green-400",
        bgColor: "from-green-500/10 to-green-600/5",
        borderColor: "border-green-500/20",
        disabled: false,
      })
    }

    if (balance.mgc >= 100) {
      miners.push({
        id: 4,
        name: "Turbo MGC Miner",
        description: "Much Lower (Easy)",
        tokenType: "MGC",
        requiredBalance: "100 MGC",
        hashRate: "8.5 TH/s",
        dailyReward: "200 MGC",
        multiplier: "×10",
        risk: "High",
        icon: Rocket,
        color: "text-secondary",
        bgColor: "from-secondary/10 to-secondary/5",
        borderColor: "border-secondary/20",
        disabled: false,
      })
    }

    // If no miners available, show low-balance options
    if (miners.length === 0) {
      miners.push({
        id: 5,
        name: "Starter Miner",
        description: "Low Balance (Starter)",
        tokenType: "RZ/MGC",
        requiredBalance: "50 Tokens",
        hashRate: "1.0 TH/s",
        dailyReward: "10 Tokens",
        multiplier: "×2",
        risk: "Low",
        icon: Shield,
        color: "text-blue-400",
        bgColor: "from-blue-500/10 to-blue-600/5",
        borderColor: "border-blue-500/20",
        disabled: false,
      })
    }

    return miners.slice(0, 3) // Show max 3 suggestions
  }

  const suggestedMiners = getMinersForBalance()

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            {isConnected ? "Suggested for You" : "Connect Wallet"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Choose Your <span className="text-primary">Mining Rig</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isConnected
              ? "Our AI analyzes your wallet balance and suggests the perfect miners for optimal returns"
              : "Connect your wallet to see personalized mining recommendations based on your token balance"}
          </p>
        </div>

        {!isConnected && (
          <div className="text-center mb-8">
            <Button onClick={connectWallet} className="glow-effect">
              Connect Wallet to See Suggestions
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {suggestedMiners.map((miner) => (
            <Card
              key={miner.id}
              className={`relative bg-gradient-to-br ${miner.bgColor} border ${miner.borderColor} ${
                !miner.disabled ? "hover:glow-effect" : ""
              } transition-all duration-300 group ${miner.disabled ? "opacity-60" : ""}`}
            >
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${miner.bgColor} flex items-center justify-center mb-4 ${
                    !miner.disabled ? "group-hover:scale-110" : ""
                  } transition-transform`}
                >
                  <miner.icon className={`w-8 h-8 ${miner.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">{miner.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{miner.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Token Type</span>
                  <Badge variant="secondary" className={miner.color}>
                    {miner.tokenType} {miner.multiplier}
                  </Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Required Balance</span>
                  <span className="text-sm font-medium text-foreground">{miner.requiredBalance}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Hash Rate</span>
                  <span className="text-sm font-medium text-foreground">{miner.hashRate}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Daily Reward</span>
                  <span className={`text-sm font-bold ${miner.color}`}>{miner.dailyReward}</span>
                </div>

                {miner.risk !== "---" && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Risk Level</span>
                    <Badge
                      variant={miner.risk === "Low" ? "default" : miner.risk === "Medium" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {miner.risk}
                    </Badge>
                  </div>
                )}

                <Button
                  className={`w-full mt-6 ${!miner.disabled ? "glow-effect group-hover:scale-105" : ""} transition-transform`}
                  disabled={miner.disabled}
                  onClick={miner.disabled ? connectWallet : undefined}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {miner.disabled ? "Connect Wallet" : "Activate Miner"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">Don't see what you're looking for?</p>
          <Button variant="outline" size="lg" className="hover:glow-effect bg-transparent">
            View All Mining Plans
          </Button>
        </div>
      </div>
    </section>
  )
}
