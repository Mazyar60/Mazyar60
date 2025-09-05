import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { bsc } from "@reown/appkit/networks"
import { QueryClient } from "@tanstack/react-query"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

if (!projectId) {
  throw new Error("NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required")
}

const metadata = {
  name: "CoinMining.Game",
  description: "Real Crypto Staking Platform",
  url: "https://coinminingrz.vercel.app",
  icons: ["https://coinminingrz.vercel.app/icon-192x192.png"],
}

export const wagmiAdapter = new WagmiAdapter({
  networks: [bsc],
  projectId,
  ssr: true,
})

export const queryClient = new QueryClient()

let appKitInitialized = false

if (typeof window !== "undefined" && !appKitInitialized) {
  try {
    createAppKit({
      adapters: [wagmiAdapter],
      networks: [bsc],
      projectId,
      metadata,
      features: {
        analytics: true,
        email: true,
        socials: ["google", "x", "discord", "apple"],
        emailShowWallets: true,
      },
      themeMode: "dark",
      themeVariables: {
        "--w3m-color-mix": "#8b5cf6",
        "--w3m-color-mix-strength": 20,
        "--w3m-accent": "#8b5cf6",
        "--w3m-border-radius-master": "8px",
      },
    })
    appKitInitialized = true
    console.log("[v0] AppKit initialized successfully")
  } catch (error) {
    console.error("Failed to initialize AppKit:", error)
    // Graceful fallback - don't break the app
  }
}

export const config = wagmiAdapter.wagmiConfig
export { appKitInitialized }
