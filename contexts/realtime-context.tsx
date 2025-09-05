"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { usePrice } from "@/contexts/price-context"

interface PriceData {
  rz: number
  mgc: number
  bnb: number
  change24h: {
    rz: number
    mgc: number
    bnb: number
  }
}

interface MiningPoolStats {
  totalHashRate: number
  activeMiners: number
  difficulty: number
  blockReward: number
  nextBlock: number
}

interface Notification {
  id: string
  type: "achievement" | "mining" | "vip" | "referral" | "system"
  title: string
  message: string
  timestamp: Date
  read: boolean
  icon?: string
}

interface LiveStats {
  globalHashRate: number
  totalMiners: number
  blocksFound: number
  networkDifficulty: number
}

interface RealtimeContextType {
  prices: PriceData
  miningPools: MiningPoolStats
  notifications: Notification[]
  liveStats: LiveStats
  isConnected: boolean
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const { prices: realPrices } = usePrice()

  const [prices, setPrices] = useState<PriceData>({
    rz: 0,
    mgc: 0,
    bnb: 0,
    change24h: {
      rz: 0,
      mgc: 0,
      bnb: 0,
    },
  })

  useEffect(() => {
    setPrices({
      rz: realPrices.rz.price,
      mgc: realPrices.mgc.price,
      bnb: realPrices.bnb.price,
      change24h: {
        rz: realPrices.rz.change24h,
        mgc: realPrices.mgc.change24h,
        bnb: realPrices.bnb.change24h,
      },
    })
  }, [realPrices])

  const [miningPools, setMiningPools] = useState<MiningPoolStats>({
    totalHashRate: 15420.5,
    activeMiners: 2847,
    difficulty: 8.5e12,
    blockReward: 6.25,
    nextBlock: 87,
  })

  const [liveStats, setLiveStats] = useState<LiveStats>({
    globalHashRate: 15420.5,
    totalMiners: 12847,
    blocksFound: 847562,
    networkDifficulty: 8.5e12,
  })

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "Welcome to CoinMining.Game!",
      message: "Connect your wallet to start earning real rewards",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      icon: "🎉",
    },
    {
      id: "2",
      type: "system",
      title: "Real Price Feeds Active",
      message: "Live token prices from DEX APIs are now active",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      icon: "📈",
    },
  ])

  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setMiningPools((prev) => ({
        totalHashRate: prev.totalHashRate + (Math.random() - 0.5) * 100,
        activeMiners: Math.max(1000, prev.activeMiners + Math.floor((Math.random() - 0.5) * 20)),
        difficulty: prev.difficulty * (1 + (Math.random() - 0.5) * 0.001),
        blockReward: prev.blockReward,
        nextBlock: Math.max(0, prev.nextBlock - Math.random() * 2),
      }))

      setLiveStats((prev) => ({
        globalHashRate: prev.globalHashRate + (Math.random() - 0.5) * 200,
        totalMiners: Math.max(10000, prev.totalMiners + Math.floor((Math.random() - 0.5) * 50)),
        blocksFound: prev.blocksFound + (Math.random() < 0.1 ? 1 : 0),
        networkDifficulty: prev.networkDifficulty * (1 + (Math.random() - 0.5) * 0.001),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsConnected((prev) => (Math.random() < 0.95 ? true : prev))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) {
        const notificationTypes = [
          {
            type: "mining" as const,
            title: "Staking Reward",
            message: "Daily staking rewards have been distributed to your wallet",
            icon: "💰",
          },
          {
            type: "system" as const,
            title: "Price Alert",
            message: `RZ token price ${realPrices.rz.change24h > 0 ? "increased" : "decreased"} by ${Math.abs(realPrices.rz.change24h).toFixed(1)}%`,
            icon: realPrices.rz.change24h > 0 ? "📈" : "📉",
          },
          {
            type: "referral" as const,
            title: "Referral Bonus",
            message: "Your referral earned rewards - you get bonus yield!",
            icon: "👥",
          },
        ]

        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
        addNotification(randomNotification)
      }
    }, 45000)

    return () => clearInterval(interval)
  }, [realPrices])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev.slice(0, 19)]) // Keep only 20 notifications
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <RealtimeContext.Provider
      value={{
        prices,
        miningPools,
        notifications,
        liveStats,
        isConnected,
        addNotification,
        markNotificationRead,
        clearNotifications,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  )
}

export function useRealtime() {
  const context = useContext(RealtimeContext)
  if (context === undefined) {
    throw new Error("useRealtime must be used within a RealtimeProvider")
  }
  return context
}
