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
      className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-purple-500/10"
      onClick={onCardClick}
    >
      <CardContent className="p-6">
        {/* Token Header */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={token.icon || "/placeholder.svg"}
            alt={token.name}
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/40x40/6b7280/ffffff?text=" + token.symbol.charAt(0)
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white truncate">{token.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="text-xs">
                {token.symbol}
              </Badge>
              <span className="text-xs text-gray-400">BSC</span>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 font-mono">{shortAddress}</p>
        </div>

        {/* Price and Chart */}
        {price ? (
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">${price.price.toFixed(6)}</span>
              <Badge
                variant={price.change24h >= 0 ? "default" : "destructive"}
                className={`text-xs ${price.change24h >= 0 ? "bg-green-600" : ""}`}
              >
                {price.change24h >= 0 ? "+" : ""}
                {price.change24h.toFixed(2)}%
              </Badge>
            </div>
            {price.sparkline && (
              <div className="h-16">
                <Sparkline data={price.sparkline} color={price.change24h >= 0 ? "#10b981" : "#ef4444"} />
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4 h-20 flex items-center justify-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded w-20 mb-2"></div>
              <div className="h-12 bg-gray-700 rounded"></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            size="sm"
            variant="default"
            className="bg-purple-600 hover:bg-purple-700 text-xs"
            onClick={handleSwap}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Swap
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 hover:bg-gray-800 text-xs bg-transparent"
            onClick={handleChart}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            Chart
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 hover:bg-gray-800 text-xs bg-transparent"
            onClick={handleExplorer}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Explorer
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-gray-600 hover:bg-gray-800 text-xs bg-transparent"
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
