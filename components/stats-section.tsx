import { Card, CardContent } from "@/components/ui/card"
import { Users, DollarSign, Zap, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "9",
    label: "Total Users",
    color: "text-chart-3",
  },
  {
    icon: DollarSign,
    value: "369",
    label: "Total Rewards",
    color: "text-chart-1",
  },
  {
    icon: Zap,
    value: "3",
    label: "Active Miners",
    color: "text-chart-2",
  },
  {
    icon: TrendingUp,
    value: "0",
    label: "Daily Rewards Paid",
    color: "text-chart-4",
  },
]

export function StatsSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-colors"
            >
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className={`p-3 rounded-full bg-primary/10 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-2xl font-serif font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
