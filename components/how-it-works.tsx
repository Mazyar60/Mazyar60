import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Target, Zap, Gift } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Wallet,
      title: "Connect Wallet",
      description: "Link your MetaMask or WalletConnect to access your RZ & MGC tokens",
      color: "text-blue-400",
    },
    {
      icon: Target,
      title: "Select Token & Plan",
      description: "Choose from suggested miners based on your token balance and preferences",
      color: "text-green-400",
    },
    {
      icon: Zap,
      title: "Activate Miner",
      description: "Watch the neon ring spin as your miner comes online with stunning animations",
      color: "text-primary",
    },
    {
      icon: Gift,
      title: "Earn Rewards",
      description: "Collect daily rewards, unlock achievements, and climb the VIP tiers",
      color: "text-secondary",
    },
  ]

  return (
    <section className="py-20 px-4 bg-card/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Start Mining in <span className="text-primary">4 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process gets you mining in minutes with no complex setup required
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300 hover:glow-effect"
            >
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center ${step.color}`}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {index + 1}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
