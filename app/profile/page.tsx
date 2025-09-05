import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UserProfileCard } from "@/components/user-profile-card"
import { ProfileStats } from "@/components/profile-stats"
import { AchievementShowcase } from "@/components/achievement-showcase"
import { MiningAnalytics } from "@/components/mining-analytics"
import { ProfileSettings } from "@/components/profile-settings"
import { ProfileOverview } from "@/components/profile-overview"
import { LiveBalances } from "@/components/live-balances"
import { ActiveMinersOverview } from "@/components/active-miners-overview"
import { RewardsHistory } from "@/components/rewards-history"
import { ReferralManagement } from "@/components/referral-management"
import { SecuritySessions } from "@/components/security-sessions"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              My <span className="text-primary">Profile</span>
            </h1>
            <p className="text-muted-foreground">Manage your account and view your mining journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="space-y-6">
              <ProfileOverview />
              <UserProfileCard />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <LiveBalances />
              <ProfileStats />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ActiveMinersOverview />
            <RewardsHistory />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ReferralManagement />
            <AchievementShowcase />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SecuritySessions />
            <MiningAnalytics />
          </div>

          <ProfileSettings />
        </div>
      </main>
      <Footer />
    </div>
  )
}
