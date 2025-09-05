import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Target, Shield, Users, TrendingUp, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - CoinMining.Game",
  description:
    "Learn about CoinMining.Game, our mission to democratize crypto staking, and our commitment to transparency and security.",
  keywords: ["about", "mission", "crypto staking", "decentralized finance", "blockchain"],
  openGraph: {
    title: "About CoinMining.Game",
    description: "Democratizing crypto staking with transparent rewards and secure technology",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">About CoinMining.Game</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Democratizing crypto staking with transparent rewards, secure technology, and user-first design.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  CoinMining.Game was created to make cryptocurrency staking accessible, transparent, and rewarding for
                  everyone. We believe that earning passive income through crypto should be simple, secure, and fair.
                </p>
                <p>
                  Our platform eliminates the complexity typically associated with DeFi staking while maintaining the
                  security and transparency that blockchain technology provides.
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Security First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Non-custodial wallet integration</li>
                    <li>• Transparent smart contracts</li>
                    <li>• Regular security audits</li>
                    <li>• Open-source verification</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    Transparent Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Clear APR calculations</li>
                    <li>• Real-time reward tracking</li>
                    <li>• No hidden fees</li>
                    <li>• Verifiable on-chain data</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-400" />
                  Platform Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">RZ Token</Badge>
                    <span className="text-sm">Multi-tier staking plans</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">MGC Token</Badge>
                    <span className="text-sm">Gaming rewards token</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">BSC Network</Badge>
                    <span className="text-sm">Low fees, fast transactions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Real-time</Badge>
                    <span className="text-sm">Live price feeds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Mobile PWA</Badge>
                    <span className="text-sm">Works on any device</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">24/7</Badge>
                    <span className="text-sm">Always accessible</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  Community Driven
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We're building more than just a staking platform - we're creating a community of crypto enthusiasts
                  who believe in the power of decentralized finance.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">12%+</div>
                    <div className="text-sm text-muted-foreground">Base APR</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">Platform Uptime</div>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-primary">0%</div>
                    <div className="text-sm text-muted-foreground">Hidden Fees</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-purple-400 mb-2">MGC Token</h4>
                    <p className="text-sm text-muted-foreground mb-2">MetaGamescoin - Gaming Rewards Token</p>
                    <p className="text-xs font-mono break-all">0xbb73BB2505AC4643d5C0a99c2A1F34B3DfD09D11</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-semibold text-orange-400 mb-2">RZ Token</h4>
                    <p className="text-sm text-muted-foreground mb-2">RZ - Mining Utility Token</p>
                    <p className="text-xs font-mono break-all">0x6BC5AbCc56874D7fACb90C2c3812cc19aAf9B204</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
