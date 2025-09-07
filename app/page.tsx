"use client"

import { useState } from "react"
import { WalletConnect } from "@/components/wallet-connect"
import { Search, ExternalLink, Share2, BarChart3, Globe, Plus, TrendingUp, Gamepad2, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useTokenList } from "@/hooks/use-token-list"
import { useDexScreener } from "@/hooks/use-dex-screener"
import { TokenCard } from "@/components/token-card"
import { Sparkline } from "@/components/sparkline"
import type { Token } from "@/types/token"
import Link from "next/link"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedToken, setSelectedToken] = useState<Token | null>(null)
  const { tokens, loading: tokensLoading } = useTokenList()
  const { prices, loading: pricesLoading } = useDexScreener(tokens)

  const getTokenPrice = (token: Token) => {
    return prices[token.address.toLowerCase()] || prices[token.address]
  }

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.address.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
    // You could add a toast notification here
  }

  const handleShare = async (token: Token) => {
    if (typeof window !== "undefined" && navigator.share) {
      await navigator.share({
        title: `${token.name} (${token.symbol})`,
        text: `Check out ${token.name} on RZ Oasis`,
        url: window.location.href,
      })
    } else if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleSwap = (token: Token) => {
    const swapUrl = `https://pancakeswap.finance/swap?outputCurrency=${token.address}`
    window.open(swapUrl, "_blank")
  }

  const handleChart = (token: Token) => {
    if (token.links?.dextools) {
      window.open(token.links.dextools, "_blank")
    } else {
      const chartUrl = `https://www.dextools.io/app/en/bnb/pair-explorer/${token.address}`
      window.open(chartUrl, "_blank")
    }
  }

  const handleExplorer = (token: Token) => {
    const explorerUrl = `https://bscscan.com/token/${token.address}`
    window.open(explorerUrl, "_blank")
  }

  const handleCoinMarketCap = (token: Token) => {
    const tokenSlug =
      token.symbol.toLowerCase() === "rz"
        ? "rzcoin"
        : token.symbol.toLowerCase() === "mgc"
          ? "metagamescoin"
          : token.name.toLowerCase().replace(/\s+/g, "-")
    const cmcUrl = `https://coinmarketcap.com/currencies/${tokenSlug}/`
    window.open(cmcUrl, "_blank")
  }

  const handleWebsite = (token: Token) => {
    if (token.links?.website) {
      window.open(token.links.website, "_blank")
    }
  }

  const handleAddToWallet = async (token: Token) => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: token.address,
              symbol: token.symbol,
              decimals: 18,
              image: token.icon,
            },
          },
        })
      } catch (error) {
        console.error("Failed to add token to wallet:", error)
      }
    } else {
      alert("Please connect your wallet first to add tokens")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://i.postimg.cc/dZGYw59D/logo.png"
                alt="RZ Oasis Logo"
                className="w-10 h-10 rounded-full"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                RZ Oasis
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Platforms Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              RZ Ecosystem
            </h2>
          </div>
          <p className="text-gray-400 text-lg mb-8 max-w-3xl">
            Discover the complete RZ ecosystem with innovative platforms for gaming, DeFi, mining, and social
            interaction.
          </p>

          {/* Quick Platform Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link href="/swap">
              <Button
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500/10 bg-transparent h-12 w-full"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Swap
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-500/10 bg-transparent h-12"
              onClick={() => window.open("https://dex.rz.game", "_blank")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              DEX
            </Button>
            <Button
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-500/10 bg-transparent h-12"
              onClick={() => window.open("https://ranking.game", "_blank")}
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Gaming
            </Button>
            <Button
              variant="outline"
              className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 bg-transparent h-12"
              onClick={() => window.open("https://rzprime.com", "_blank")}
            >
              <Crown className="w-4 h-4 mr-2" />
              Prime
            </Button>
          </div>

          <div className="flex justify-center mb-8">
            <Link href="/platforms">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold"
              >
                <Globe className="w-5 h-5 mr-3" />
                Explore Platforms
              </Button>
            </Link>
          </div>
        </div>

        {/* Tokens Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            RZ Tokens
          </h2>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search tokens by name, symbol, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Token Grid */}
        {tokensLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="bg-gray-900 border-gray-700 animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded mb-4"></div>
                  <div className="h-20 bg-gray-700 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-700 rounded flex-1"></div>
                    <div className="h-8 bg-gray-700 rounded flex-1"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTokens.map((token) => (
              <TokenCard
                key={token.address}
                token={token}
                price={getTokenPrice(token)} // Use helper function for consistent address lookup
                onCardClick={() => setSelectedToken(token)}
                onCopyAddress={handleCopyAddress}
              />
            ))}
          </div>
        )}

        {filteredTokens.length === 0 && !tokensLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tokens found matching your search.</p>
          </div>
        )}
      </main>

      {/* Token Details Modal */}
      <Dialog open={!!selectedToken} onOpenChange={() => setSelectedToken(null)}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedToken && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <img
                    src={selectedToken.icon || "/placeholder.svg"}
                    alt={selectedToken.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <span className="text-xl">{selectedToken.name}</span>
                    <Badge variant="secondary" className="ml-2">
                      {selectedToken.symbol}
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Price and Chart */}
                {getTokenPrice(selectedToken) && ( // Use helper function here too
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">${getTokenPrice(selectedToken)!.price.toFixed(6)}</span>
                      <Badge
                        variant={getTokenPrice(selectedToken)!.change24h >= 0 ? "default" : "destructive"}
                        className={getTokenPrice(selectedToken)!.change24h >= 0 ? "bg-green-600" : ""}
                      >
                        {getTokenPrice(selectedToken)!.change24h >= 0 ? "+" : ""}
                        {getTokenPrice(selectedToken)!.change24h.toFixed(2)}%
                      </Badge>
                    </div>
                    {getTokenPrice(selectedToken)!.sparkline && (
                      <div className="h-24">
                        <Sparkline
                          data={getTokenPrice(selectedToken)!.sparkline!}
                          color={getTokenPrice(selectedToken)!.change24h >= 0 ? "#10b981" : "#ef4444"}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="default"
                    className="bg-purple-600 hover:bg-purple-700 active:scale-95 transition-all duration-150"
                    onClick={() => handleSwap(selectedToken)}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Swap
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-800 bg-transparent active:scale-95 transition-all duration-150"
                    onClick={() => handleChart(selectedToken)}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Chart
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-800 bg-transparent active:scale-95 transition-all duration-150"
                    onClick={() => handleExplorer(selectedToken)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Explorer
                  </Button>
                  {selectedToken.links?.website && (
                    <Button
                      variant="outline"
                      className="border-gray-600 hover:bg-gray-800 bg-transparent active:scale-95 transition-all duration-150"
                      onClick={() => handleWebsite(selectedToken)}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-800 bg-transparent active:scale-95 transition-all duration-150"
                    onClick={() => handleCoinMarketCap(selectedToken)}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    CoinMarketCap
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-800 bg-transparent active:scale-95 transition-all duration-150"
                    onClick={() => handleAddToWallet(selectedToken)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Wallet
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 hover:bg-gray-800 col-span-2 bg-transparent active:scale-95 transition-all duration-150"
                    onClick={() => handleShare(selectedToken)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Separator className="bg-gray-700" />

                {/* Token Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Token Details</h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Chain:</span>
                      <span>BSC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Address:</span>
                      <span className="font-mono text-xs break-all">{selectedToken.address}</span>
                    </div>
                  </div>
                </div>

                {/* Token Profile */}
                {selectedToken.metadata && (
                  <>
                    <Separator className="bg-gray-700" />
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Token Profile</h3>
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        {selectedToken.metadata.supply && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Supply:</span>
                            <span>{selectedToken.metadata.supply.toLocaleString()}</span>
                          </div>
                        )}
                        {selectedToken.metadata.burn && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Burn:</span>
                            <span>{selectedToken.metadata.burn}</span>
                          </div>
                        )}
                        {selectedToken.metadata.vesting && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Vesting:</span>
                            <span>{selectedToken.metadata.vesting}</span>
                          </div>
                        )}
                        {selectedToken.metadata.audit && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Audit Status:</span>
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              {selectedToken.metadata.audit}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
