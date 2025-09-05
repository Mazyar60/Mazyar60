import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import "./globals.css"

const DynamicProviders = dynamic(() => import("./providers").then((mod) => ({ default: mod.Providers })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />,
})

export const metadata: Metadata = {
  title: "RZ Oasis - Token Management Platform",
  description: "Discover, track, and manage your favorite tokens with live prices and comprehensive analytics.",
  generator: "v0.app",
  keywords: ["crypto", "tokens", "DeFi", "BSC", "blockchain", "wallet"],
  authors: [{ name: "RZ Oasis" }],
  creator: "RZ Oasis",
  publisher: "RZ Oasis",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://rz-oasis.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "RZ Oasis - Token Management Platform",
    description: "Discover, track, and manage your favorite tokens with live prices and comprehensive analytics.",
    url: "https://rz-oasis.vercel.app",
    siteName: "RZ Oasis",
    images: [
      {
        url: "https://i.postimg.cc/dZGYw59D/logo.png",
        width: 1200,
        height: 630,
        alt: "RZ Oasis Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RZ Oasis - Token Management Platform",
    description: "Discover, track, and manage your favorite tokens with live prices and comprehensive analytics.",
    images: ["https://i.postimg.cc/dZGYw59D/logo.png"],
    creator: "@rzoasis",
  },
  icons: {
    icon: "https://i.postimg.cc/dZGYw59D/logo.png",
    shortcut: "https://i.postimg.cc/dZGYw59D/logo.png",
    apple: "https://i.postimg.cc/dZGYw59D/logo.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <DynamicProviders>{children}</DynamicProviders>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
