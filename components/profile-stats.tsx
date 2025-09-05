"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Clock, DollarSign, Users, Trophy } from "lucide-react"

export function ProfileStats() {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Earnings",
      value: "2.4567 RZ",
      change: "+12.5%",
      changeType: "positive" as const,
    },
    {
      icon: Zap,
      label: "Hash Rate",
      value: "235.5 MH/s",
      change: "+5.2%",
      changeType: "positive" as const,
    },
    {
      icon: Clock,
      label: "Mining Time",
      value: "847 hours",
      change: "+23h",
      changeType: "positive" as const,
    },
    {
      icon: Users,
      label: "Referrals",
      value: "12 friends",
      change: "+2",
      changeType: "positive" as const,
    },
    {
      icon: Trophy,
      label: "Achievements",
      value: "8/15",
      change: "+1",
      changeType: "positive" as const,
    },
    {
      icon: TrendingUp,
      label: "Efficiency",
      value: "94.2%",
      change: "-1.3%",
      changeType: "negative" as const,
    },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Mining Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <div className="space-y-1">
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "text-green-400 border-green-400/30"
                      : "text-red-400 border-red-400/30"
                  }`}
                >
                  {stat.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">Performance Summary</h4>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </div>
            <Badge className="bg-green-500 text-white">Excellent</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
