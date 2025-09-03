"use client"
import { createContext, useContext, useState, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export function Providers({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connect = () => {
    // Mock wallet connection for development
    setIsConnected(true)
    setAddress("0x1234...5678")
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
  }

  const walletValue = {
    isConnected,
    address,
    connect,
    disconnect,
  }

  return <WalletContext.Provider value={walletValue}>{children}</WalletContext.Provider>
}
