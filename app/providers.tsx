"use client"

import { createAppKit } from "@reown/appkit/react"
import { WagmiProvider } from "wagmi"
import { bsc } from "@reown/appkit/networks"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { ReactNode } from "react"

const projectId = "e381262ad36cd45f81a768b07bed8cfc"

// Create wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [bsc],
  projectId,
  ssr: true,
})

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [bsc],
  projectId,
  metadata: {
    name: "RZ Oasis",
    description: "RZ Oasis Token Management Platform",
    url: "https://rz-oasis.vercel.app",
    icons: ["https://i.postimg.cc/dZGYw59D/logo.png"],
  },
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-color-mix": "#8b5cf6",
    "--w3m-color-mix-strength": 20,
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
