"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calculator, Info } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { useMining } from "@/contexts/mining-context"
import { useAuth } from "@/contexts/auth-context"
import { usePrice } from "@/contexts/price-context"
import { useState } from "react"

const stakingPlans = [
  {
    id: 1,
    name: "Starter Plan",
    minStake: 100,
    maxStake: 999,
    baseAPR: 12, // 12% annual
    dailyRate: 0.0329, // 12% / 365 days
    monthlyRate: 1.0, // 12% / 12 months
    lockPeriod: 30, // 30 days minimum
    status: "available",
    description: "Perfect for beginners",
  },
  {
    id: 2,
    name: "Basic Plan",
    minStake: 1000,
    maxStake: 4999,
    baseAPR: 15, // 15% annual
    dailyRate: 0.0411, // 15% / 365 days
    monthlyRate: 1.25, // 15% / 12 months
    lockPeriod: 60, // 60 days minimum
    status: "available",
    description: "Great for steady growth",
  },
  {
    id: 3,
    name: "Standard Plan",
    minStake: 5000,
    maxStake: 9999,
    baseAPR: 18, // 18% annual
    dailyRate: 0.0493, // 18% / 365 days
    monthlyRate: 1.5, // 18% / 12 months
    lockPeriod: 90, // 90 days minimum
    status: "popular",
    description: "Most popular choice",
  },
  {
    id: 4,
    name: "Pro Plan",
    minStake: 10000,
    maxStake: 24999,
    baseAPR: 22, // 22% annual
    dailyRate: 0.0603, // 22% / 365 days
    monthlyRate: 1.83, // 22% / 12 months
    lockPeriod: 120, // 120 days minimum
    status: "popular",
    description: "Professional tier rewards",
  },
  {
    id: 5,
    name: "Elite Plan",
    minStake: 25000,
    maxStake: 49999,
    baseAPR: 25, // 25% annual
    dailyRate: 0.0685, // 25% / 365 days
    monthlyRate: 2.08, // 25% / 12 months
    lockPeriod: 180, // 180 days minimum
    status: "premium",
    description: "Elite level returns",
  },
  {
    id: 6,
    name: "Master Plan",
    minStake: 50000,
    maxStake: 99999,
    baseAPR: 28, // 28% annual
    dailyRate: 0.0767, // 28% / 365 days
    monthlyRate: 2.33, // 28% / 12 months
    lockPeriod: 365, // 1 year minimum
    status: "premium",
    description: "Master tier exclusive",
  },
  {
    id: 7,
    name: "Ultimate Plan",
    minStake: 100000,
    maxStake: 1000000,
    baseAPR: 30, // 30% annual
    dailyRate: 0.0822, // 30% / 365 days
    monthlyRate: 2.5, // 30% / 12 months
    lockPeriod: 365, // 1 year minimum
    status: "premium",
    description: "Ultimate rewards tier",
  },
]

