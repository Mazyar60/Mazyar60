"use client"

import { createAppKit } from "@reown/appkit/react"
import { WagmiProvider } from "wagmi"
import { bsc } from "@reown/appkit/networks"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { ReactNode } from "react"

const queryClient = new QueryClient()

const projectId = "e381262ad36cd45f81a768b07bed8cfc"

const metadata = {
  name: "RZ Oasis",
  description: "RZ Oasis Token Management Platform",
  url: "https://rzoasis.vercel.app",
  icons: ["https://i.postimg.cc/dZGYw59D/logo.png"],
}

const networks = [bsc]

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
})

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
