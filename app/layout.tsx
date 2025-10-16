import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ClientProviders } from "../components/client-providers"
import { Suspense } from "react"
import "./globals.css"

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
      <body
        className="font-sans antialiased"
        style={{
          // @ts-ignore
          "--font-geist-sans": GeistSans.style.fontFamily,
          "--font-geist-mono": GeistMono.style.fontFamily,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ClientProviders>{children}</ClientProviders>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