export function MiningPlans() {
  const { isConnected, balance, connectWallet, isCorrectNetwork, switchToBSC } = useWallet()
  const { activateStaking, isLoading } = useMining()
  const { isAuthenticated } = useAuth()
  const { prices } = usePrice()
  const [selectedToken, setSelectedToken] = useState<"RZ" | "MGC">("RZ")
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [stakeAmount, setStakeAmount] = useState<string>("")

  const currentBalance = selectedToken === "RZ" ? balance.rz : balance.mgc
  const tokenPrice = selectedToken === "RZ" ? prices.rz.price : prices.mgc.price

  const calculateReturns = (plan: (typeof stakingPlans)[0], amount: number) => {
    const dailyReturn = (amount * plan.dailyRate) / 100
    const monthlyReturn = (amount * plan.monthlyRate) / 100
    const annualReturn = (amount * plan.baseAPR) / 100

    return {
      daily: dailyReturn,
      monthly: monthlyReturn,
      annual: annualReturn,
      dailyUSD: dailyReturn * tokenPrice,
      monthlyUSD: monthlyReturn * tokenPrice,
      annualUSD: annualReturn * tokenPrice,
    }
  }

  const handleStakeActivation = async (plan: (typeof stakingPlans)[0]) => {
    if (!isAuthenticated) {
      alert("Please sign in first to start staking")
      return
    }

    if (!isConnected) {
      connectWallet()
      return
    }

    if (!isCorrectNetwork) {
      switchToBSC()
      return
    }

    const amount = Number.parseFloat(stakeAmount)
    if (!amount || amount < plan.minStake || amount > plan.maxStake) {
      alert(`Please enter an amount between ${plan.minStake} and ${plan.maxStake} ${selectedToken}`)
      return
    }

    if (currentBalance < amount) {
      alert(
        `Insufficient ${selectedToken} balance. You need ${amount} ${selectedToken} but have ${currentBalance.toFixed(2)} ${selectedToken}`,
      )
      return
    }

    setSelectedPlan(plan.id)
    try {
      await activateStaking(plan, selectedToken, amount)
      alert(`Successfully activated ${selectedToken} staking! Check your miners page to monitor progress.`)
      setStakeAmount("")
    } catch (error: any) {
      alert(`Failed to activate staking: ${error.message}`)
    } finally {
      setSelectedPlan(null)
    }
  }

  const getAffordablePlans = () => {
    return stakingPlans.filter((plan) => currentBalance >= plan.minStake)
  }

  return (
    <section id="mining" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Staking Plans</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stake your RZ or MGC tokens to earn guaranteed daily rewards. All plans feature transparent APR calculations
            with no hidden fees.
          </p>
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-primary/20">
          <div className="flex items-center gap-2 mb-4">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">How APR Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" />
              <span>
                <strong>Daily Rate:</strong> APR ÷ 365 days
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-green-400" />
              <span>
                <strong>Monthly Rate:</strong> APR ÷ 12 months
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-400" />
              <span>
                <strong>Compound:</strong> Rewards auto-compound daily
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-card/50 rounded-lg p-1 flex gap-1">
            <Button
              variant={selectedToken === "RZ" ? "default" : "ghost"}
              onClick={() => setSelectedToken("RZ")}
              className="px-6"
            >
              RZ Staking ({prices.rz.price > 0 ? `$${prices.rz.price.toFixed(6)}` : "Loading..."})
            </Button>
            <Button
              variant={selectedToken === "MGC" ? "default" : "ghost"}
              onClick={() => setSelectedToken("MGC")}
              className="px-6"
            >
              MGC Staking ({prices.mgc.price > 0 ? `$${prices.mgc.price.toFixed(6)}` : "Loading..."})
            </Button>
          </div>
        </div>

        {isConnected && (
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Your {selectedToken} Balance:{" "}
              <span className="text-primary font-bold">
                {currentBalance.toFixed(2)} {selectedToken}
              </span>
              {tokenPrice > 0 && (
                <span className="text-muted-foreground ml-2">(≈ ${(currentBalance * tokenPrice).toFixed(2)} USD)</span>
              )}
            </p>
            {!isCorrectNetwork && (
              <div className="mt-2 p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400">
                Please switch to BNB Smart Chain network to continue
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakingPlans.map((plan) => {
            const canAfford = isConnected && currentBalance >= plan.minStake
            const sampleAmount = Math.min(plan.minStake * 2, currentBalance)
            const returns = calculateReturns(plan, sampleAmount)

            return (
              <Card
                key={plan.id}
                className={`bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 ${
                  plan.status === "popular" ? "ring-2 ring-primary/50 glow-effect" : ""
                } ${!canAfford && isConnected ? "opacity-60" : ""}`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg font-serif font-semibold">{plan.name}</CardTitle>
                    {plan.status === "popular" && (
                      <Badge variant="secondary" className="text-xs">
                        Popular
                      </Badge>
                    )}
                    {plan.status === "premium" && <Badge className="text-xs bg-primary">Premium</Badge>}
                  </div>
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">APR:</span>
                      <span className="font-bold text-green-400">{plan.baseAPR}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Daily Rate:</span>
                      <span className="font-medium text-foreground">{plan.dailyRate.toFixed(4)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Rate:</span>
                      <span className="font-medium text-foreground">{plan.monthlyRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Min Stake:</span>
                      <span className="font-medium text-primary">
                        {plan.minStake.toLocaleString()} {selectedToken}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lock Period:</span>
                      <span className="font-medium text-foreground">{plan.lockPeriod} days</span>
                    </div>
                  </div>

                  {canAfford && sampleAmount >= plan.minStake && (
                    <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                      <div className="text-xs text-muted-foreground text-center mb-2">
                        Example: {sampleAmount.toLocaleString()} {selectedToken} stake
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Daily:</span>
                          <div className="font-medium">
                            {returns.daily.toFixed(2)} {selectedToken}
                          </div>
                          {tokenPrice > 0 && (
                            <div className="text-muted-foreground">${returns.dailyUSD.toFixed(2)}</div>
                          )}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Monthly:</span>
                          <div className="font-medium">
                            {returns.monthly.toFixed(2)} {selectedToken}
                          </div>
                          {tokenPrice > 0 && (
                            <div className="text-muted-foreground">${returns.monthlyUSD.toFixed(2)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {canAfford && (
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder={`Enter amount (${plan.minStake}-${plan.maxStake.toLocaleString()})`}
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        min={plan.minStake}
                        max={Math.min(plan.maxStake, currentBalance)}
                        className="w-full px-3 py-2 bg-background/50 border border-border rounded-md text-sm"
                      />
                    </div>
                  )}

                  <Button
                    className="w-full"
                    variant={plan.status === "popular" ? "default" : "outline"}
                    onClick={() => handleStakeActivation(plan)}
                    disabled={
                      selectedPlan === plan.id ||
                      (!canAfford && isConnected) ||
                      isLoading ||
                      !stakeAmount ||
                      Number.parseFloat(stakeAmount) < plan.minStake ||
                      Number.parseFloat(stakeAmount) > plan.maxStake
                    }
                  >
                    {!isAuthenticated
                      ? "Sign In Required"
                      : !isConnected
                        ? "Connect Wallet"
                        : !isCorrectNetwork
                          ? "Switch to BSC"
                          : selectedPlan === plan.id
                            ? "Activating..."
                            : !canAfford
                              ? "Insufficient Balance"
                              : !stakeAmount
                                ? "Enter Amount"
                                : "Start Staking"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
