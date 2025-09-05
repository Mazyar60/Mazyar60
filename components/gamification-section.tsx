import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Gift, Users, Calendar, Zap } from "lucide-react"

export function GameificationSection() {
  const achievements = [
    { name: "First Mine", description: "Complete your first mining session", progress: 100, icon: Zap, unlocked: true },
    { name: "Week Warrior", description: "Mine for 7 consecutive days", progress: 85, icon: Calendar, unlocked: false },
    { name: "Token Master", description: "Earn 1,000 tokens", progress: 67, icon: Star, unlocked: false },
    { name: "Referral King", description: "Refer 10 friends", progress: 30, icon: Users, unlocked: false },
  ]

  const rewards = [
    { name: "Daily Login Bonus", type: "50 MGC", available: true },
    { name: "Weekly Challenge", type: "NFT Badge", available: true },
    { name: "Monthly Milestone", type: "VIP Access", available: false },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Gamification & Rewards
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Unlock <span className="text-primary">Achievements</span> & Earn{" "}
            <span className="text-secondary">Rewards</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Level up your mining experience with achievements, NFT rewards, and exclusive bonuses
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-secondary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-background/50">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.unlocked ? "bg-secondary/20 text-secondary" : "bg-muted/20 text-muted-foreground"
                    }`}
                  >
                    <achievement.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                      {achievement.unlocked && (
                        <Badge variant="secondary" className="text-xs">
                          Unlocked
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rewards */}
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Available Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rewards.map((reward, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                  <div>
                    <h4 className="font-semibold text-foreground">{reward.name}</h4>
                    <p className="text-sm text-muted-foreground">{reward.type}</p>
                  </div>
                  <Button size="sm" disabled={!reward.available} className={reward.available ? "glow-effect" : ""}>
                    {reward.available ? "Claim" : "Locked"}
                  </Button>
                </div>
              ))}

              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                <h4 className="font-semibold text-foreground mb-2">Referral Bonuses</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-primary font-bold">+2%</div>
                    <div className="text-muted-foreground">1-5 Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary font-bold">+4%</div>
                    <div className="text-muted-foreground">6-15 Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary font-bold">+6%</div>
                    <div className="text-muted-foreground">16-30 Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary font-bold">+8%</div>
                    <div className="text-muted-foreground">30+ Referrals</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="glow-effect">
            <Users className="w-5 h-5 mr-2" />
            Invite Friends & Earn More
          </Button>
        </div>
      </div>
    </section>
  )
}
