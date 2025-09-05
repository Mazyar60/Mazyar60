import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import { WagmiProvider } from "wagmi"
import { QueryClientProvider } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { config, queryClient } from "@/lib/wagmi"
import { WalletProvider } from "@/contexts/wallet-context"
import { PriceProvider } from "@/contexts/price-context"
import { GamificationProvider } from "@/contexts/gamification-context"
import { RealtimeProvider } from "@/contexts/realtime-context"
import { AuthProvider } from "@/contexts/auth-context"
import { MiningProvider } from "@/contexts/mining-context"
import { ReferralProvider } from "@/contexts/referral-context"
import { ErrorBoundary } from "@/components/error-boundary"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "CoinMining.Game - Real Crypto Staking Platform",
  description:
    "Stake RZ and MGC tokens to earn guaranteed daily rewards through real staking mechanics. Transparent APR calculations on BSC network.",
  generator: "CoinMining.Game",
  manifest: "/manifest.json",
  themeColor: "#8b5cf6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CoinMining.Game",
  },
  keywords: ["crypto staking", "RZ token", "MGC token", "BSC", "DeFi", "yield farming", "passive income"],
  openGraph: {
    title: "CoinMining.Game - Real Crypto Staking Platform",
    description: "Stake tokens, earn daily rewards through real staking mechanics on BSC",
    type: "website",
    url: "https://coinmining.game",
    siteName: "CoinMining.Game",
    images: [
      {
        url: "https://coinmining.game/og-image.png",
        width: 1200,
        height: 630,
        alt: "CoinMining.Game - Real Crypto Staking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoinMining.Game - Real Crypto Staking Platform",
    description: "Stake tokens, earn daily rewards through real staking mechanics on BSC",
    images: ["https://coinmining.game/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable} dark`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.coingecko.com" />
        <link rel="preconnect" href="https://api.pancakeswap.info" />
        <link rel="preconnect" href="https://api.dexscreener.com" />
        <link rel="canonical" href="https://coinmining.game" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "CoinMining.Game",
              description: "Real crypto staking platform for RZ and MGC tokens with transparent APR calculations",
              url: "https://coinmining.game",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                category: "Staking Services",
                description: "Cryptocurrency staking with guaranteed daily rewards",
              },
              author: {
                "@type": "Organization",
                name: "CoinMining.Game",
              },
            }),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('PWA Service Worker registered successfully');
                    })
                    .catch(function(registrationError) {
                      console.log('PWA Service Worker registration failed:', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${workSans.variable} ${openSans.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <SessionProvider>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                <PriceProvider>
                  <RealtimeProvider>
                    <AuthProvider>
                      <GamificationProvider>
                        <WalletProvider>
                          <MiningProvider>
                            <ReferralProvider>{children}</ReferralProvider>
                          </MiningProvider>
                        </WalletProvider>
                      </GamificationProvider>
                    </AuthProvider>
                  </RealtimeProvider>
                </PriceProvider>
              </QueryClientProvider>
            </WagmiProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
