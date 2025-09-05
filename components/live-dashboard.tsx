"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Zap, Clock, DollarSign, Activity, Pause } from "lucide-react"
import { useState, useEffect } from "react"

export function LiveDashboard() {
  const [isActive, setIsActive] = useState(true)
  const [currentEarnings, setCurrentEarnings] = useState(247.83)
  const [hashRate, setHashRate] = useState(5.2)

  useEffect(() => {
    if (!isActive) return

    const interval = setInterval(() => {
      setCurrentEarnings((prev) => prev + Math.random() * 0.1)
      setHashRate((prev) => prev + (Math.random() * 0.2 - 0.1))
    }, 2000)

    return () => clearInterval(interval)
  }, [isActive])

  const stats = [
    {
      title: "Current Mined",
      value: `${currentEarnings.toFixed(2)} MGC`,
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: "Hash Rate",
      value: `${hashRate.toFixed(1)} TH/s`,
      change: "Stable",
      icon: Zap,
      color: "text-primary",
    },
    {
      title: "Runtime",
      value: "2h 34m",
      change: "Active",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      title: "Total Earned",
      value: "1,847.92 MGC",
      change: "+8.2%",
      icon: TrendingUp,
      color: "text-secondary",
    },
  ]

  return (
    <section className="py-20 px-4 bg-card/10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Activity className="w-4 h-4 mr-2" />
            Live Dashboard
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Real-time <span className="text-primary">Mining Status</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Monitor your mining operations with live updates and detailed analytics
          </p>
        </div>

        {/* Status Banner */}
        <Card className="mb-8 bg-gradient-to-r from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Turbo Miner Active</h3>
                  <p className="text-sm text-muted-foreground">Mining MGC tokens at optimal efficiency</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsActive(!isActive)}>
                {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Zap className="w-4 h-4 mr-2" />}
                {isActive ? "Pause" : "Resume"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card/50 border-border/50 hover:glow-effect transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <Badge variant="outline" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Mining Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="7d" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="7d">7 Days</TabsTrigger>
                <TabsTrigger value="30d">30 Days</TabsTrigger>
                <TabsTrigger value="60d">60 Days</TabsTrigger>
              </TabsList>
              <TabsContent value="7d" className="mt-6">
                <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">7-day performance chart will be implemented with real data</p>
                </div>
              </TabsContent>
              <TabsContent value="30d" className="mt-6">
                <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">30-day performance chart will be implemented with real data</p>
                </div>
              </TabsContent>
              <TabsContent value="60d" className="mt-6">
                <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">60-day performance chart will be implemented with real data</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
