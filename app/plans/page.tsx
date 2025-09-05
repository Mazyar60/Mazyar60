import { Header } from "@/components/header"
import { MiningPlans } from "@/components/mining-plans"
import { Footer } from "@/components/footer"

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              Mining <span className="text-primary">Plans</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect mining plan based on your token balance and earning goals
            </p>
          </div>
          <MiningPlans />
        </div>
      </main>
      <Footer />
    </div>
  )
}
