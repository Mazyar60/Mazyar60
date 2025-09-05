"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/contexts/wallet-context"
import { useAuth } from "@/contexts/auth-context"
import { Shield, CheckCircle, Calendar, Mail, Wallet, Copy } from "lucide-react"
import { useState } from "react"

export function ProfileOverview() {
  const { address, isConnected } = useWallet()
  const { user, siweSession } = useAuth()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Account Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Email:</span>
            <span className="text-sm font-medium">{user?.email || "Not connected"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Joined:</span>
            <span className="text-sm font-medium">{joinDate}</span>
          </div>

          {address && (
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Wallet:</span>
              <span className="text-sm font-medium">{formatAddress(address)}</span>
              <Button variant="ghost" size="sm" onClick={copyAddress} className="h-6 w-6 p-0">
                <Copy className="h-3 w-3" />
              </Button>
              {copied && <span className="text-xs text-green-400">Copied!</span>}
            </div>
          )}
        </div>

        {/* Verification Status */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Verification Status</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-green-400 border-green-400/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              Email Verified
            </Badge>

            {siweSession ? (
              <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                <Shield className="h-3 w-3 mr-1" />
                Wallet Verified
              </Badge>
            ) : (
              <Badge variant="outline" className="text-yellow-400 border-yellow-400/30">
                <Shield className="h-3 w-3 mr-1" />
                Wallet Pending
              </Badge>
            )}

            {user?.profile?.isVIP && (
              <Badge variant="outline" className="text-purple-400 border-purple-400/30">
                👑 VIP Member
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-primary/20">
          <div className="flex gap-2">
            {!siweSession && isConnected && (
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                Verify Wallet
              </Button>
            )}
            <Button size="sm" variant="outline" className="text-xs bg-transparent">
              Edit Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
