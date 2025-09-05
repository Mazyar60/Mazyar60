"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"

interface Referral {
  id: string
  email: string
  firstName: string
  lastName: string
  joinDate: string
  totalInvested: number
  isActive: boolean
  level: 1 | 2
  monthlyBonus: number
}

interface SocialTask {
  id: string
  title: string
  description: string
  platform: "twitter" | "telegram" | "discord" | "youtube" | "instagram"
  action: "follow" | "like" | "share" | "join" | "subscribe"
  url: string
  reward: number // Monthly yield bonus
  completed: boolean
  completedDate?: string
}

interface ReferralContextType {
  referralCode: string
  referrals: Referral[]
  totalReferrals: number
  activeReferrals: number
  monthlyReferralBonus: number
  socialTasks: SocialTask[]
  completedTasks: number
  monthlySocialBonus: number
  generateReferralLink: () => string
  addReferral: (email: string) => Promise<void>
  completeSocialTask: (taskId: string) => Promise<void>
  resetMonthlySocialTasks: () => void
  isLoading: boolean
  error: string | null
}

const ReferralContext = createContext<ReferralContextType | undefined>(undefined)

export function useReferral() {
  const context = useContext(ReferralContext)
  if (context === undefined) {
    throw new Error("useReferral must be used within a ReferralProvider")
  }
  return context
}

interface ReferralProviderProps {
  children: ReactNode
}

const SOCIAL_TASKS: Omit<SocialTask, "completed" | "completedDate">[] = [
  {
    id: "twitter_follow",
    title: "Follow on Twitter",
    description: "Follow @CoinMiningGame on Twitter",
    platform: "twitter",
    action: "follow",
    url: "https://twitter.com/coinmininggame",
    reward: 0.00001, // 0.001% monthly yield
  },
  {
    id: "twitter_retweet",
    title: "Retweet Launch Post",
    description: "Retweet our launch announcement",
    platform: "twitter",
    action: "share",
    url: "https://twitter.com/coinmininggame/status/123",
    reward: 0.00001,
  },
  {
    id: "telegram_join",
    title: "Join Telegram",
    description: "Join our official Telegram channel",
    platform: "telegram",
    action: "join",
    url: "https://t.me/coinmininggame",
    reward: 0.00001,
  },
  {
    id: "discord_join",
    title: "Join Discord",
    description: "Join our Discord community",
    platform: "discord",
    action: "join",
    url: "https://discord.gg/coinmininggame",
    reward: 0.00001,
  },
  {
    id: "youtube_subscribe",
    title: "Subscribe YouTube",
    description: "Subscribe to our YouTube channel",
    platform: "youtube",
    action: "subscribe",
    url: "https://youtube.com/@coinmininggame",
    reward: 0.00001,
  },
  {
    id: "instagram_follow",
    title: "Follow Instagram",
    description: "Follow @coinmininggame on Instagram",
    platform: "instagram",
    action: "follow",
    url: "https://instagram.com/coinmininggame",
    reward: 0.00001,
  },
]

export function ReferralProvider({ children }: ReferralProviderProps) {
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [socialTasks, setSocialTasks] = useState<SocialTask[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const referralCode = user ? `REF${user.id.slice(-6).toUpperCase()}` : ""

  // Load referrals and social tasks from localStorage
  useEffect(() => {
    if (user) {
      const savedReferrals = localStorage.getItem(`referrals_${user.id}`)
      const savedSocialTasks = localStorage.getItem(`social_tasks_${user.id}`)

      if (savedReferrals) {
        setReferrals(JSON.parse(savedReferrals))
      }

      if (savedSocialTasks) {
        setSocialTasks(JSON.parse(savedSocialTasks))
      } else {
        // Initialize social tasks
        const initialTasks = SOCIAL_TASKS.map((task) => ({
          ...task,
          completed: false,
        }))
        setSocialTasks(initialTasks)
      }
    }
  }, [user])

  // Save to localStorage when data changes
  useEffect(() => {
    if (user && referrals.length > 0) {
      localStorage.setItem(`referrals_${user.id}`, JSON.stringify(referrals))
    }
  }, [referrals, user])

  useEffect(() => {
    if (user && socialTasks.length > 0) {
      localStorage.setItem(`social_tasks_${user.id}`, JSON.stringify(socialTasks))
    }
  }, [socialTasks, user])

  // Reset social tasks monthly
  useEffect(() => {
    const checkMonthlyReset = () => {
      const lastReset = localStorage.getItem(`last_social_reset_${user?.id}`)
      const currentMonth = new Date().getMonth()
      const lastResetMonth = lastReset ? new Date(lastReset).getMonth() : -1

      if (currentMonth !== lastResetMonth) {
        resetMonthlySocialTasks()
      }
    }

    if (user) {
      checkMonthlyReset()
    }
  }, [user])

  const generateReferralLink = () => {
    return `${window.location.origin}?ref=${referralCode}`
  }

  const addReferral = async (email: string) => {
    if (!user) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newReferral: Referral = {
        id: `ref_${Date.now()}`,
        email,
        firstName: "New",
        lastName: "User",
        joinDate: new Date().toISOString(),
        totalInvested: 0,
        isActive: false,
        level: 1,
        monthlyBonus: 0,
      }

      setReferrals((prev) => [...prev, newReferral])
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const completeSocialTask = async (taskId: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setSocialTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? {
                ...task,
                completed: true,
                completedDate: new Date().toISOString(),
              }
            : task,
        ),
      )
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const resetMonthlySocialTasks = () => {
    setSocialTasks((prev) =>
      prev.map((task) => ({
        ...task,
        completed: false,
        completedDate: undefined,
      })),
    )

    if (user) {
      localStorage.setItem(`last_social_reset_${user.id}`, new Date().toISOString())
    }
  }

  // Calculate totals
  const totalReferrals = referrals.length
  const activeReferrals = referrals.filter((ref) => ref.isActive && ref.totalInvested >= 1000).length

  const monthlyReferralBonus = referrals.reduce((total, referral) => {
    if (referral.isActive && referral.totalInvested >= 1000) {
      return total + (referral.level === 1 ? 0.0001 : 0.000001) // 0.01% for level 1, 0.001% for level 2
    }
    return total
  }, 0)

  const completedTasks = socialTasks.filter((task) => task.completed).length
  const monthlySocialBonus = socialTasks.reduce((total, task) => {
    return task.completed ? total + task.reward : total
  }, 0)

  const value: ReferralContextType = {
    referralCode,
    referrals,
    totalReferrals,
    activeReferrals,
    monthlyReferralBonus,
    socialTasks,
    completedTasks,
    monthlySocialBonus,
    generateReferralLink,
    addReferral,
    completeSocialTask,
    resetMonthlySocialTasks,
    isLoading,
    error,
  }

  return <ReferralContext.Provider value={value}>{children}</ReferralContext.Provider>
}
