"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, Zap, Wallet, Crown, Activity, Users, Info, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"
import { LiveNotifications } from "@/components/live-notifications"
import { useAuth } from "@/contexts/auth-context"

export function Header() {
  const { isConnected, address, connectWallet, disconnectWallet, isLoading, error, switchToBSC, isCorrectNetwork } =
    useWallet()
  const { isAuthenticated, user, logout } = useAuth()

  const navigationItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/plans", label: "Plans", icon: null },
    { href: "/miners", label: "My Miners", icon: null },
    { href: "/wallet", label: "Wallet", icon: Wallet },
    { href: "/vip", label: "VIP", icon: Crown },
    { href: "/activities", label: "Activities", icon: Activity },
    { href: "/referral", label: "Referral", icon: Users },
    { href: "/about", label: "About", icon: Info },
    { href: "/support", label: "Support", icon: HelpCircle },
  ]

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <>
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center glow-effect">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-bold text-foreground pulse-neon">
                CoinMining<span className="text-primary">.Game</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navigationItems.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors hover:glow-effect px-2 py-1 rounded"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <LiveNotifications />

              {isAuthenticated ? (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Welcome, {user?.firstName}</span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                    Sign In
                  </Button>
                </Link>
              )}

              {isConnected ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={`${isCorrectNetwork ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}`}
                  >
                    {isCorrectNetwork ? "BSC Connected" : "Wrong Network"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{formatAddress(address!)}</span>
                  {!isCorrectNetwork && (
                    <Button variant="ghost" size="sm" onClick={switchToBSC}>
                      Switch to BSC
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={disconnectWallet}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="hidden sm:flex flex-col items-end gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent hover:bg-primary/10"
                    onClick={connectWallet}
                    disabled={isLoading}
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {isLoading ? "Opening..." : "Connect Wallet"}
                  </Button>
                  {error && <span className="text-xs text-red-400">{error}</span>}
                </div>
              )}

              <Link href="/plans">
                <Button size="sm" className="glow-effect">
                  Start Mining
                </Button>
              </Link>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col gap-4 mt-8">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <span className="font-bold">CoinMining.Game</span>
                    </div>

                    {!isAuthenticated && (
                      <Link href="/auth/login">
                        <Button className="w-full mb-4">Sign In</Button>
                      </Link>
                    )}

                    {!isConnected && (
                      <Button onClick={connectWallet} className="mb-4">
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Wallet
                      </Button>
                    )}

                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 rounded hover:bg-accent/10"
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
