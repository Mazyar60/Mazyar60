"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, Zap, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWallet } from "@/contexts/wallet-context"
import { useSignMessage } from "wagmi"

export default function SIWEAuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<"connect" | "sign" | "success">("connect")

  const { isConnected, address, connectWallet, isCorrectNetwork, switchToBSC } = useWallet()
  const { signMessageAsync } = useSignMessage()
  const router = useRouter()

  useEffect(() => {
    if (isConnected && isCorrectNetwork) {
      setStep("sign")
    } else if (isConnected && !isCorrectNetwork) {
      setError("Please switch to BNB Smart Chain (BSC) network")
    }
  }, [isConnected, isCorrectNetwork])

  const handleConnect = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await connectWallet()
    } catch (error: any) {
      setError(error.message || "Failed to connect wallet")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwitchNetwork = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await switchToBSC()
    } catch (error: any) {
      setError(error.message || "Failed to switch network")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async () => {
    if (!address || !isCorrectNetwork) return

    setIsLoading(true)
    setError(null)

    try {
      // Get nonce from server
      const nonceResponse = await fetch("/api/auth/siwe/nonce", {
        method: "GET",
        credentials: "include",
      })

      if (!nonceResponse.ok) {
        throw new Error("Failed to get nonce")
      }

      const { nonce } = await nonceResponse.json()

      // Create SIWE message
      const domain = process.env.NEXT_PUBLIC_SIWE_DOMAIN || "coinminingrz.vercel.app"
      const uri = process.env.NEXT_PUBLIC_SIWE_URI || "https://coinminingrz.vercel.app"
      const issuedAt = new Date().toISOString()
      const expirationTime = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes

      const message = [
        `${domain} wants you to sign in with your Ethereum account:`,
        address,
        "",
        "Sign in to CoinMining.Game with your wallet.",
        "",
        `URI: ${uri}`,
        `Version: 1`,
        `Chain ID: 56`,
        `Nonce: ${nonce}`,
        `Issued At: ${issuedAt}`,
        `Expiration Time: ${expirationTime}`,
      ].join("\n")

      console.log("[v0] SIWE message created:", message)

      // Sign message with wallet
      const signature = await signMessageAsync({ message })

      console.log("[v0] Message signed, verifying...")

      // Verify signature with server
      const verifyResponse = await fetch("/api/auth/siwe/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          message,
          signature,
          address,
        }),
      })

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json()
        throw new Error(errorData.error || "Verification failed")
      }

      console.log("[v0] SIWE authentication successful")
      setStep("success")

      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error("SIWE authentication error:", error)
      setError(error.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center glow-effect">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-serif font-bold text-foreground pulse-neon">
              CoinMining<span className="text-primary">.Game</span>
            </span>
          </Link>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">Wallet Authentication</h1>
          <p className="text-muted-foreground">Sign in with your crypto wallet</p>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Secure Sign-In
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Connect Wallet */}
            {step === "connect" && (
              <div className="space-y-4">
                <div className="text-center">
                  <Wallet className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect your wallet to access your mining dashboard
                  </p>
                </div>

                <Button onClick={handleConnect} disabled={isLoading} className="w-full glow-effect">
                  {isLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
              </div>
            )}

            {/* Step 2: Sign Message */}
            {step === "sign" && (
              <div className="space-y-4">
                <div className="text-center">
                  <Shield className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-lg font-semibold mb-2">Sign Authentication Message</h3>
                  <p className="text-sm text-muted-foreground mb-4">Sign a message to prove you own this wallet</p>

                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      Wallet Connected
                    </Badge>
                    {isCorrectNetwork ? (
                      <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        BSC Network
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30">
                        Wrong Network
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground font-mono">{address}</p>
                </div>

                {!isCorrectNetwork ? (
                  <Button
                    onClick={handleSwitchNetwork}
                    disabled={isLoading}
                    className="w-full bg-transparent"
                    variant="outline"
                  >
                    {isLoading ? "Switching..." : "Switch to BSC Network"}
                  </Button>
                ) : (
                  <Button onClick={handleSignIn} disabled={isLoading} className="w-full glow-effect">
                    {isLoading ? "Signing..." : "Sign Message"}
                  </Button>
                )}
              </div>
            )}

            {/* Step 3: Success */}
            {step === "success" && (
              <div className="space-y-4 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-400" />
                <h3 className="text-lg font-semibold mb-2">Authentication Successful!</h3>
                <p className="text-sm text-muted-foreground mb-4">Redirecting to your dashboard...</p>
                <div className="animate-pulse">
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-destructive" />
                <span className="text-sm text-destructive">{error}</span>
              </div>
            )}

            <div className="text-center text-xs text-muted-foreground">
              <p>By signing in, you agree to our terms of service.</p>
              <p className="mt-1">Your wallet signature proves ownership without sharing private keys.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
