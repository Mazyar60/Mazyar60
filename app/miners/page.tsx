import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ActiveMiners } from "@/components/active-miners"
import { MiningStats } from "@/components/mining-stats"
import { MiningHistory } from "@/components/mining-history"
import { MinerControls } from "@/components/miner-controls"

export default function MinersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-8">
            My <span className="text-primary">Miners</span>
          </h1>
          <p className="text-muted-foreground mb-8">Manage your active mining operations</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <ActiveMiners />
            </div>
            <div>
              <MinerControls />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <MiningStats />
            <MiningHistory />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
