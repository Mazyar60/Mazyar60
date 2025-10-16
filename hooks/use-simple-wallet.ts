"use client"

import { useState, useEffect } from "react"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function useSimpleWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            setIsConnected(true)
            setAddress(accounts[0])
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    checkConnection()

    // Listen for account changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setIsConnected(true)
          setAddress(accounts[0])
        } else {
          setIsConnected(false)
          setAddress(null)
        }
      })
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
      }
    }
  }, [])

  const connect = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        if (accounts.length > 0) {
          setIsConnected(true)
          setAddress(accounts[0])
          return accounts[0]
        }
      } catch (error) {
        console.error("Error connecting wallet:", error)
        throw error
      }
    } else {
      throw new Error("MetaMask or compatible wallet not detected")
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
  }

  return {
    isConnected,
    address,
    connect,
    disconnect,
  }
}
