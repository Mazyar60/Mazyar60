"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Wallet, ExternalLink } from "lucide-react"

export function SimpleWalletConnect() {
  const [isOpen, setIsOpen] = useState(false)

  const wallets = [
    {
      name: "MetaMask",
      icon: "🦊",
      url: "https://metamask.io/download/",
      description: "Most popular Ethereum wallet",
    },
    {
      name: "Trust Wallet",
      icon: "🛡️",
      url: "https://trustwallet.com/",
      description: "Mobile-first crypto wallet",
    },
    {
      name: "Binance Wallet",
      icon: "🟡",
      url: "https://www.binance.org/en/smartChain",
      description: "Official Binance Smart Chain wallet",
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      url: "https://walletconnect.com/",
      description: "Connect any wallet via QR code",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">Choose Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-gray-400 mb-4">Select a wallet to connect to RZ Oasis and manage your tokens</p>

          {wallets.map((wallet) => (
            <div
              key={wallet.name}
              className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              onClick={() => window.open(wallet.url, "_blank")}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{wallet.icon}</span>
                <div>
                  <h3 className="font-medium text-white">{wallet.name}</h3>
                  <p className="text-xs text-gray-400">{wallet.description}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          ))}

          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400">
              💡 After installing a wallet, refresh this page and click "Connect Wallet" again to connect.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
