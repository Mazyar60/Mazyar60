"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/contexts/auth-context"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  unlocked: boolean
  reward: string
  category: "mining" | "social" | "trading" | "special" | "vip"
  nftReward?: string
}

interface NFTReward {
  id: string
  name: string
  image: string
  rarity: "common" | "rare" | "epic" | "legendary"
  description: string
  unlocked: boolean
  animationType?: "glow" | "pulse" | "rotate" | "float"
}

interface DailyChallenge {
  id: string
  title: string
  description: string
  progress: number
  target: number
  reward: string
  completed: boolean
  expiresAt: string
}

interface MiningStreak {
  current: number
  longest: number
  lastMiningDate: string
}

interface VIPStatus {
  isVIP: boolean
  tier: "none" | "silver" | "gold" | "diamond"
  qualificationProgress: number
  earningsBoost: number
  exclusiveMiners: string[]
  specialBadge: string
}

interface UserProfile {
  level: number
  xp: number
  xpToNext: number
  totalXp: number
  rank: number
  title: string
  achievements: Achievement[]
  nftCollection: NFTReward[]
  dailyChallenges: DailyChallenge[]
  miningStreak: MiningStreak
  vipStatus: VIPStatus
}

interface GamificationContextType {
  profile: UserProfile
  addXP: (amount: number) => void
  completeAchievement: (id: string) => void
  completeDailyChallenge: (id: string) => void
  claimNFTReward: (id: string) => void
  updateMiningStreak: () => void
  checkVIPQualification: () => void
  triggerVisualEffect: (type: "coinRain" | "neonGlow" | "congratulations" | "levelUp") => void
  playSound: (type: "success" | "achievement" | "levelUp" | "mining") => void
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile>({
    level: 12,
    xp: 2450,
    xpToNext: 550,
    totalXp: 12450,
    rank: 847,
    title: "Mining Veteran",
    miningStreak: {
      current: 6,
      longest: 15,
      lastMiningDate: new Date().toISOString(),
    },
    vipStatus: {
      isVIP: false,
      tier: "none",
      qualificationProgress: 0.08, // 8% towards 10% requirement
      earningsBoost: 0,
      exclusiveMiners: [],
      specialBadge: "",
    },
    achievements: [
      {
        id: "first-mine",
        name: "First Steps",
        description: "Complete your first mining session",
        icon: "⚡",
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        reward: "50 XP",
        category: "mining",
      },
      {
        id: "week-warrior",
        name: "Week Warrior",
        description: "Mine for 7 consecutive days",
        icon: "📅",
        progress: 6,
        maxProgress: 7,
        unlocked: false,
        reward: "Mining Streak NFT",
        category: "mining",
        nftReward: "mining-streak",
      },
      {
        id: "month-master",
        name: "Month Master",
        description: "Mine for 30 consecutive days",
        icon: "🏆",
        progress: 6,
        maxProgress: 30,
        unlocked: false,
        reward: "Master Miner NFT",
        category: "mining",
        nftReward: "master-miner",
      },
      {
        id: "token-master",
        name: "Token Master",
        description: "Earn 1,000 RZ tokens",
        icon: "💰",
        progress: 670,
        maxProgress: 1000,
        unlocked: false,
        reward: "Golden Pickaxe NFT",
        category: "mining",
        nftReward: "golden-pickaxe",
      },
      {
        id: "referral-king",
        name: "Referral King",
        description: "Refer 10 friends",
        icon: "👥",
        progress: 3,
        maxProgress: 10,
        unlocked: false,
        reward: "Ambassador Badge",
        category: "social",
      },
      {
        id: "efficiency-expert",
        name: "Efficiency Expert",
        description: "Maintain 95% efficiency for 24 hours",
        icon: "🎯",
        progress: 18,
        maxProgress: 24,
        unlocked: false,
        reward: "Optimization Master NFT",
        category: "mining",
        nftReward: "optimization-master",
      },
      {
        id: "vip-qualified",
        name: "VIP Qualified",
        description: "Reach +0.1% extra monthly yield to unlock VIP status",
        icon: "👑",
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        reward: "VIP Access + 15% Earnings Boost",
        category: "vip",
      },
      {
        id: "social-butterfly",
        name: "Social Butterfly",
        description: "Complete all social tasks in a month",
        icon: "🦋",
        progress: 0,
        maxProgress: 6,
        unlocked: false,
        reward: "Social Master NFT",
        category: "social",
        nftReward: "social-master",
      },
    ],
    nftCollection: [
      {
        id: "starter-badge",
        name: "Starter Badge",
        image: "/nft-starter.png",
        rarity: "common",
        description: "Your first NFT reward for joining CoinMining.Game",
        unlocked: true,
        animationType: "glow",
      },
      {
        id: "mining-streak",
        name: "Mining Streak",
        image: "/nft-streak.png",
        rarity: "rare",
        description: "Earned by mining consistently for a week",
        unlocked: false,
        animationType: "pulse",
      },
      {
        id: "master-miner",
        name: "Master Miner",
        image: "/nft-master.png",
        rarity: "epic",
        description: "Symbol of dedication - 30 days of continuous mining",
        unlocked: false,
        animationType: "rotate",
      },
      {
        id: "golden-pickaxe",
        name: "Golden Pickaxe",
        image: "/nft-pickaxe.png",
        rarity: "epic",
        description: "Symbol of a true mining master",
        unlocked: false,
        animationType: "float",
      },
      {
        id: "optimization-master",
        name: "Optimization Master",
        image: "/nft-optimization.png",
        rarity: "legendary",
        description: "Master of mining efficiency",
        unlocked: false,
        animationType: "glow",
      },
      {
        id: "social-master",
        name: "Social Master",
        image: "/nft-social.png",
        rarity: "rare",
        description: "Community engagement champion",
        unlocked: false,
        animationType: "pulse",
      },
      {
        id: "vip-crown",
        name: "VIP Crown",
        image: "/nft-vip-crown.png",
        rarity: "legendary",
        description: "Exclusive VIP status symbol",
        unlocked: false,
        animationType: "rotate",
      },
    ],
    dailyChallenges: [
      {
        id: "daily-mine",
        title: "Daily Grind",
        description: "Mine for at least 2 hours today",
        progress: 1.5,
        target: 2,
        reward: "100 XP + 25 MGC",
        completed: false,
        expiresAt: "2024-01-21T00:00:00Z",
      },
      {
        id: "efficiency-challenge",
        title: "Efficiency Master",
        description: "Maintain 90%+ efficiency for 1 hour",
        progress: 0.75,
        target: 1,
        reward: "150 XP + Efficiency Boost",
        completed: false,
        expiresAt: "2024-01-21T00:00:00Z",
      },
      {
        id: "social-challenge",
        title: "Share the Wealth",
        description: "Share your mining stats on social media",
        progress: 0,
        target: 1,
        reward: "200 XP + Social Badge",
        completed: false,
        expiresAt: "2024-01-21T00:00:00Z",
      },
    ],
  })

