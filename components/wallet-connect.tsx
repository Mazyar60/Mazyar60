"use client"

import { useSimpleWallet } from "@/hooks/use-simple-wallet"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function WalletConnect() {
  const { isConnected, address, connect, isWalletAvailable } = useSimpleWallet()
  const [error, setError] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setError(null)
    setIsConnecting(true)

    try {
      await connect()
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)
      setError(error.message || "Failed to connect wallet")

      // Show error for 5 seconds
      setTimeout(() => setError(null), 5000)
    } finally {
      setIsConnecting(false)
    }
    // </CHANGE>
  }

  return (
    <div className="relative">
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium disabled:opacity-50"
      >
        {isConnecting
          ? "Connecting..."
          : isConnected
            ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
            : "Connect Wallet"}
      </Button>

      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-500/90 text-white text-sm px-4 py-2 rounded-lg shadow-lg max-w-xs z-50">
          {error}
          {!isWalletAvailable && (
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 underline hover:text-gray-200"
            >
              Install MetaMask
            </a>
          )}
        </div>
      )}
      {/* </CHANGE> */}
    </div>
  )
}
