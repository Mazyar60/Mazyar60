"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/contexts/wallet-context"
import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export function LiveBalances() {
  const { balance, isConnected, isCorrectNetwork } = useWallet()

  const balanceItems = [
    {
      token: "BNB",
      amount: balance.bnb,
      symbol: "BNB",
      change: "+2.5%",
      changeType: "positive" as const,
      usdValue: balance.bnb * 320, // Mock USD conversion
    },
    {
      token: "RZ Token",
      amount: balance.rz,
      symbol: "RZ",
      change: "+8.2%",
      changeType: "positive" as const,
      usdValue: balance.rz * 0.45, // Mock USD conversion
    },
    {
      token: "MGC Token",
      amount: balance.mgc,
      symbol: "MGC",
      change: "-1.3%",
      changeType: "negative" as const,
      usdValue: balance.mgc * 0.12, // Mock USD conversion
    },
  ]

  const totalUSDValue = balanceItems.reduce((sum, item) => sum + item.usdValue, 0)

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-primary" />
          Live Balances
          {isConnected && isCorrectNetwork && (
            <Badge variant="outline" className="text-green-400 border-green-400/30">
              Live
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Connect your wallet to view balances</p>
          </div>
        ) : !isCorrectNetwork ? (
          <div className="text-center py-8">
            <p className="text-yellow-400">Please switch to BSC network</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Total Portfolio Value */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-foreground">${totalUSDValue.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Individual Balances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {balanceItems.map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/50 border border-primary/10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{item.token}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          item.changeType === "positive"
                            ? "text-green-400 border-green-400/30"
                            : "text-red-400 border-red-400/30"
                        }`}
                      >
                        {item.changeType === "positive" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {item.change}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-foreground">
                        {item.amount.toFixed(6)} {item.symbol}
                      </p>
                      <p className="text-sm text-muted-foreground">≈ ${item.usdValue.toFixed(2)} USD</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
