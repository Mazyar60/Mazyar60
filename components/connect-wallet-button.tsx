"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useWallet } from "@/app/providers"
import { useTokenList } from "@/hooks/use-token-list"
import { Copy, Wallet, Plus, CheckCircle, AlertCircle } from "lucide-react"

export function ConnectWalletButton() {
  const { isConnected, address, activeSessions, connect, disconnect } = useWallet()
  const { tokens } = useTokenList()
  const [uriInput, setUriInput] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isImportingTokens, setIsImportingTokens] = useState(false)
  const [importResults, setImportResults] = useState<{ success: number; failed: number; total: number } | null>(null)

  const importAllTokens = async () => {
    if (!window.ethereum || !tokens.length) return

    setIsImportingTokens(true)
    setImportResults(null)

    let success = 0
    let failed = 0
    const total = tokens.length

    for (const token of tokens) {
      try {
        const wasAdded = await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: token.address,
              symbol: token.symbol,
              decimals: 18, // Default decimals for BSC tokens
              image: token.icon,
            },
          },
        })

        if (wasAdded) {
          success++
        } else {
          failed++
        }
      } catch (error) {
        console.error(`Failed to add token ${token.symbol}:`, error)
        failed++
      }

      // Small delay between requests to avoid overwhelming the wallet
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setImportResults({ success, failed, total })
    setIsImportingTokens(false)
  }

  const handleConnectFromQuery = async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const uri = urlParams.get("uri")
    if (uri) {
      await connect(uri)
      // Clear URI from URL after connecting
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }

  const handleManualConnect = async () => {
    if (uriInput.trim()) {
      await connect(uriInput.trim())
      setUriInput("")
      setIsDialogOpen(false)
    }
  }

  const handleDisconnect = async () => {
    await disconnect()
    setIsDialogOpen(false)
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search)
    const uri = urlParams.get("uri")
    if (uri && !isConnected) {
      handleConnectFromQuery()
    }
  }

  if (isConnected && address) {
    return (
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white">
            <Wallet className="w-4 h-4 mr-2" />
            {formatAddress(address)}
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Wallet Connected</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="font-mono text-sm">{address}</p>
              </div>
              <Button size="sm" variant="ghost" onClick={copyAddress} className="text-gray-400 hover:text-white">
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-white">RZ Tokens</p>
                  <p className="text-xs text-gray-400">Add all {tokens.length} RZ tokens to your wallet</p>
                </div>
                <Button
                  size="sm"
                  onClick={importAllTokens}
                  disabled={isImportingTokens || !window.ethereum}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isImportingTokens ? (
                    <>
                      <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin mr-1" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="w-3 h-3 mr-1" />
                      Add All
                    </>
                  )}
                </Button>
              </div>

              {importResults && (
                <div className="mt-2 p-2 bg-gray-700 rounded text-xs">
                  <div className="flex items-center gap-2">
                    {importResults.success > 0 && (
                      <div className="flex items-center text-green-400">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {importResults.success} added
                      </div>
                    )}
                    {importResults.failed > 0 && (
                      <div className="flex items-center text-red-400">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {importResults.failed} failed
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-400">Active Sessions: {Object.keys(activeSessions).length}</p>
              {Object.entries(activeSessions).map(([topic, session]) => (
                <div key={topic} className="p-2 bg-gray-800 rounded text-xs">
                  <div className="flex items-center justify-between">
                    <span>{session.peer?.metadata?.name || "Unknown dApp"}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => disconnect(topic)}
                      className="text-red-400 hover:text-red-300 h-6 px-2"
                    >
                      Disconnect
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={handleDisconnect} variant="destructive" className="flex-1">
                Disconnect All
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="flex-1 border-gray-700 hover:bg-gray-800"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Paste WalletConnect URI or scan QR code from dApp</p>
            <Input
              placeholder="wc:..."
              value={uriInput}
              onChange={(e) => setUriInput(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>

          <div className="space-y-3 text-sm text-gray-400">
            <div className="p-3 bg-gray-800 rounded-lg">
              <h4 className="font-medium text-white mb-1">Method 1: Direct Link</h4>
              <p>Click "Connect" in any dApp that supports WalletConnect</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <h4 className="font-medium text-white mb-1">Method 2: QR Code</h4>
              <p>Copy the WalletConnect URI from QR code and paste above</p>
            </div>
            <div className="p-3 bg-gray-800 rounded-lg">
              <h4 className="font-medium text-white mb-1">Method 3: URL Parameter</h4>
              <p>Visit: {window.location.origin}?uri=wc:...</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleManualConnect}
              disabled={!uriInput.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              Connect
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="flex-1 border-gray-700 hover:bg-gray-800"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
