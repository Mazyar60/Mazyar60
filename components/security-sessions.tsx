"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Smartphone, Monitor, Globe, Clock } from "lucide-react"

export function SecuritySessions() {
  const activeSessions = [
    {
      id: "current",
      device: "Chrome on Windows",
      location: "New York, US",
      ip: "192.168.1.100",
      lastActive: "Now",
      isCurrent: true,
      icon: Monitor,
    },
    {
      id: "mobile",
      device: "Safari on iPhone",
      location: "New York, US",
      ip: "192.168.1.101",
      lastActive: "2 hours ago",
      isCurrent: false,
      icon: Smartphone,
    },
    {
      id: "tablet",
      device: "Chrome on Android",
      location: "New York, US",
      ip: "192.168.1.102",
      lastActive: "1 day ago",
      isCurrent: false,
      icon: Smartphone,
    },
  ]

  const securityFeatures = [
    { name: "Two-Factor Authentication", enabled: true },
    { name: "Email Notifications", enabled: true },
    { name: "Login Alerts", enabled: false },
    { name: "Device Recognition", enabled: true },
  ]

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Security & Sessions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Security Status */}
        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Score</p>
              <p className="text-xl font-bold text-green-400">Excellent</p>
            </div>
            <Shield className="h-8 w-8 text-green-400" />
          </div>
        </div>

        {/* Active Sessions */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Active Sessions</h4>
          {activeSessions.map((session) => (
            <div key={session.id} className="p-3 rounded-lg bg-background/50 border border-primary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <session.icon className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{session.device}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-3 w-3" />
                      <span>{session.location}</span>
                      <span>•</span>
                      <span>{session.ip}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {session.isCurrent ? (
                    <Badge variant="outline" className="text-green-400 border-green-400/30">
                      Current
                    </Badge>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                      Revoke
                    </Button>
                  )}
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    {session.lastActive}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Security Features</h4>
          <div className="grid grid-cols-2 gap-2">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-background/30">
                <span className="text-sm text-foreground">{feature.name}</span>
                <Badge
                  variant="outline"
                  className={
                    feature.enabled ? "text-green-400 border-green-400/30" : "text-yellow-400 border-yellow-400/30"
                  }
                >
                  {feature.enabled ? "On" : "Off"}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          Manage Security Settings
        </Button>
      </CardContent>
    </Card>
  )
}
