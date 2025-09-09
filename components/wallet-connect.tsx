"use client"

import { useAppKit } from "@reown/appkit/react"
import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"

export function WalletConnect() {
  const { open } = useAppKit()
  const { isConnected, address } = useAccount()

  return (
    <Button
      onClick={() => open()}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium"
    >
      {isConnected ? `${address?.slice(0, 6)}...${address?.slice(-4)}` : "Connect Wallet"}
    </Button>
  )
}
