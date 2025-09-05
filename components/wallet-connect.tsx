"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Wallet, Check, ExternalLink } from "lucide-react"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if already connected
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setAccount(accounts[0])
        }
      } catch (error) {
        console.error("Error checking connection:", error)
      }
    }
  }

  const connectMetaMask = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        setIsConnecting(true)
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

        // Switch to BSC network
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x38" }], // BSC Mainnet
          })
        } catch (switchError: any) {
          // If BSC network is not added, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x38",
                  chainName: "Binance Smart Chain",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                  blockExplorerUrls: ["https://bscscan.com/"],
                },
              ],
            })
          }
        }

        setAccount(accounts[0])
        setIsOpen(false)
      } catch (error) {
        console.error("Error connecting to MetaMask:", error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      window.open("https://metamask.io/download/", "_blank")
    }
  }

  const connectTrustWallet = async () => {
    // Trust Wallet uses the same interface as MetaMask
    if (typeof window !== "undefined" && window.ethereum) {
      await connectMetaMask()
    } else {
      window.open("https://trustwallet.com/", "_blank")
    }
  }

  const disconnect = () => {
    setAccount(null)
  }

  const shortAddress = account ? `${account.slice(0, 6)}...${account.slice(-4)}` : ""

  if (account) {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2 bg-green-600/20 border border-green-600/30 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-green-400 font-mono">{shortAddress}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnect}
          className="border-gray-600 hover:bg-gray-800 text-xs bg-transparent"
        >
          Disconnect
        </Button>
      </div>
    )
  }

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
          <DialogTitle className="text-white">Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <p className="text-sm text-gray-400 mb-4">Connect your wallet to access RZ Oasis features</p>

          <Button
            onClick={connectMetaMask}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 text-left h-auto"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🦊</span>
              <div>
                <h3 className="font-medium text-white">MetaMask</h3>
                <p className="text-xs text-gray-400">Most popular Ethereum wallet</p>
              </div>
            </div>
            {typeof window !== "undefined" && window.ethereum ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <ExternalLink className="w-4 h-4 text-gray-400" />
            )}
          </Button>

          <Button
            onClick={connectTrustWallet}
            disabled={isConnecting}
            className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 text-left h-auto"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h3 className="font-medium text-white">Trust Wallet</h3>
                <p className="text-xs text-gray-400">Mobile-first crypto wallet</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </Button>

          <div className="mt-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-xs text-gray-400">
              💡 Make sure you're on the Binance Smart Chain (BSC) network to interact with RZ tokens.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
