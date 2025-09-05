import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Cpu } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                <span className="text-foreground">Stake Your </span>
                <span className="text-primary pulse-neon">RZ Tokens</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold text-secondary">Upgrade Miners</h2>
              <h3 className="text-xl md:text-2xl font-serif font-medium text-muted-foreground">Earn Daily Rewards</h3>
            </div>

            <p className="text-lg text-muted-foreground max-w-md">
              Join the future of crypto mining with our advanced staking platform. Upgrade your mining rigs and earn
              passive income daily.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="glow-effect group">
                Start Mining
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Connect Ranking Account
              </Button>
            </div>
          </div>

          <div className="relative">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20 glow-effect">
              <div className="flex items-center justify-center mb-6">
                <img src="/crypto-mining-rig.png" alt="Mining Hardware" className="w-full max-w-sm" />
              </div>
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Cpu className="w-5 h-5" />
                  <span className="font-semibold">Mining Active</span>
                </div>
                <p className="text-sm text-muted-foreground">Your mining rigs are generating rewards 24/7</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
