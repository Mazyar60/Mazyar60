"use client"

import { useState } from "react"
import { ArrowUpDown, Settings, ChevronDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useTokenList } from "@/hooks/use-token-list"
import { useDexScreener } from "@/hooks/use-dex-screener"
import { WalletConnect } from "@/components/wallet-connect"
import type { Token } from "@/types/token"
import Link from "next/link"

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState("0.5")
  const [isFromTokenOpen, setIsFromTokenOpen] = useState(false)
  const [isToTokenOpen, setIsToTokenOpen] = useState(false)

  const { tokens, loading: tokensLoading } = useTokenList()
  const { prices } = useDexScreener(tokens)

  const handleSwapTokens = () => {
    const tempToken = fromToken
    const tempAmount = fromAmount
    setFromToken(toToken)
    setToToken(tempToken)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    // Simple mock calculation - in real app, you'd use DEX APIs
    if (value && fromToken && toToken) {
      const mockRate = 1.05 // Mock exchange rate
      setToAmount((Number.parseFloat(value) * mockRate).toFixed(6))
    } else {
      setToAmount("")
    }
  }

  const handleSwap = () => {
    if (!fromToken || !toToken) {
      alert("Please select both tokens")
      return
    }

    // Redirect to PancakeSwap with selected tokens
    const swapUrl = `https://pancakeswap.finance/swap?inputCurrency=${fromToken.address}&outputCurrency=${toToken.address}`
    window.open(swapUrl, "_blank")
  }

  const TokenSelector = ({
    selectedToken,
    onSelect,
    isOpen,
    setIsOpen,
    placeholder,
  }: {
    selectedToken: Token | null
    onSelect: (token: Token) => void
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    placeholder: string
  }) => (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-gray-800 border-gray-600 hover:bg-gray-700">
          {selectedToken ? (
            <div className="flex items-center space-x-2">
              <img
                src={selectedToken.icon || "/placeholder.svg"}
                alt={selectedToken.symbol}
                className="w-6 h-6 rounded-full"
              />
              <span>{selectedToken.symbol}</span>
            </div>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {tokens.map((token) => (
            <Button
              key={token.address}
              variant="ghost"
              className="w-full justify-start p-3 h-auto hover:bg-gray-800"
              onClick={() => {
                onSelect(token)
                setIsOpen(false)
              }}
            >
              <div className="flex items-center space-x-3">
                <img src={token.icon || "/placeholder.svg"} alt={token.symbol} className="w-8 h-8 rounded-full" />
                <div className="text-left">
                  <div className="font-medium">{token.symbol}</div>
                  <div className="text-sm text-gray-400">{token.name}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <img src="https://i.postimg.cc/dZGYw59D/logo.png" alt="RZ Oasis Logo" className="w-8 h-8 rounded-full" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                RZ Swap
              </h1>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Swap Tokens</CardTitle>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* From Token */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>From</span>
                  {fromToken && <span>Balance: 0.00</span>}
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => handleFromAmountChange(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white text-lg h-12"
                    />
                  </div>
                  <div className="w-32">
                    <TokenSelector
                      selectedToken={fromToken}
                      onSelect={setFromToken}
                      isOpen={isFromTokenOpen}
                      setIsOpen={setIsFromTokenOpen}
                      placeholder="Select"
                    />
                  </div>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSwapTokens}
                  className="rounded-full p-2 hover:bg-gray-800"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>

              {/* To Token */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>To</span>
                  {toToken && <span>Balance: 0.00</span>}
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={toAmount}
                      readOnly
                      className="bg-gray-800 border-gray-600 text-white text-lg h-12"
                    />
                  </div>
                  <div className="w-32">
                    <TokenSelector
                      selectedToken={toToken}
                      onSelect={setToToken}
                      isOpen={isToTokenOpen}
                      setIsOpen={setIsToTokenOpen}
                      placeholder="Select"
                    />
                  </div>
                </div>
              </div>

              {/* Swap Info */}
              {fromToken && toToken && fromAmount && (
                <div className="bg-gray-800 rounded-lg p-3 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rate</span>
                    <span>
                      1 {fromToken.symbol} = 1.05 {toToken.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Slippage</span>
                    <span>{slippage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Network Fee</span>
                    <span>~$0.50</span>
                  </div>
                </div>
              )}

              {/* Swap Button */}
              <Button
                onClick={handleSwap}
                disabled={!fromToken || !toToken || !fromAmount}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-400 h-12 text-lg active:scale-95 transition-all duration-150"
              >
                {!fromToken || !toToken ? "Select Tokens" : "Swap on PancakeSwap"}
              </Button>

              {/* Powered by */}
              <div className="text-center text-xs text-gray-500">Powered by PancakeSwap</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
