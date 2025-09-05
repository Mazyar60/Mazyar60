"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePrice } from "@/contexts/price-context"
import { TrendingUp, TrendingDown, Wifi, WifiOff, RefreshCw } from "lucide-react"

export function LivePriceTicker() {
  const { prices, isLoading, error } = usePrice()

  const formatPrice = (price: number) => {
    return price < 1 ? price.toFixed(6) : price.toFixed(2)
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-400" : "text-red-400"
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
  }

  const isConnected = !error && !isLoading

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground">Live Prices</h3>
          <div className="flex items-center gap-1">
            {isLoading ? (
              <RefreshCw className="h-4 w-4 text-yellow-400 animate-spin" />
            ) : isConnected ? (
              <Wifi className="h-4 w-4 text-green-400" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-400" />
            )}
            <Badge
              variant="outline"
              className={
                isLoading
                  ? "text-yellow-400 border-yellow-400/30"
                  : isConnected
                    ? "text-green-400 border-green-400/30"
                    : "text-red-400 border-red-400/30"
              }
            >
              {isLoading ? "Loading" : isConnected ? "Live" : "Error"}
            </Badge>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-500/20 border border-red-500/30 rounded text-red-400 text-xs">{error}</div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">RZ Token</div>
            <div className="font-bold text-foreground digital-flicker">${formatPrice(prices.rz.price)}</div>
            <div className={`text-xs flex items-center justify-center gap-1 ${getChangeColor(prices.rz.change24h)}`}>
              {getChangeIcon(prices.rz.change24h)}
              {Math.abs(prices.rz.change24h).toFixed(1)}%
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">MGC Token</div>
            <div className="font-bold text-foreground digital-flicker">${formatPrice(prices.mgc.price)}</div>
            <div className={`text-xs flex items-center justify-center gap-1 ${getChangeColor(prices.mgc.change24h)}`}>
              {getChangeIcon(prices.mgc.change24h)}
              {Math.abs(prices.mgc.change24h).toFixed(1)}%
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">BNB</div>
            <div className="font-bold text-foreground digital-flicker">${formatPrice(prices.bnb.price)}</div>
            <div className={`text-xs flex items-center justify-center gap-1 ${getChangeColor(prices.bnb.change24h)}`}>
              {getChangeIcon(prices.bnb.change24h)}
              {Math.abs(prices.bnb.change24h).toFixed(1)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
