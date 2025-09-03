"use client"

import { useState, useEffect } from "react"
import type { Token } from "@/types/token"

export function useTokenList() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTokens() {
      try {
        setLoading(true)
        const response = await fetch("/rz_tokenlist.json")

        if (!response.ok) {
          throw new Error("Failed to fetch token list")
        }

        const data = await response.json()
        setTokens(data.tokens || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
        console.error("Error fetching token list:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTokens()
  }, [])

  return { tokens, loading, error }
}
