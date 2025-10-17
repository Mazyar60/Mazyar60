"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BridgePage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const script = document.createElement("script")
    script.src = "https://app.debridge.finance/assets/scripts/widget.js"
    script.async = true
    script.onload = () => {
      // Initialize deBridge widget after script loads
      if (typeof window !== "undefined" && (window as any).deBridge) {
        // Check mobile status at initialization time
        const isMobileDevice = window.innerWidth < 768
        const widgetWidth = isMobileDevice ? "100%" : "480"
        const widgetHeight = isMobileDevice ? "680" : "720"

        // Clear any existing widget content to prevent duplicates
        const widgetContainer = document.getElementById("debridgeWidget")
        if (widgetContainer) {
          widgetContainer.innerHTML = ""
        }
        ;(window as any).deBridge.widget({
          v: "1",
          element: "debridgeWidget",
          title: "RZBank Bridge",
          description:
            "The RZBank Bridge app was created to help all Tether holders easily convert it to RZUSD or vice versa.",
          width: widgetWidth,
          height: widgetHeight,
          r: "999999",
          affiliateFeePercent: "0.01",
          affiliateFeeRecipient: "0x880498890b064583E189989BE574480094Fe0EDF",
          supportedChains:
            '{"inputChains":{"1":"all","10":"all","56":"all","100":"all","137":"all","146":"all","747":"all","999":"all","1329":"all","1514":"all","2741":"all","5000":"all","8453":"all","9745":"all","32769":"all","42161":"all","43114":"all","50104":"all","59144":"all","60808":"all","80094":"all","999999":"all","7565164":"all","245022934":"all","728126428":"all"},"outputChains":{"1":"all","10":"all","56":"all","100":"all","137":"all","146":"all","747":"all","999":"all","1329":"all","1514":"all","2741":"all","5000":"all","8453":"all","9745":"all","32769":"all","42161":"all","43114":"all","50104":"all","59144":"all","60808":"all","80094":"all","999999":"all","7565164":"all","245022934":"all","728126428":"all"}}',
          inputChain: 56,
          outputChain: 728126428,
          inputCurrency: "0xc4a1cc5ca8955a4650bdc109bddf110e33a1e344",
          outputCurrency: "",
          address: "",
          showSwapTransfer: false,
          amount: "1000",
          isAmountFromNotModifiable: false,
          lang: "en",
          mode: "deswap",
          isEnableCalldata: false,
          styles:
            "eyJjb250cm9sQm9yZGVyIjoiIzViNWM2MCIsInByaW1hcnkiOiIjNjA1MzE4Iiwic2Vjb25kYXJ5IjoiIzRkNWQ3ZSIsImZvbnRGYW1pbHkiOiJBQmVlWmVlIiwicHJpbWFyeUJ0bkJnIjoiIzhmN2IxOSIsImJ0bkZvbnRTaXplIjoxNiwiYnRuRm9udFdlaWdodCI6MTAwLCJkZXNjcmlwdGlvbkZvbnRTaXplIjoiMTQifQ==",
          theme: "dark",
          isHideLogo: false,
          logo: "",
          disabledWallets: [],
          disabledElements: ["Exchange rate"],
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup
      window.removeEventListener("resize", checkMobile)
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      // Clear widget container on unmount
      const widgetContainer = document.getElementById("debridgeWidget")
      if (widgetContainer) {
        widgetContainer.innerHTML = ""
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <img
                  src="https://i.postimg.cc/dZGYw59D/logo.png"
                  alt="RZ Oasis Logo"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    RZBank Bridge
                  </h1>
                  <p className="text-xs md:text-sm text-gray-400">Convert Tether to RZUSD and vice versa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-[520px] mx-auto">
          {/* Info Section */}
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Cross-Chain Bridge
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              The RZBank Bridge app was created to help all Tether holders easily convert it to RZUSD or vice versa.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div
              id="debridgeWidget"
              className="w-full max-w-full overflow-hidden"
              style={{
                maxWidth: isMobile ? "100%" : "480px",
              }}
            ></div>
          </div>

          {/* Features Section */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 gap-4 md:gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl mb-2">🔒</div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Secure</h3>
              <p className="text-gray-400 text-xs md:text-sm">
                Your assets are protected with industry-leading security protocols
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl mb-2">⚡</div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Fast</h3>
              <p className="text-gray-400 text-xs md:text-sm">Quick cross-chain transfers with minimal waiting time</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 md:p-6 text-center">
              <div className="text-2xl md:text-3xl mb-2">💰</div>
              <h3 className="text-base md:text-lg font-semibold mb-2">Low Fees</h3>
              <p className="text-gray-400 text-xs md:text-sm">Competitive fees with transparent pricing</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