  // Load profile from localStorage
  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`gamification_${user.id}`)
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
      }
    }
  }, [user])

  // Save profile to localStorage
  useEffect(() => {
    if (user && profile) {
      localStorage.setItem(`gamification_${user.id}`, JSON.stringify(profile))
    }
  }, [profile, user])

  const addXP = (amount: number) => {
    setProfile((prev) => {
      const newTotalXp = prev.totalXp + amount
      const newXp = prev.xp + amount
      let newLevel = prev.level
      let newXpToNext = prev.xpToNext - amount

      // Level up logic
      while (newXpToNext <= 0) {
        newLevel++
        newXpToNext += 1000 + newLevel * 100 // Increasing XP requirement per level
        triggerVisualEffect("levelUp")
        playSound("levelUp")
      }

      return {
        ...prev,
        xp: newXp,
        totalXp: newTotalXp,
        level: newLevel,
        xpToNext: newXpToNext,
      }
    })
  }

  const completeAchievement = (id: string) => {
    setProfile((prev) => {
      const achievement = prev.achievements.find((a) => a.id === id)
      if (achievement && !achievement.unlocked) {
        triggerVisualEffect("congratulations")
        playSound("achievement")

        // Unlock associated NFT if exists
        if (achievement.nftReward) {
          claimNFTReward(achievement.nftReward)
        }

        return {
          ...prev,
          achievements: prev.achievements.map((a) =>
            a.id === id ? { ...a, unlocked: true, progress: a.maxProgress } : a,
          ),
        }
      }
      return prev
    })
  }

  const completeDailyChallenge = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      dailyChallenges: prev.dailyChallenges.map((challenge) =>
        challenge.id === id ? { ...challenge, completed: true, progress: challenge.target } : challenge,
      ),
    }))
    addXP(100)
    playSound("success")
  }

  const claimNFTReward = (id: string) => {
    setProfile((prev) => ({
      ...prev,
      nftCollection: prev.nftCollection.map((nft) => (nft.id === id ? { ...nft, unlocked: true } : nft)),
    }))
    triggerVisualEffect("congratulations")
  }

  const updateMiningStreak = () => {
    const today = new Date().toDateString()
    const lastMining = new Date(profile.miningStreak.lastMiningDate).toDateString()

    if (today !== lastMining) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      setProfile((prev) => {
        const isConsecutive = yesterday.toDateString() === lastMining
        const newCurrent = isConsecutive ? prev.miningStreak.current + 1 : 1
        const newLongest = Math.max(prev.miningStreak.longest, newCurrent)

        // Check streak achievements
        if (newCurrent === 7) {
          completeAchievement("week-warrior")
        }
        if (newCurrent === 30) {
          completeAchievement("month-master")
        }

        return {
          ...prev,
          miningStreak: {
            current: newCurrent,
            longest: newLongest,
            lastMiningDate: new Date().toISOString(),
          },
        }
      })
    }
  }

  const checkVIPQualification = () => {
    // This would integrate with referral context to check total bonus
    // For now, simulate based on current progress
    setProfile((prev) => {
      const totalBonus = prev.vipStatus.qualificationProgress
      const isQualified = totalBonus >= 0.001 // 0.1% threshold

      if (isQualified && !prev.vipStatus.isVIP) {
        completeAchievement("vip-qualified")
        claimNFTReward("vip-crown")

        return {
          ...prev,
          vipStatus: {
            isVIP: true,
            tier: "silver",
            qualificationProgress: totalBonus,
            earningsBoost: 0.15, // 15% boost
            exclusiveMiners: ["VIP Quantum Miner", "VIP Fusion Reactor", "VIP Stellar Engine"],
            specialBadge: "VIP Silver Crown",
          },
        }
      }

      return prev
    })
  }

  const triggerVisualEffect = (type: "coinRain" | "neonGlow" | "congratulations" | "levelUp") => {
    // Create visual effect elements
    const effect = document.createElement("div")
    effect.className = `visual-effect ${type}`

    switch (type) {
      case "coinRain":
        effect.innerHTML = "💰".repeat(20)
        effect.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
          animation: coinRain 3s ease-out forwards;
        `
        break
      case "congratulations":
        effect.innerHTML = "🎉 Congratulations! 🎉"
        effect.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2rem;
          color: #ffd700;
          pointer-events: none;
          z-index: 9999;
          animation: congratulations 2s ease-out forwards;
        `
        break
      case "levelUp":
        effect.innerHTML = "⬆️ LEVEL UP! ⬆️"
        effect.style.cssText = `
          position: fixed;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2.5rem;
          color: #8b5cf6;
          pointer-events: none;
          z-index: 9999;
          animation: levelUp 3s ease-out forwards;
        `
        break
    }

    document.body.appendChild(effect)
    setTimeout(() => effect.remove(), 3000)
  }

  const playSound = (type: "success" | "achievement" | "levelUp" | "mining") => {
    // In a real app, you would play actual sound files
    console.log(`[v0] Playing sound: ${type}`)
  }

  // Simulate progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProfile((prev) => ({
        ...prev,
        dailyChallenges: prev.dailyChallenges.map((challenge) => {
          if (!challenge.completed && Math.random() < 0.1) {
            const newProgress = Math.min(challenge.target, challenge.progress + Math.random() * 0.1)
            return { ...challenge, progress: newProgress }
          }
          return challenge
        }),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <GamificationContext.Provider
      value={{
        profile,
        addXP,
        completeAchievement,
        completeDailyChallenge,
        claimNFTReward,
        updateMiningStreak,
        checkVIPQualification,
        triggerVisualEffect,
        playSound,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
