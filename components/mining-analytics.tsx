"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Calendar } from "lucide-react"

export function MiningAnalytics() {
  const analytics = [
    { period: "Today", earnings: 0.0234, efficiency: 94.2, uptime: 18.5 },
    { period: "This Week", earnings: 0.1567, efficiency: 92.8, uptime: 142.3 },
    { period: "This Month", earnings: 0.6789, efficiency: 93.5, uptime: 587.2 },
    { period: "All Time", earnings: 2.4567, efficiency: 93.1, uptime: 2847.6 },
  ]

  const bestPerformance = {
    day: "Jan 15, 2024",
    earnings: 0.0456,
    efficiency: 98.7,
    duration: "23.5 hours",
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Mining Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {analytics.map((item, index) => (
            <div key={index} className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{item.period}</h4>
                <Badge variant="outline" className="text-xs">
                  {item.uptime.toFixed(1)}h uptime
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Earnings:</span>
                  <div className="font-medium text-green-400">{item.earnings.toFixed(4)} RZ</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Efficiency:</span>
                  <div className="font-medium text-primary">{item.efficiency}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="font-semibold text-foreground">Best Performance Day</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span className="font-medium text-foreground">{bestPerformance.day}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Earnings:</span>
              <span className="font-medium text-green-400">{bestPerformance.earnings} RZ</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Efficiency:</span>
              <span className="font-medium text-primary">{bestPerformance.efficiency}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium text-foreground">{bestPerformance.duration}</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Badge variant="outline" className="text-primary border-primary">
            <Calendar className="h-3 w-3 mr-1" />
            Member for 45 days
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
