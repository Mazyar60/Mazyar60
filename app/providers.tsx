"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Core } from "@walletconnect/core"
import { WalletKit, type WalletKitTypes } from "@reown/walletkit"
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  walletKit: WalletKit | null
  activeSessions: Record<string, any>
  connect: (uri?: string) => Promise<void>
  disconnect: (topic?: string) => Promise<void>
  approveSession: (proposal: WalletKitTypes.SessionProposal) => Promise<void>
  rejectSession: (proposal: WalletKitTypes.SessionProposal) => Promise<void>
  respondToRequest: (event: WalletKitTypes.SessionRequest, approved: boolean) => Promise<void>
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
  const [walletKit, setWalletKit] = useState<WalletKit | null>(null)
  const [activeSessions, setActiveSessions] = useState<Record<string, any>>({})

  useEffect(() => {
    const initWalletKit = async () => {
      try {
        const core = new Core({
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id",
        })

        const walletKitInstance = await WalletKit.init({
          core,
          metadata: {
            name: "RZ Oasis Wallet",
            description: "RZ Oasis Token Management Wallet",
            url: "https://rz-oasis.vercel.app",
            icons: ["https://i.postimg.cc/dZGYw59D/logo.png"],
          },
        })

        setWalletKit(walletKitInstance)

        walletKitInstance.on("session_proposal", async (proposal: WalletKitTypes.SessionProposal) => {
          console.log("[v0] Session proposal received:", proposal)
          // Auto-approve for demo purposes - in production, show user approval UI
          await approveSessionInternal(proposal, walletKitInstance)
        })

        walletKitInstance.on("session_request", async (event: WalletKitTypes.SessionRequest) => {
          console.log("[v0] Session request received:", event)
          // Auto-approve for demo purposes - in production, show user approval UI
          await respondToRequestInternal(event, true, walletKitInstance)
        })

        walletKitInstance.on("session_update", ({ topic, params }) => {
          console.log("[v0] Session updated:", topic, params)
          updateActiveSessions(walletKitInstance)
        })

        walletKitInstance.on("session_delete", ({ topic }) => {
          console.log("[v0] Session deleted:", topic)
          updateActiveSessions(walletKitInstance)
        })

        updateActiveSessions(walletKitInstance)
      } catch (error) {
        console.error("[v0] Failed to initialize WalletKit:", error)
      }
    }

    initWalletKit()
  }, [])

  const updateActiveSessions = (walletKitInstance: WalletKit) => {
    const sessions = walletKitInstance.getActiveSessions()
    setActiveSessions(sessions)
    setIsConnected(Object.keys(sessions).length > 0)
    if (Object.keys(sessions).length > 0) {
      // Set address from first session
      const firstSession = Object.values(sessions)[0]
      const accounts = firstSession.namespaces?.eip155?.accounts || []
      if (accounts.length > 0) {
        const account = accounts[0].split(":")[2] // Extract address from CAIP-10 format
        setAddress(account)
      }
    } else {
      setAddress(null)
    }
  }

  const connect = async (uri?: string) => {
    if (!walletKit) return

    try {
      const connectUri = uri || new URLSearchParams(window.location.search).get("uri")

      if (connectUri) {
        await walletKit.pair({ uri: connectUri })
        console.log("[v0] Pairing initiated with URI")
      } else {
        console.log("[v0] No URI provided for pairing")
      }
    } catch (error) {
      console.error("[v0] Failed to connect:", error)
    }
  }

  const disconnect = async (topic?: string) => {
    if (!walletKit) return

    try {
      if (topic) {
        await walletKit.disconnectSession({
          topic,
          reason: getSdkError("USER_DISCONNECTED"),
        })
      } else {
        // Disconnect all sessions
        const sessions = walletKit.getActiveSessions()
        for (const sessionTopic of Object.keys(sessions)) {
          await walletKit.disconnectSession({
            topic: sessionTopic,
            reason: getSdkError("USER_DISCONNECTED"),
          })
        }
      }
      updateActiveSessions(walletKit)
    } catch (error) {
      console.error("[v0] Failed to disconnect:", error)
    }
  }

  const approveSessionInternal = async (proposal: WalletKitTypes.SessionProposal, walletKitInstance: WalletKit) => {
    try {
      const approvedNamespaces = buildApprovedNamespaces({
        proposal: proposal.params,
        supportedNamespaces: {
          eip155: {
            chains: ["eip155:1", "eip155:56"], // Ethereum and BSC
            methods: [
              "eth_sendTransaction",
              "eth_signTransaction",
              "eth_sign",
              "personal_sign",
              "eth_signTypedData",
              "eth_signTypedData_v4",
              "wallet_switchEthereumChain",
              "wallet_addEthereumChain",
            ],
            events: ["chainChanged", "accountsChanged"],
            accounts: [
              "eip155:1:0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b7",
              "eip155:56:0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b7",
            ],
          },
        },
      })

      const session = await walletKitInstance.approveSession({
        id: proposal.id,
        namespaces: approvedNamespaces,
      })

      console.log("[v0] Session approved:", session)
      updateActiveSessions(walletKitInstance)
    } catch (error) {
      console.error("[v0] Failed to approve session:", error)
      await walletKitInstance.rejectSession({
        id: proposal.id,
        reason: getSdkError("USER_REJECTED"),
      })
    }
  }

  const approveSession = async (proposal: WalletKitTypes.SessionProposal) => {
    if (!walletKit) return
    await approveSessionInternal(proposal, walletKit)
  }

  const rejectSession = async (proposal: WalletKitTypes.SessionProposal) => {
    if (!walletKit) return

    try {
      await walletKit.rejectSession({
        id: proposal.id,
        reason: getSdkError("USER_REJECTED"),
      })
    } catch (error) {
      console.error("[v0] Failed to reject session:", error)
    }
  }

  const respondToRequestInternal = async (
    event: WalletKitTypes.SessionRequest,
    approved: boolean,
    walletKitInstance: WalletKit,
  ) => {
    const { topic, params, id } = event
    const { request } = params

    try {
      let response

      if (approved) {
        switch (request.method) {
          case "personal_sign":
            // Mock signature for demo
            response = { id, result: "0x" + "0".repeat(130), jsonrpc: "2.0" }
            break
          case "eth_sendTransaction":
            // Mock transaction hash for demo
            response = { id, result: "0x" + "1".repeat(64), jsonrpc: "2.0" }
            break
          case "eth_signTypedData_v4":
            // Mock signature for demo
            response = { id, result: "0x" + "2".repeat(130), jsonrpc: "2.0" }
            break
          default:
            response = { id, result: null, jsonrpc: "2.0" }
        }
      } else {
        response = {
          id,
          jsonrpc: "2.0",
          error: {
            code: 5000,
            message: "User rejected.",
          },
        }
      }

      await walletKitInstance.respondSessionRequest({ topic, response })
      console.log("[v0] Responded to session request:", request.method)
    } catch (error) {
      console.error("[v0] Failed to respond to session request:", error)
    }
  }

  const respondToRequest = async (event: WalletKitTypes.SessionRequest, approved: boolean) => {
    if (!walletKit) return
    await respondToRequestInternal(event, approved, walletKit)
  }

  const walletValue = {
    isConnected,
    address,
    walletKit,
    activeSessions,
    connect,
    disconnect,
    approveSession,
    rejectSession,
    respondToRequest,
  }

  return <WalletContext.Provider value={walletValue}>{children}</WalletContext.Provider>
}
