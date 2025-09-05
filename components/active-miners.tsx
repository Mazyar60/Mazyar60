"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Settings, Zap } from "lucide-react"

interface Miner {
  id: string
  name: string
  type: "GPU" | "ASIC" | "CPU"
  status: "active" | "idle" | "maintenance"
  hashRate: number
  power: number
  temperature: number
  efficiency: number
  earnings: number
  uptime: number
}

export function ActiveMiners() {
  const [miners, setMiners] = useState<Miner[]>([
    {
      id: "1",
      name: "RTX 4090 Rig #1",
      type: "GPU",
      status: "active",
      hashRate: 125.5,
      power: 450,
      temperature: 72,
      efficiency: 95,
      earnings: 0.0234,
      uptime: 98.5,
    },
    {
      id: "2",
      name: "Antminer S19 Pro",
      type: "ASIC",
      status: "active",
      hashRate: 110.0,
      power: 3250,
      temperature: 68,
      efficiency: 92,
      earnings: 0.0456,
      uptime: 99.2,
    },
    {
      id: "3",
      name: "CPU Mining Rig",
      type: "CPU",
      status: "idle",
      hashRate: 0,
      power: 0,
      temperature: 45,
      efficiency: 0,
      earnings: 0,
      uptime: 0,
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMiners((prev) =>
        prev.map((miner) => {
          if (miner.status === "active") {
            return {
              ...miner,
              hashRate: miner.hashRate + (Math.random() - 0.5) * 5,
              temperature: Math.max(60, Math.min(80, miner.temperature + (Math.random() - 0.5) * 2)),
              earnings: miner.earnings + Math.random() * 0.0001,
            }
          }
          return miner
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const toggleMiner = (id: string) => {
    setMiners((prev) =>
      prev.map((miner) =>
        miner.id === id ? { ...miner, status: miner.status === "active" ? "idle" : "active" } : miner,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "idle":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Active Miners
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {miners.map((miner) => (
          <div key={miner.id} className="p-4 rounded-lg bg-background/50 border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(miner.status)} animate-pulse`} />
                <h3 className="font-semibold text-foreground">{miner.name}</h3>
                <Badge variant="outline" className="text-xs">
                  {miner.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => toggleMiner(miner.id)} className="h-8 w-8 p-0">
                  {miner.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Hash Rate</p>
                <p className="font-semibold text-primary">{miner.hashRate.toFixed(1)} MH/s</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Power</p>
                <p className="font-semibold">{miner.power}W</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Temperature</p>
                <p className="font-semibold">{miner.temperature}°C</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Earnings</p>
                <p className="font-semibold text-green-400">{miner.earnings.toFixed(4)} RZ</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Efficiency</span>
                <span>{miner.efficiency}%</span>
              </div>
              <Progress value={miner.efficiency} className="h-2" />

              <div className="flex justify-between text-xs">
                <span>Uptime</span>
                <span>{miner.uptime}%</span>
              </div>
              <Progress value={miner.uptime} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
