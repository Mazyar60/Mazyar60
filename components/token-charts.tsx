"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Activity, Zap, DollarSign, RefreshCw, ExternalLink } from "lucide-react"
import { usePrice } from "@/contexts/price-context"

export function TokenCharts() {
  const { prices, isLoading, error, refreshPrices } = usePrice()

  const formatPrice = (price: number) => {
    return price < 1 ? price.toFixed(6) : price.toFixed(4)
  }

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`
    return `$${volume.toFixed(0)}`
  }

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000) return `$${(marketCap / 1000000).toFixed(1)}M`
    if (marketCap >= 1000) return `$${(marketCap / 1000).toFixed(1)}K`
    return `$${marketCap.toFixed(0)}`
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-green-400" : "text-red-400"
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-green-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Live Token Analytics
            </h2>
            <Button
              onClick={refreshPrices}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="border-primary/30 hover:border-primary/50 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real-time trading data and performance metrics for MGC and RZ tokens powered by DEX APIs
          </p>
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* MGC Token Chart */}
          <Card className="border-purple-500/30 bg-card/80 backdrop-blur-md hover:border-purple-500/50 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-shadow">
                      <span className="text-white font-bold">M</span>
                    </div>
                    <div>
                      <div className="text-xl">MGC Token</div>
                      <div className="text-sm text-purple-400 font-mono digital-flicker">
                        ${formatPrice(prices.mgc.price)}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${getChangeColor(prices.mgc.change24h)}`}>
                        {getChangeIcon(prices.mgc.change24h)}
                        {Math.abs(prices.mgc.change24h).toFixed(2)}% 24h
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription className="mt-2">MetaGamescoin - Gaming Rewards Token</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                  <Zap className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Contract Address</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      window.open(`https://bscscan.com/token/0xbb73BB2505AC4643d5C0a99c2A1F34B3DfD09D11`, "_blank")
                    }
                    className="h-6 px-2 text-xs"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                <div className="font-mono text-sm break-all text-purple-300">
                  0xbb73BB2505AC4643d5C0a99c2A1F34B3DfD09D11
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">24h Volume</div>
                  <div className="text-sm font-bold text-purple-400">{formatVolume(prices.mgc.volume24h)}</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="text-sm font-bold text-purple-400">{formatMarketCap(prices.mgc.marketCap)}</div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg border-2 border-purple-500/30 shadow-lg hover:shadow-purple-500/20 transition-shadow">
                <iframe
                  id="mgc-dextools-widget"
                  title="MGC DEXTools Trading Chart"
                  width="100%"
                  height="400"
                  src="https://www.dextools.io/widget-chart/en/bnb/pe-light/0x0b32ea94da1f6679b11686ead47aa4c6bf38cd59?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false"
                  className="border-0"
                />
              </div>
            </CardContent>
          </Card>

          {/* RZ Token Chart */}
          <Card className="border-orange-500/30 bg-card/80 backdrop-blur-md hover:border-orange-500/50 transition-all duration-300 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25 transition-shadow">
                      <span className="text-white font-bold">R</span>
                    </div>
                    <div>
                      <div className="text-xl">RZ Token</div>
                      <div className="text-sm text-orange-400 font-mono digital-flicker">
                        ${formatPrice(prices.rz.price)}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${getChangeColor(prices.rz.change24h)}`}>
                        {getChangeIcon(prices.rz.change24h)}
                        {Math.abs(prices.rz.change24h).toFixed(2)}% 24h
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription className="mt-2">RZ - Mining Utility Token</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30 animate-pulse">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-muted/50 rounded-lg border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Contract Address</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      window.open(`https://bscscan.com/token/0x6BC5AbCc56874D7fACb90C2c3812cc19aAf9B204`, "_blank")
                    }
                    className="h-6 px-2 text-xs"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
                <div className="font-mono text-sm break-all text-orange-300">
                  0x6BC5AbCc56874D7fACb90C2c3812cc19aAf9B204
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">24h Volume</div>
                  <div className="text-sm font-bold text-orange-400">{formatVolume(prices.rz.volume24h)}</div>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">Market Cap</div>
                  <div className="text-sm font-bold text-orange-400">{formatMarketCap(prices.rz.marketCap)}</div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-lg border-2 border-orange-500/30 shadow-lg hover:shadow-orange-500/20 transition-shadow">
                <iframe
                  id="rz-dextools-widget"
                  title="RZ DEXTools Trading Chart"
                  width="100%"
                  height="400"
                  src="https://www.dextools.io/widget-chart/en/bnb/pe-light/0x771e1c638a9409bfc93158588f1745f638f4d10b?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false"
                  className="border-0"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">MGC Price</p>
                  <p className="text-3xl font-bold text-purple-400 digital-flicker">${formatPrice(prices.mgc.price)}</p>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${getChangeColor(prices.mgc.change24h)}`}>
                    {getChangeIcon(prices.mgc.change24h)}
                    {Math.abs(prices.mgc.change24h).toFixed(2)}% 24h
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">RZ Price</p>
                  <p className="text-3xl font-bold text-orange-400 digital-flicker">${formatPrice(prices.rz.price)}</p>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${getChangeColor(prices.rz.change24h)}`}>
                    {getChangeIcon(prices.rz.change24h)}
                    {Math.abs(prices.rz.change24h).toFixed(2)}% 24h
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition-colors">
                  <DollarSign className="w-6 h-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">24h Volume</p>
                  <p className="text-3xl font-bold text-green-400 digital-flicker">
                    {formatVolume(prices.mgc.volume24h + prices.rz.volume24h)}
                  </p>
                  <p className="text-xs text-green-400 mt-1">Combined</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wide">BNB Price</p>
                  <p className="text-3xl font-bold text-blue-400 digital-flicker">${formatPrice(prices.bnb.price)}</p>
                  <p className={`text-xs mt-1 flex items-center gap-1 ${getChangeColor(prices.bnb.change24h)}`}>
                    {getChangeIcon(prices.bnb.change24h)}
                    {Math.abs(prices.bnb.change24h).toFixed(2)}% 24h
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
