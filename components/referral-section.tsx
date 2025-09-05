import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, Gift, Copy } from "lucide-react"

export function ReferralSection() {
  return (
    <section id="referrals" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Invite Your Friends</h2>
            <p className="text-lg text-muted-foreground">
              Send the invitation code to invite others and boost your mining power.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary">
                  <Users className="w-5 h-5" />
                  Invite Friends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Enter invitation code" className="bg-input border-border" />
                  <Button className="glow-effect">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <Button className="w-full" variant="secondary">
                  Copy Invite Link
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Share your unique code and earn bonus rewards for each friend who joins!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Gift className="w-5 h-5" />
                  Referrals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-foreground">0</div>
                    <div className="text-sm text-muted-foreground">Referred Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-serif font-bold text-secondary">0</div>
                    <div className="text-sm text-muted-foreground">Mining Bonus</div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Earn 10% bonus mining power for each successful referral
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 glow-effect inline-block">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <img src="/3d-mining-hardware.png" alt="Connected Mining" className="w-20 h-20" />
                  <div className="text-left">
                    <h3 className="font-serif font-semibold text-foreground mb-1">
                      Connecting to Ranking Game Account
                    </h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                        <span>Level Promotion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span>Rewards For Gaming Activities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span>Exclusive Plans Accessibility</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="mt-4 w-full" variant="secondary">
                  Connect Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
