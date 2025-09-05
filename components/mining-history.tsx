"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, TrendingUp, TrendingDown } from "lucide-react"

interface MiningRecord {
  id: string
  timestamp: string
  miner: string
  earnings: number
  duration: string
  status: "completed" | "interrupted" | "ongoing"
}

export function MiningHistory() {
  const records: MiningRecord[] = [
    {
      id: "1",
      timestamp: "2024-01-20 14:30",
      miner: "RTX 4090 Rig #1",
      earnings: 0.0234,
      duration: "6h 30m",
      status: "completed",
    },
    {
      id: "2",
      timestamp: "2024-01-20 08:00",
      miner: "Antminer S19 Pro",
      earnings: 0.0456,
      duration: "12h 00m",
      status: "completed",
    },
    {
      id: "3",
      timestamp: "2024-01-19 20:15",
      miner: "RTX 4090 Rig #1",
      earnings: 0.0189,
      duration: "4h 45m",
      status: "interrupted",
    },
    {
      id: "4",
      timestamp: "2024-01-19 12:00",
      miner: "CPU Mining Rig",
      earnings: 0.0067,
      duration: "8h 15m",
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500"
      case "interrupted":
        return "bg-red-500"
      case "ongoing":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <TrendingUp className="h-3 w-3" />
      case "interrupted":
        return <TrendingDown className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Mining History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.map((record) => (
            <div key={record.id} className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`text-xs ${getStatusColor(record.status)} text-white border-0`}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(record.status)}
                      {record.status}
                    </span>
                  </Badge>
                  <span className="text-sm text-muted-foreground">{record.timestamp}</span>
                </div>
                <span className="text-sm font-semibold text-green-400">+{record.earnings.toFixed(4)} RZ</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{record.miner}</span>
                <span className="text-muted-foreground">{record.duration}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Earnings (24h)</span>
            <span className="font-semibold text-primary">0.0946 RZ</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
