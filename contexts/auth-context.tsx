"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  country: string
  city: string
  region: string
  mobile: string
  walletAddress?: string
  avatar?: string
  createdAt: string
  vipStatus: "none" | "silver" | "gold" | "diamond"
  level: number
  xp: number
  siweAuthenticated?: boolean
  siweAddress?: string
  siweChainId?: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
  linkWallet: (address: string) => Promise<void>
  checkSIWESession: () => Promise<void>
  logoutSIWE: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  country: string
  city: string
  region: string
  mobile: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAuthenticated = !!user

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      await checkSIWESession()

      if (!user) {
        const savedUser = localStorage.getItem("coinmining_user")
        const savedToken = localStorage.getItem("coinmining_token")

        if (savedUser && savedToken) {
          setUser(JSON.parse(savedUser))
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      localStorage.removeItem("coinmining_user")
      localStorage.removeItem("coinmining_token")
    } finally {
      setIsLoading(false)
    }
  }

  const checkSIWESession = async () => {
    try {
      const response = await fetch("/api/auth/siwe/session", {
        credentials: "include",
      })

      if (response.ok) {
        const sessionData = await response.json()

        if (sessionData.authenticated) {
          const siweUser: User = {
            id: `siwe_${sessionData.address}`,
            email: "",
            firstName: "Wallet",
            lastName: "User",
            country: "",
            city: "",
            region: "",
            mobile: "",
            walletAddress: sessionData.address,
            createdAt: new Date().toISOString(),
            vipStatus: "none",
            level: 1,
            xp: 0,
            siweAuthenticated: true,
            siweAddress: sessionData.address,
            siweChainId: sessionData.chainId,
          }

          setUser(siweUser)
          console.log("[v0] SIWE session restored for:", sessionData.address)
        }
      }
    } catch (error) {
      console.error("Error checking SIWE session:", error)
    }
  }

  const logoutSIWE = async () => {
    try {
      await fetch("/api/auth/siwe/session", {
        method: "DELETE",
        credentials: "include",
      })

      setUser(null)
      setError(null)
      console.log("[v0] SIWE session cleared")
    } catch (error) {
      console.error("Error logging out SIWE:", error)
    }
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const existingUsers = JSON.parse(localStorage.getItem("coinmining_users") || "[]")
      const existingUser = existingUsers.find((u: any) => u.email === email)

      if (!existingUser) {
        throw new Error("User not found. Please register first.")
      }

      if (existingUser.password !== password) {
        throw new Error("Invalid password")
      }

      const userData: User = {
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        country: existingUser.country,
        city: existingUser.city,
        region: existingUser.region,
        mobile: existingUser.mobile,
        walletAddress: existingUser.walletAddress,
        avatar: existingUser.avatar,
        createdAt: existingUser.createdAt,
        vipStatus: existingUser.vipStatus || "none",
        level: existingUser.level || 1,
        xp: existingUser.xp || 0,
      }

      setUser(userData)
      localStorage.setItem("coinmining_user", JSON.stringify(userData))
      localStorage.setItem("coinmining_token", `token_${userData.id}`)
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const existingUsers = JSON.parse(localStorage.getItem("coinmining_users") || "[]")
      const existingUser = existingUsers.find((u: any) => u.email === userData.email)

      if (existingUser) {
        throw new Error("User already exists with this email")
      }

      const newUser: User = {
        id: `user_${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        country: userData.country,
        city: userData.city,
        region: userData.region,
        mobile: userData.mobile,
        createdAt: new Date().toISOString(),
        vipStatus: "none",
        level: 1,
        xp: 0,
      }

      const updatedUsers = [...existingUsers, { ...newUser, password: userData.password }]
      localStorage.setItem("coinmining_users", JSON.stringify(updatedUsers))

      setUser(newUser)
      localStorage.setItem("coinmining_user", JSON.stringify(newUser))
      localStorage.setItem("coinmining_token", `token_${newUser.id}`)
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const googleUser: User = {
        id: `google_${Date.now()}`,
        email: "user@gmail.com",
        firstName: "John",
        lastName: "Doe",
        country: "United States",
        city: "New York",
        region: "NY",
        mobile: "+1234567890",
        avatar: "/diverse-user-avatars.png",
        createdAt: new Date().toISOString(),
        vipStatus: "none",
        level: 1,
        xp: 0,
      }

      setUser(googleUser)
      localStorage.setItem("coinmining_user", JSON.stringify(googleUser))
      localStorage.setItem("coinmining_token", `token_${googleUser.id}`)
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    if (user?.siweAuthenticated) {
      logoutSIWE()
    } else {
      setUser(null)
      setError(null)
      localStorage.removeItem("coinmining_user")
      localStorage.removeItem("coinmining_token")
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return

    setIsLoading(true)
    try {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("coinmining_user", JSON.stringify(updatedUser))

      const existingUsers = JSON.parse(localStorage.getItem("coinmining_users") || "[]")
      const updatedUsers = existingUsers.map((u: any) => (u.id === user.id ? { ...u, ...data } : u))
      localStorage.setItem("coinmining_users", JSON.stringify(updatedUsers))
    } catch (error: any) {
      setError(error.message)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const linkWallet = async (address: string) => {
    if (!user) return

    try {
      await updateProfile({ walletAddress: address })
    } catch (error: any) {
      setError(error.message)
      throw error
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    loginWithGoogle,
    logout,
    updateProfile,
    linkWallet,
    checkSIWESession,
    logoutSIWE,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
