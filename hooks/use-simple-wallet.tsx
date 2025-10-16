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
  const [isWalletAvailable, setIsWalletAvailable] = useState(false)

  useEffect(() => {
    const checkWalletAvailability = () => {
      if (typeof window !== "undefined" && window.ethereum) {
        setIsWalletAvailable(true)
        return true
      }
      return false
    }

    // Check immediately
    if (checkWalletAvailability()) {
      checkConnection()
    } else {
      // Wait a bit for wallet extension to load
      const timer = setTimeout(() => {
        if (checkWalletAvailability()) {
          checkConnection()
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
    // </CHANGE>

    async function checkConnection() {
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

      window.ethereum.on("connect", () => {
        setIsWalletAvailable(true)
      })
      // </CHANGE>
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
        window.ethereum.removeAllListeners("connect")
      }
    }
  }, [])

  const connect = async () => {
    const waitForWallet = async (maxAttempts = 5, delay = 500): Promise<boolean> => {
      for (let i = 0; i < maxAttempts; i++) {
        if (typeof window !== "undefined" && window.ethereum) {
          setIsWalletAvailable(true)
          return true
        }
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
      return false
    }

    const walletAvailable = await waitForWallet()

    if (!walletAvailable) {
      const error = new Error("No wallet detected. Please install MetaMask or another Web3 wallet extension.")
      throw error
    }
    // </CHANGE>

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      if (accounts.length > 0) {
        setIsConnected(true)
        setAddress(accounts[0])
        return accounts[0]
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error)
      if (error.code === 4001) {
        throw new Error("Connection request rejected. Please approve the connection in your wallet.")
      }
      throw error
      // </CHANGE>
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
    isWalletAvailable,
  }
}
