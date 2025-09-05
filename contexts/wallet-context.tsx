"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAccount, useBalance, useDisconnect, useChainId, useSwitchChain } from "wagmi"
import { useAppKit } from "@reown/appkit/react"
import { formatEther } from "viem"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  chainId: number | null
  isCorrectNetwork: boolean
  walletType: string | null
  balance: {
    bnb: number
    rz: number
    mgc: number
  }
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  switchToBSC: () => Promise<void>
  sendTransaction: (to: string, amount: string, token?: string) => Promise<string>
  isLoading: boolean
  error: string | null
  clearError: () => void
  availableWallets: string[]
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const TOKEN_CONTRACTS = {
  MGC: "0xbb73BB2505AC4643d5C0a99c2A1F34B3DfD09D11", // MetaGamescoin
  RZ: "0x6BC5AbCc56874D7fACb90C2c3812cc19aAf9B204", // RZ
}

const BSC_CHAIN_ID = 56

export function WalletProvider({ children }: WalletProviderProps) {
  const { address, isConnected: wagmiConnected, connector } = useAccount()
  const chainId = useChainId()
  const { disconnect } = useDisconnect()
  const { switchChain } = useSwitchChain()
  const appKit = useAppKit()

  const [isConnected, setIsConnected] = useState(false)
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
  const [walletType, setWalletType] = useState<string | null>(null)
  const [balance, setBalance] = useState({
    bnb: 0,
    rz: 0,
    mgc: 0,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [availableWallets] = useState<string[]>([
    "MetaMask",
    "Trust Wallet",
    "SafePal",
    "Binance Wallet",
    "Coinbase Wallet",
    "WalletConnect",
  ])

  useEffect(() => {
    setIsConnected(wagmiConnected)
    setIsCorrectNetwork(chainId === BSC_CHAIN_ID)

    if (connector) {
      setWalletType(connector.name)
    }

    if (chainId !== BSC_CHAIN_ID && wagmiConnected) {
      setError("Please switch to BNB Smart Chain (BSC) network")
    } else {
      setError(null)
    }
  }, [wagmiConnected, chainId, connector])

  const { data: bnbBalance } = useBalance({
    address: address,
    chainId: BSC_CHAIN_ID,
  })

  useEffect(() => {
    if (bnbBalance) {
      const bnbAmount = Number(formatEther(bnbBalance.value))
      setBalance((prev) => ({ ...prev, bnb: Number(bnbAmount.toFixed(6)) }))
    }
  }, [bnbBalance])

  useEffect(() => {
    if (isConnected && address && isCorrectNetwork) {
      updateTokenBalances()
      const interval = setInterval(updateTokenBalances, 30000)
      return () => clearInterval(interval)
    }
  }, [isConnected, address, isCorrectNetwork])

  const updateTokenBalances = async () => {
    if (!address || !isCorrectNetwork) return

    try {
      console.log("[v0] Updating token balances...")

      // Get token balances using contract calls
      const rzBalance = await getTokenBalance(TOKEN_CONTRACTS.RZ, address)
      const mgcBalance = await getTokenBalance(TOKEN_CONTRACTS.MGC, address)

      setBalance((prev) => ({
        ...prev,
        rz: Number(rzBalance.toFixed(6)),
        mgc: Number(mgcBalance.toFixed(6)),
      }))

      console.log("[v0] Token balances updated:", { rz: rzBalance, mgc: mgcBalance })
    } catch (error) {
      console.error("Error updating token balances:", error)
    }
  }

  const getTokenBalance = async (contractAddress: string, walletAddress: string): Promise<number> => {
    try {
      // Create contract call data for balanceOf function
      const data = `0x70a08231000000000000000000000000${walletAddress.slice(2)}`

      const result = await window.ethereum?.request({
        method: "eth_call",
        params: [
          {
            to: contractAddress,
            data: data,
          },
          "latest",
        ],
      })

      if (result) {
        const balance = Number.parseInt(result, 16) / Math.pow(10, 18)
        return balance
      }
      return 0
    } catch (error) {
      console.error(`Error fetching token balance for ${contractAddress}:`, error)
      return 0
    }
  }

  const connectWallet = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (appKit && appKit.open) {
        await appKit.open()
        console.log("[v0] Wallet connection modal opened")
      } else {
        throw new Error("Wallet connection not available")
      }
    } catch (error: any) {
      console.error("Wallet connection error:", error)
      setError(error.message || "Failed to open wallet connection")
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    disconnect()
    setBalance({ bnb: 0, rz: 0, mgc: 0 })
    setError(null)
    console.log("[v0] Wallet disconnected")
  }

  const switchToBSC = async () => {
    if (!switchChain) {
      setError("Chain switching not supported")
      return
    }

    setIsLoading(true)
    try {
      await switchChain({ chainId: BSC_CHAIN_ID })
      setError(null)
      console.log("[v0] Switched to BSC network")
    } catch (error: any) {
      console.error("Network switch error:", error)
      if (error.code === 4001) {
        setError("Network switch rejected by user")
      } else {
        setError("Failed to switch to BSC network")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const sendTransaction = async (to: string, amount: string, token?: string): Promise<string> => {
    if (!window.ethereum || !address) {
      throw new Error("Wallet not connected")
    }

    if (!isCorrectNetwork) {
      throw new Error("Please switch to BNB Smart Chain network")
    }

    setIsLoading(true)
    try {
      let txParams: any

      if (token && token !== "BNB") {
        // Token transfer
        const contractAddress = token === "RZ" ? TOKEN_CONTRACTS.RZ : TOKEN_CONTRACTS.MGC
        const amountInWei = (Number.parseFloat(amount) * Math.pow(10, 18)).toString(16)
        const data = `0xa9059cbb000000000000000000000000${to.slice(2)}${amountInWei.padStart(64, "0")}`

        txParams = {
          from: address,
          to: contractAddress,
          data: data,
          gas: "0x7530", // 30000 gas limit for token transfers
        }
      } else {
        // BNB transfer
        const amountInWei = (Number.parseFloat(amount) * Math.pow(10, 18)).toString(16)
        txParams = {
          from: address,
          to: to,
          value: `0x${amountInWei}`,
          gas: "0x5208", // 21000 gas limit
        }
      }

      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [txParams],
      })

      console.log(`[v0] Transaction sent: ${txHash}`)

      // Update balance after transaction
      setTimeout(updateTokenBalances, 3000)

      return txHash
    } catch (error: any) {
      console.error("Transaction error:", error)
      if (error.code === 4001) {
        throw new Error("Transaction rejected by user")
      } else if (error.code === -32603) {
        throw new Error("Insufficient funds for transaction")
      } else {
        throw new Error(error.message || "Transaction failed")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value: WalletContextType = {
    isConnected,
    address: address || null,
    chainId,
    isCorrectNetwork,
    walletType,
    balance,
    connectWallet,
    disconnectWallet,
    switchToBSC,
    sendTransaction,
    isLoading,
    error,
    clearError,
    availableWallets,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}
