"use client"

import { useSimpleWallet } from "@/hooks/use-simple-wallet"
import { Button } from "@/components/ui/button"

export function WalletConnect() {
  const { isConnected, address, connect } = useSimpleWallet()

  const handleConnect = async () => {
    try {
      await connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  return (
    <Button
      onClick={handleConnect}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
    >
      {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
    </Button>
  )
}
