"use client"

import { useState } from "react"
import { useSimpleWallet } from "@/hooks/use-simple-wallet"
import { WalletConnect } from "@/components/wallet-connect"
import {
  Search,
  ExternalLink,
  Share2,
  BarChart3,
  Globe,
  Plus,
  TrendingUp,
  Gamepad2,
  Crown,
  Users,
  Sparkles,
} from "lucide-react"
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
  const { isConnected } = useSimpleWallet()
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
    if (!isConnected) {
      alert("Please connect your wallet first to add tokens")
      return
    }

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
        alert("Failed to add token to wallet. Please try again.")
      }
    } else {
      alert("MetaMask or compatible wallet not detected")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      <header className="border-b border-cyan-500/20 bg-black/80 backdrop-blur-xl sticky top-0 z-40 neon-glow-cyan">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="https://i.postimg.cc/dZGYw59D/logo.png"
                  alt="RZ Oasis Logo"
                  className="w-12 h-12 rounded-full ring-2 ring-cyan-400 ring-offset-2 ring-offset-black"
                />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-magenta-400 bg-clip-text text-transparent">
                  RZ OASIS
                </h1>
                <p className="text-xs text-cyan-400/60 font-mono">ENTER THE METAVERSE</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      <div className="relative overflow-hidden border-b border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-magenta-300 bg-clip-text text-transparent">
              Welcome to the Oasis
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Explore infinite worlds of gaming, DeFi, and digital innovation in the RZ metaverse ecosystem
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 bg-black/50 backdrop-blur h-14 neon-glow-purple transition-all"
                onClick={() => window.open("/community", "_self")}
              >
                <Users className="w-5 h-5 mr-2" />
                Community
              </Button>
              <Button
                variant="outline"
                className="border-green-500/50 text-green-300 hover:bg-green-500/20 hover:border-green-400 bg-black/50 backdrop-blur h-14 transition-all"
                onClick={() => window.open("https://dex.rz.game", "_blank")}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                DEX
              </Button>
              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 bg-black/50 backdrop-blur h-14 neon-glow-cyan transition-all"
                onClick={() => window.open("https://ranking.game", "_blank")}
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Gaming
              </Button>
              <Button
                variant="outline"
                className="border-yellow-500/50 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-400 bg-black/50 backdrop-blur h-14 transition-all"
                onClick={() => window.open("https://rzprime.com", "_blank")}
              >
                <Crown className="w-5 h-5 mr-2" />
                Prime
              </Button>
            </div>

            <Link href="/platforms">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 via-purple-500 to-magenta-500 hover:from-cyan-600 hover:via-purple-600 hover:to-magenta-600 text-white px-10 py-6 text-lg font-bold shadow-lg shadow-purple-500/50 neon-glow-purple"
              >
                <Globe className="w-6 h-6 mr-3" />
                Explore All Platforms
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Digital Assets
              </h2>
              <p className="text-gray-400 text-sm font-mono">POWERED BY BLOCKCHAIN TECHNOLOGY</p>
            </div>
          </div>

          <div className="relative max-w-2xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search tokens by name, symbol, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-black/50 border-cyan-500/30 text-white placeholder-gray-500 focus:border-cyan-400 h-14 text-lg backdrop-blur neon-glow-cyan"
            />
          </div>
        </div>

        {/* Token Grid */}
        {tokensLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="bg-gray-900/50 border-gray-700/50 animate-pulse backdrop-blur">
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700/50 rounded mb-4"></div>
                  <div className="h-20 bg-gray-700/50 rounded mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-700/50 rounded flex-1"></div>
                    <div className="h-8 bg-gray-700/50 rounded flex-1"></div>
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
                price={getTokenPrice(token)}
                onCardClick={() => setSelectedToken(token)}
                onCopyAddress={handleCopyAddress}
              />
            ))}
          </div>
        )}

        {filteredTokens.length === 0 && !tokensLoading && (
          <div className="text-center py-20">
            <div className="inline-block p-8 rounded-lg bg-gray-900/50 border border-gray-700/50 backdrop-blur">
              <p className="text-gray-400 text-xl mb-2">No tokens found</p>
              <p className="text-gray-500 text-sm">Try adjusting your search query</p>
            </div>
          </div>
        )}
      </main>

      {/* Token Details Modal */}
      <Dialog open={!!selectedToken} onOpenChange={() => setSelectedToken(null)}>
        <DialogContent className="bg-black/95 border-cyan-500/30 text-white max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl neon-glow-cyan">
          {selectedToken && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <img
                    src={selectedToken.icon || "/placeholder.svg"}
                    alt={selectedToken.name}
                    className="w-10 h-10 rounded-full ring-2 ring-cyan-400"
                  />
                  <div>
                    <span className="text-2xl bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                      {selectedToken.name}
                    </span>
                    <Badge variant="secondary" className="ml-3 bg-purple-500/20 text-purple-300 border-purple-500/50">
                      {selectedToken.symbol}
                    </Badge>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Price and Chart */}
                {getTokenPrice(selectedToken) && (
                  <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-cyan-300">
                        ${getTokenPrice(selectedToken)!.price.toFixed(6)}
                      </span>
                      <Badge
                        variant={getTokenPrice(selectedToken)!.change24h >= 0 ? "default" : "destructive"}
                        className={`text-sm ${getTokenPrice(selectedToken)!.change24h >= 0 ? "bg-green-500/20 text-green-300 border-green-500/50" : "bg-red-500/20 text-red-300 border-red-500/50"}`}
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
                    className="bg-gradient-to-r from-purple-600 to-magenta-600 hover:from-purple-700 hover:to-magenta-700 active:scale-95 transition-all duration-150 neon-glow-purple"
                    onClick={() => handleSwap(selectedToken)}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Swap
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-500/50 hover:bg-cyan-500/20 bg-black/50 active:scale-95 transition-all duration-150 text-cyan-300"
                    onClick={() => handleChart(selectedToken)}
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Chart
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-500/50 hover:bg-purple-500/20 bg-black/50 active:scale-95 transition-all duration-150 text-purple-300"
                    onClick={() => handleExplorer(selectedToken)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Explorer
                  </Button>
                  {selectedToken.links?.website && (
                    <Button
                      variant="outline"
                      className="border-green-500/50 hover:bg-green-500/20 bg-black/50 active:scale-95 transition-all duration-150 text-green-300"
                      onClick={() => handleWebsite(selectedToken)}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="border-yellow-500/50 hover:bg-yellow-500/20 bg-black/50 active:scale-95 transition-all duration-150 text-yellow-300"
                    onClick={() => handleCoinMarketCap(selectedToken)}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    CoinMarketCap
                  </Button>
                  <Button
                    variant="outline"
                    className="border-magenta-500/50 hover:bg-magenta-500/20 bg-black/50 active:scale-95 transition-all duration-150 text-magenta-300"
                    onClick={() => handleAddToWallet(selectedToken)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Wallet
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-500/50 hover:bg-cyan-500/20 col-span-2 bg-black/50 active:scale-95 transition-all duration-150 text-cyan-300"
                    onClick={() => handleShare(selectedToken)}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                <Separator className="bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                {/* Token Details */}
                <div className="space-y-4 p-4 rounded-lg bg-gray-900/30 border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-cyan-300">Token Details</h3>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Chain:</span>
                      <span className="text-purple-300 font-semibold">BSC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Address:</span>
                      <span className="font-mono text-xs break-all text-cyan-300">{selectedToken.address}</span>
                    </div>
                  </div>
                </div>

                {/* Token Profile */}
                {selectedToken.metadata && (
                  <>
                    <Separator className="bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                    <div className="space-y-4 p-4 rounded-lg bg-gray-900/30 border border-gray-700/30">
                      <h3 className="text-lg font-semibold text-purple-300">Token Profile</h3>
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        {selectedToken.metadata.supply && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Total Supply:</span>
                            <span className="text-cyan-300 font-semibold">
                              {selectedToken.metadata.supply.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {selectedToken.metadata.burn && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Burn:</span>
                            <span className="text-magenta-300 font-semibold">{selectedToken.metadata.burn}</span>
                          </div>
                        )}
                        {selectedToken.metadata.vesting && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Vesting:</span>
                            <span className="text-purple-300 font-semibold">{selectedToken.metadata.vesting}</span>
                          </div>
                        )}
                        {selectedToken.metadata.audit && (
                          <div className="flex justify-between">
                            <span className="text-gray-400">Audit Status:</span>
                            <Badge variant="outline" className="border-green-500/50 text-green-300 bg-green-500/10">
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
