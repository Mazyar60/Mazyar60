"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WalletConnect } from "@/components/wallet-connect"
import Link from "next/link"

export default function SwapPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <img src="https://i.postimg.cc/dZGYw59D/logo.png" alt="RZ Oasis Logo" className="w-8 h-8 rounded-full" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                RZ Swap
              </h1>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-center">Swap RZ Tokens</CardTitle>
              <p className="text-gray-400 text-center text-sm">
                Trade RZ ecosystem tokens with real-time prices and low fees
              </p>
            </CardHeader>
            <CardContent>
              <div className="w-full">
                <iframe
                  src="https://coinbrain.com/embed/trade?theme=dark&padding=20&chainId=56&inputAddress=0xbb73bb2505ac4643d5c0a99c2a1f34b3dfd09d11&outputAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
                  width="100%"
                  height="600"
                  style={{
                    border: "none",
                    borderRadius: "12px",
                    backgroundColor: "transparent",
                  }}
                  title="RZ Token Swap"
                  allow="clipboard-read; clipboard-write"
                />
              </div>

              {/* Quick Access Tokens */}
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Access RZ Tokens</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-xs"
                    onClick={() => {
                      const iframe = document.querySelector("iframe") as HTMLIFrameElement
                      if (iframe) {
                        iframe.src =
                          "https://coinbrain.com/embed/trade?theme=dark&padding=20&chainId=56&inputAddress=0x6BC5AbCc56874D7fACb90C2c3812cc19aAf9B204&outputAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
                      }
                    }}
                  >
                    RZ
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-xs"
                    onClick={() => {
                      const iframe = document.querySelector("iframe") as HTMLIFrameElement
                      if (iframe) {
                        iframe.src =
                          "https://coinbrain.com/embed/trade?theme=dark&padding=20&chainId=56&inputAddress=0xbb73BB2505AC4643d5C0a99c2A1F34B3DfD09D11&outputAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
                      }
                    }}
                  >
                    MGC
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-xs"
                    onClick={() => {
                      const iframe = document.querySelector("iframe") as HTMLIFrameElement
                      if (iframe) {
                        iframe.src =
                          "https://coinbrain.com/embed/trade?theme=dark&padding=20&chainId=56&inputAddress=0x64E4fea6e4F3637025c7Bcd878E2B238B01f7D4e&outputAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
                      }
                    }}
                  >
                    INS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-xs"
                    onClick={() => {
                      const iframe = document.querySelector("iframe") as HTMLIFrameElement
                      if (iframe) {
                        iframe.src =
                          "https://coinbrain.com/embed/trade?theme=dark&padding=20&chainId=56&inputAddress=0xc4a1cc5ca8955a4650bdc109bddf110e33a1e344&outputAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
                      }
                    }}
                  >
                    RZUSD
                  </Button>
                </div>
              </div>

              {/* Powered by */}
              <div className="text-center text-xs text-gray-500 mt-4">
                Powered by CoinBrain • Real-time prices • Secure swaps
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
