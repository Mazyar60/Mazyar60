import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { SuggestedMiners } from "@/components/suggested-miners"
import { LiveDashboard } from "@/components/live-dashboard"
import { TokenCharts } from "@/components/token-charts"
import { GameificationSection } from "@/components/gamification-section"
import { LiveMiningStats } from "@/components/live-mining-stats"
import { LiveChat } from "@/components/live-chat"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Header />
      <main className="relative z-10">
        <HeroSection />
        <HowItWorks />
        <SuggestedMiners />
        <LiveDashboard />
        <TokenCharts />

        <section className="py-20 px-4 bg-gradient-to-b from-muted/5 to-background">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Live Mining Network
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Real-time network statistics and community chat</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LiveMiningStats />
              <LiveChat />
            </div>
          </div>
        </section>

        <GameificationSection />
      </main>
      <Footer />
    </div>
  )
}
