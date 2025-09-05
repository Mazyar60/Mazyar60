import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VIPTiers } from "@/components/vip-tiers"
import { VIPBenefits } from "@/components/vip-benefits"
import { VIPStats } from "@/components/vip-stats"

export default function VIPPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              <span className="text-secondary">VIP</span> Membership
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Unlock exclusive benefits, higher rewards, and premium features with our VIP membership tiers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <VIPTiers />
            </div>
            <div>
              <VIPStats />
            </div>
          </div>

          <VIPBenefits />
        </div>
      </main>
      <Footer />
    </div>
  )
}
