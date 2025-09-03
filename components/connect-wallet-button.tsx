"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/app/providers"

export function ConnectWalletButton() {
  const { isConnected, address, connect, disconnect } = useWallet()

  if (isConnected && address) {
    return (
      <Button onClick={disconnect} variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
        {address}
      </Button>
    )
  }

  return (
    <Button onClick={connect} className="bg-purple-600 hover:bg-purple-700">
      Connect Wallet
    </Button>
  )
}
