import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, MessageCircle, Mail, ExternalLink, AlertCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Support - Get Help | CoinMining.Game",
  description:
    "Get support for CoinMining.Game. Find help with staking, wallet connections, technical issues, and more.",
  keywords: ["support", "help", "contact", "technical support", "customer service"],
  openGraph: {
    title: "Support - CoinMining.Game",
    description: "Get help with staking, wallet connections, and technical issues",
    type: "website",
  },
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">Support Center</h1>
            <p className="text-muted-foreground text-lg">We're here to help you with any questions or issues</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  Live Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Get instant help from our support team through live chat.</p>
                <Button className="w-full" disabled>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Start Live Chat (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-400" />
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Send us an email and we'll get back to you within 24 hours.</p>
                <Button variant="outline" className="w-full bg-transparent" disabled>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email (Coming Soon)
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Common Issues & Solutions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Wallet Connection Issues</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Make sure MetaMask is installed and unlocked</li>
                    <li>• Switch to BNB Smart Chain network (Chain ID: 56)</li>
                    <li>• Clear browser cache and try again</li>
                    <li>• Disable other wallet extensions temporarily</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Staking Problems</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ensure you have sufficient token balance</li>
                    <li>• Check minimum staking requirements for your chosen plan</li>
                    <li>• Verify you're on the correct network (BSC)</li>
                    <li>• Allow enough BNB for gas fees</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Rewards Not Showing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Rewards update every minute - please wait</li>
                    <li>• Refresh the page to see latest data</li>
                    <li>• Check that your staking position is active</li>
                    <li>• Verify your wallet is still connected</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Useful Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent" asChild>
                  <a href="/faq">
                    <div className="text-left">
                      <div className="font-semibold">FAQ</div>
                      <div className="text-sm text-muted-foreground">Frequently asked questions</div>
                    </div>
                  </a>
                </Button>

                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent" asChild>
                  <a href="/terms">
                    <div className="text-left">
                      <div className="font-semibold">Terms of Service</div>
                      <div className="text-sm text-muted-foreground">Legal terms and conditions</div>
                    </div>
                  </a>
                </Button>

                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent" asChild>
                  <a
                    href="https://bscscan.com/token/0xbb73BB2505AC4643d5C0a99c2A1F34B3DfD09D11"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-left flex-1">
                      <div className="font-semibold">MGC Contract</div>
                      <div className="text-sm text-muted-foreground">View on BSCScan</div>
                    </div>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>

                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent" asChild>
                  <a
                    href="https://bscscan.com/token/0x6BC5AbCc56874D7fACb90C2c3812cc19aAf9B204"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="text-left flex-1">
                      <div className="font-semibold">RZ Contract</div>
                      <div className="text-sm text-muted-foreground">View on BSCScan</div>
                    </div>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                Emergency Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                For urgent issues related to lost funds or security concerns, please contact us immediately through our
                priority support channels.
              </p>
              <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                <p className="text-sm text-orange-400">
                  <strong>Important:</strong> Never share your private keys or seed phrases with anyone, including
                  support staff. We will never ask for this information.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
