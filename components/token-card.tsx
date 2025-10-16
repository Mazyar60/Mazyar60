"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, BarChart3 } from "lucide-react"
import { Sparkline } from "./sparkline"
import type { Token } from "@/types/token"

interface TokenPrice {
  price: number
  change24h: number
  sparkline?: number[]
}

interface TokenCardProps {
  token: Token
  price?: TokenPrice
  onCardClick: () => void
  onCopyAddress: (address: string) => void
}

export function TokenCard({ token, price, onCardClick, onCopyAddress }: TokenCardProps) {
  const shortAddress = `${token.address.slice(0, 6)}...${token.address.slice(-4)}`

  const handleSwap = (e: React.MouseEvent) => {
    e.stopPropagation()
    const swapUrl = `https://pancakeswap.finance/swap?outputCurrency=${token.address}`
    window.open(swapUrl, "_blank")
  }

  const handleChart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (token.links?.dextools) {
      window.open(token.links.dextools, "_blank")
    } else {
      const chartUrl = `https://www.dextools.io/app/en/bnb/pair-explorer/${token.address}`
      window.open(chartUrl, "_blank")
    }
  }

  const handleExplorer = (e: React.MouseEvent) => {
    e.stopPropagation()
    const explorerUrl = `https://bscscan.com/token/${token.address}`
    window.open(explorerUrl, "_blank")
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(token.address)
    onCopyAddress(token.address)
  }

  return (
    <Card
      className="holographic bg-black/50 border-cyan-500/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:shadow-purple-500/30 backdrop-blur-sm neon-glow-purple group"
      onClick={onCardClick}
    >
      <CardContent className="p-6">
        {/* Token Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="relative">
            <img
              src={token.icon || "/placeholder.svg"}
              alt={token.name}
              className="w-12 h-12 rounded-full ring-2 ring-cyan-400/50 group-hover:ring-purple-400/50 transition-all"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/48x48/6b7280/ffffff?text=" + token.symbol.charAt(0)
              }}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white truncate group-hover:text-cyan-300 transition-colors">{token.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/50">
                {token.symbol}
              </Badge>
              <span className="text-xs text-cyan-400/60 font-mono">BSC</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 font-mono bg-gray-900/50 px-2 py-1 rounded border border-gray-700/50">
            {shortAddress}
          </p>
        </div>

        {/* Price and Chart */}
        {price ? (
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-cyan-300">${price.price.toFixed(6)}</span>
              <Badge
                variant={price.change24h >= 0 ? "default" : "destructive"}
                className={`text-xs ${price.change24h >= 0 ? "bg-green-500/20 text-green-300 border-green-500/50" : "bg-red-500/20 text-red-300 border-red-500/50"}`}
              >
                {price.change24h >= 0 ? "+" : ""}
                {price.change24h.toFixed(2)}%
              </Badge>
            </div>
            {price.sparkline && (
              <div className="h-16 rounded bg-gray-900/30 p-2">
                <Sparkline data={price.sparkline} color={price.change24h >= 0 ? "#10b981" : "#ef4444"} />
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4 h-20 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700/50 rounded w-20 mb-2"></div>
              <div className="h-12 bg-gray-700/50 rounded"></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="default"
            className="bg-gradient-to-r from-purple-600 to-magenta-600 hover:from-purple-700 hover:to-magenta-700 text-xs active:scale-95 transition-all duration-150 font-semibold"
            onClick={handleSwap}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Swap
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-cyan-500/50 hover:bg-cyan-500/20 text-xs bg-black/50 active:scale-95 transition-all duration-150 text-cyan-300"
            onClick={handleChart}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Chart
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-purple-500/50 hover:bg-purple-500/20 text-xs bg-black/50 active:scale-95 transition-all duration-150 text-purple-300"
            onClick={handleExplorer}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Explorer
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-magenta-500/50 hover:bg-magenta-500/20 text-xs bg-black/50 active:scale-95 transition-all duration-150 text-magenta-300"
            onClick={handleCopy}
          >
            <Copy className="w-3 h-3 mr-1" />
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
