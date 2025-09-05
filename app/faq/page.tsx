import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Zap, Wallet, Shield, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions | CoinMining.Game",
  description:
    "Get answers to common questions about CoinMining.Game staking platform, APR calculations, wallet connections, and more.",
  keywords: ["FAQ", "help", "staking questions", "crypto mining", "APR", "wallet connection"],
  openGraph: {
    title: "FAQ - CoinMining.Game",
    description: "Get answers to common questions about our staking platform",
    type: "website",
  },
}

const faqData = [
  {
    category: "Getting Started",
    icon: Zap,
    questions: [
      {
        question: "What is CoinMining.Game?",
        answer:
          "CoinMining.Game is a decentralized staking platform where you can stake RZ and MGC tokens to earn guaranteed daily rewards with transparent APR calculations.",
      },
      {
        question: "How do I get started?",
        answer:
          "1. Connect your MetaMask wallet, 2. Switch to BNB Smart Chain network, 3. Choose a staking plan, 4. Enter your stake amount, 5. Start earning rewards!",
      },
      {
        question: "What tokens can I stake?",
        answer:
          "Currently, you can stake RZ tokens (0x6BC5AbCc56874D7fACb90C2c3812cc19aAf9B204) and MGC tokens (0xbb73BB2505AC4643d5C0a99c2A1F34B3DfD09D11) on the BNB Smart Chain.",
      },
    ],
  },
  {
    category: "Staking & Rewards",
    icon: TrendingUp,
    questions: [
      {
        question: "How are APR rates calculated?",
        answer:
          "APR (Annual Percentage Rate) is divided by 365 for daily rates and by 12 for monthly rates. For example, 12% APR = 0.0329% daily rate. All calculations are transparent and verifiable.",
      },
      {
        question: "When do I receive rewards?",
        answer:
          "Rewards are calculated continuously and can be claimed at any time. The longer you wait to claim, the more rewards accumulate based on your daily rate.",
      },
      {
        question: "What are lock periods?",
        answer:
          "Lock periods are minimum staking durations ranging from 30 to 365 days depending on your plan. Higher APR plans typically have longer lock periods.",
      },
      {
        question: "Can I withdraw early?",
        answer:
          "Emergency withdrawal is available but may result in penalty fees and loss of pending rewards. Regular withdrawals are available after the lock period ends.",
      },
    ],
  },
  {
    category: "Wallet & Security",
    icon: Wallet,
    questions: [
      {
        question: "Which wallets are supported?",
        answer:
          "We support MetaMask and any wallet compatible with BNB Smart Chain. Make sure you're connected to the correct network (Chain ID: 56).",
      },
      {
        question: "Is my wallet safe?",
        answer:
          "Yes, you maintain full custody of your tokens. We never have access to your private keys. All transactions are executed through secure smart contracts.",
      },
      {
        question: "Why do I need to switch to BSC?",
        answer:
          "RZ and MGC tokens operate on BNB Smart Chain for lower fees and faster transactions. The platform automatically detects and prompts network switches.",
      },
    ],
  },
  {
    category: "Technical",
    icon: Shield,
    questions: [
      {
        question: "Are the smart contracts audited?",
        answer:
          "Our smart contracts follow industry best practices. All contract addresses are publicly verifiable on BSCScan for transparency.",
      },
      {
        question: "What are the fees?",
        answer:
          "Platform fees are minimal and transparently disclosed. You only pay standard BSC network gas fees for transactions.",
      },
      {
        question: "How do I track my staking positions?",
        answer:
          "Visit the 'My Miners' page to view all your active staking positions, pending rewards, unlock dates, and total earnings.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-serif font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground text-lg">Find answers to common questions about CoinMining.Game</p>
          </div>

          <div className="space-y-8">
            {faqData.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-primary" />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardContent className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Contact our support team.
              </p>
              <a href="/support" className="text-primary hover:underline">
                Contact Support →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
