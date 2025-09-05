"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Eye, Mail } from "lucide-react"

export function ProfileSettings() {
  const [notifications, setNotifications] = useState({
    mining: true,
    achievements: true,
    vip: true,
    referrals: false,
  })

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showEarnings: false,
    showRank: true,
  })

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Mining Updates</Label>
                    <p className="text-xs text-muted-foreground">Get notified about mining status changes</p>
                  </div>
                  <Switch
                    checked={notifications.mining}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, mining: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Achievement Unlocks</Label>
                    <p className="text-xs text-muted-foreground">Celebrate when you unlock new achievements</p>
                  </div>
                  <Switch
                    checked={notifications.achievements}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, achievements: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">VIP Benefits</Label>
                    <p className="text-xs text-muted-foreground">Updates about VIP rewards and bonuses</p>
                  </div>
                  <Switch
                    checked={notifications.vip}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, vip: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Referral Rewards</Label>
                    <p className="text-xs text-muted-foreground">When your referrals earn rewards</p>
                  </div>
                  <Switch
                    checked={notifications.referrals}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, referrals: checked }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Public Profile</Label>
                    <p className="text-xs text-muted-foreground">Allow others to view your profile</p>
                  </div>
                  <Switch
                    checked={privacy.publicProfile}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, publicProfile: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Earnings</Label>
                    <p className="text-xs text-muted-foreground">Display your earnings on public profile</p>
                  </div>
                  <Switch
                    checked={privacy.showEarnings}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showEarnings: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Show Rank</Label>
                    <p className="text-xs text-muted-foreground">Display your leaderboard rank</p>
                  </div>
                  <Switch
                    checked={privacy.showRank}
                    onCheckedChange={(checked) => setPrivacy((prev) => ({ ...prev, showRank: checked }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input id="username" defaultValue="MiningVeteran" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input id="email" type="email" defaultValue="user@example.com" className="mt-1" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-primary/20">
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-400 border-green-400/30">
              <Shield className="h-3 w-3 mr-1" />
              Account Verified
            </Badge>
            <Badge variant="outline" className="text-blue-400 border-blue-400/30">
              2FA Enabled
            </Badge>
          </div>
          <Button className="glow-effect">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
