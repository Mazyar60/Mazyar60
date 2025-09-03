"use client"

import { useState, useEffect } from "react"
import type { Token } from "@/types/token"

interface TokenPrice {
  price: number
  change24h: number
  sparkline?: number[]
}

export function useDexScreener(tokens: Token[]) {
  const [prices, setPrices] = useState<Record<string, TokenPrice>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (tokens.length === 0) return

    async function fetchPrices() {
      try {
        setLoading(true)

        // Create a batch of addresses for the API call
        const addresses = tokens.map((token) => token.address).join(",")

        // DexScreener API endpoint for BSC tokens
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${addresses}`)

        if (!response.ok) {
          throw new Error("Failed to fetch price data")
        }

        const data = await response.json()
        const newPrices: Record<string, TokenPrice> = {}

        // Process the response data
        if (data.pairs && Array.isArray(data.pairs)) {
          data.pairs.forEach((pair: any) => {
            if (pair.baseToken && pair.priceUsd) {
              const address = pair.baseToken.address.toLowerCase()

              // Generate mock sparkline data (in real app, this would come from API)
              const sparkline = Array.from({ length: 24 }, (_, i) => {
                const basePrice = Number.parseFloat(pair.priceUsd)
                const variation = (Math.random() - 0.5) * 0.1 * basePrice
                return basePrice + variation
              })

              newPrices[address] = {
                price: Number.parseFloat(pair.priceUsd),
                change24h: Number.parseFloat(pair.priceChange?.h24 || "0"),
                sparkline,
              }
            }
          })
        }

        // For tokens not found in DexScreener, generate mock data
        tokens.forEach((token) => {
          const address = token.address.toLowerCase()
          if (!newPrices[address]) {
            const mockPrice = Math.random() * 0.001 + 0.0001
            const mockChange = (Math.random() - 0.5) * 20
            const sparkline = Array.from({ length: 24 }, (_, i) => {
              const variation = (Math.random() - 0.5) * 0.1 * mockPrice
              return mockPrice + variation
            })

            newPrices[address] = {
              price: mockPrice,
              change24h: mockChange,
              sparkline,
            }
          }
        })

        setPrices(newPrices)
      } catch (err) {
        console.error("Error fetching price data:", err)

        // Generate mock data as fallback
        const mockPrices: Record<string, TokenPrice> = {}
        tokens.forEach((token) => {
          const mockPrice = Math.random() * 0.001 + 0.0001
          const mockChange = (Math.random() - 0.5) * 20
          const sparkline = Array.from({ length: 24 }, (_, i) => {
            const variation = (Math.random() - 0.5) * 0.1 * mockPrice
            return mockPrice + variation
          })

          mockPrices[token.address.toLowerCase()] = {
            price: mockPrice,
            change24h: mockChange,
            sparkline,
          }
        })
        setPrices(mockPrices)
      } finally {
        setLoading(false)
      }
    }

    fetchPrices()

    // Set up polling for live updates every 30 seconds
    const interval = setInterval(fetchPrices, 30000)

    return () => clearInterval(interval)
  }, [tokens])

  return { prices, loading }
}
