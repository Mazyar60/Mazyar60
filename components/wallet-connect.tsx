"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useState } from "react"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      // Fallback: open wallet selection modal
      window.open("https://metamask.io/download/", "_blank")
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress("")
  }

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""

  if (isConnected && address) {
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
    <Button onClick={connectWallet} className="bg-purple-600 hover:bg-purple-700">
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  )
}
