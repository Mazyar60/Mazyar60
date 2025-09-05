"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWallet } from "@/contexts/wallet-context"
import { Wallet, Send, History, TrendingUp, Copy, ExternalLink, AlertCircle } from "lucide-react"
import { useState } from "react"

export default function WalletPage() {
  const { isConnected, address, balance, connectWallet, sendTransaction, isLoading, error } = useWallet()
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [selectedToken, setSelectedToken] = useState("RZ")

  const handleSendTransaction = async () => {
    if (!sendAmount || !sendAddress) return

    try {
      const txHash = await sendTransaction(sendAddress, sendAmount, selectedToken)
      console.log("Transaction sent:", txHash)
      setSendAmount("")
      setSendAddress("")
    } catch (error) {
      console.error("Transaction failed:", error)
    }
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
    }
  }

  const transactions = [
    { hash: "0x1234...5678", type: "Received", amount: "+125.50 MGC", time: "2 hours ago", status: "Confirmed" },
    { hash: "0x2345...6789", type: "Mining Reward", amount: "+45.25 RZ", time: "5 hours ago", status: "Confirmed" },
    { hash: "0x3456...7890", type: "Sent", amount: "-50.00 MGC", time: "1 day ago", status: "Confirmed" },
    { hash: "0x4567...8901", type: "Staking Reward", amount: "+78.90 RZ", time: "2 days ago", status: "Confirmed" },
  ]

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center">
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-8">
                  <Wallet className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h2>
                  <p className="text-muted-foreground mb-6">
                    Connect your wallet to view balances, send transactions, and manage your mining rewards.
                  </p>
                  <Button onClick={connectWallet} disabled={isLoading} className="w-full glow-effect">
                    {isLoading ? "Connecting..." : "Connect Wallet"}
                  </Button>
                  {error && (
                    <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <div className="flex items-center gap-2 text-destructive text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
              <span className="text-primary">Wallet</span> Management
            </h1>
            <p className="text-muted-foreground">Manage your tokens, view balances, and track transactions</p>
          </div>

          {/* Wallet Overview */}
          <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Connected Wallet</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-mono">{address}</span>
                      <Button variant="ghost" size="sm" onClick={copyAddress}>
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                  BSC Network
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Token Balances */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-card/50 border-border/50 hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 font-bold">BNB</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{balance.eth.toFixed(4)}</div>
                <div className="text-sm text-muted-foreground">BNB Balance</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold">RZ</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{balance.rz.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">RZ Tokens</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:glow-effect transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-secondary font-bold">MGC</span>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{balance.mgc.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">MGC Tokens</div>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Actions */}
          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="send">Send Tokens</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>

            <TabsContent value="send" className="mt-6">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-primary" />
                    Send Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {["RZ", "MGC", "BNB"].map((token) => (
                      <Button
                        key={token}
                        variant={selectedToken === token ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedToken(token)}
                      >
                        {token}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                    />
                  </div>

                  <Button
                    onClick={handleSendTransaction}
                    disabled={!sendAmount || !sendAddress || isLoading}
                    className="w-full glow-effect"
                  >
                    {isLoading ? "Sending..." : `Send ${selectedToken}`}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <Card className="bg-card/50 border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Transaction History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((tx, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            {tx.type === "Received" || tx.type === "Mining Reward" || tx.type === "Staking Reward" ? (
                              <TrendingUp className="w-5 h-5 text-green-400" />
                            ) : (
                              <Send className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{tx.type}</div>
                            <div className="text-sm text-muted-foreground">{tx.hash}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`font-semibold ${tx.amount.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                          >
                            {tx.amount}
                          </div>
                          <div className="text-sm text-muted-foreground">{tx.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
