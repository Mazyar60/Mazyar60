import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms of Service - CoinMining.Game",
  description:
    "Terms of Service and User Agreement for CoinMining.Game staking platform. Read our terms before using our services.",
  keywords: ["terms of service", "user agreement", "legal", "staking terms", "crypto terms"],
  openGraph: {
    title: "Terms of Service - CoinMining.Game",
    description: "Terms of Service and User Agreement for CoinMining.Game staking platform",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground text-lg">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  1. Acceptance of Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  By accessing and using CoinMining.Game ("the Platform"), you accept and agree to be bound by the terms
                  and provision of this agreement.
                </p>
                <p>If you do not agree to abide by the above, please do not use this service.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Platform Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  CoinMining.Game is a decentralized staking platform that allows users to stake RZ and MGC tokens to
                  earn rewards through transparent APR calculations.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Staking rewards are calculated based on clearly defined APR rates</li>
                  <li>All transactions occur on the BNB Smart Chain (BSC)</li>
                  <li>Users maintain full custody of their tokens through wallet connections</li>
                  <li>Platform fees and reward structures are transparent and disclosed</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Users are responsible for:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Maintaining the security of their wallet and private keys</li>
                  <li>Understanding the risks associated with cryptocurrency staking</li>
                  <li>Complying with applicable laws and regulations in their jurisdiction</li>
                  <li>Providing accurate information during account registration</li>
                  <li>Not engaging in fraudulent or malicious activities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  4. Risk Disclosure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-semibold text-orange-400">
                  IMPORTANT: Cryptocurrency staking involves significant risks.
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Token values can fluctuate significantly</li>
                  <li>Smart contract risks may result in loss of funds</li>
                  <li>Staking rewards are not guaranteed</li>
                  <li>Lock periods may prevent immediate access to staked tokens</li>
                  <li>Regulatory changes may affect platform operations</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  By using this platform, you acknowledge that you understand these risks and agree to assume full
                  responsibility for any losses.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  CoinMining.Game and its operators shall not be liable for any direct, indirect, incidental, special,
                  consequential, or punitive damages resulting from your use of the platform.
                </p>
                <p>The platform is provided "as is" without warranties of any kind, either express or implied.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  For questions about these Terms of Service, please contact us through our support channels available
                  on the platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
