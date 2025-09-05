"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRealtime } from "@/contexts/realtime-context"
import { Bell, X, Trash2 } from "lucide-react"

export function LiveNotifications() {
  const { notifications, markNotificationRead, clearNotifications } = useRealtime()
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "border-l-yellow-400"
      case "mining":
        return "border-l-blue-400"
      case "vip":
        return "border-l-purple-400"
      case "referral":
        return "border-l-green-400"
      case "system":
        return "border-l-orange-400"
      default:
        return "border-l-gray-400"
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return "Just now"
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative bg-transparent">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-hidden z-50 bg-card/95 backdrop-blur-sm border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {notifications.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={clearNotifications} className="h-6 w-6 p-0">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">No notifications yet</div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-l-2 ${getNotificationColor(notification.type)} ${
                      !notification.read ? "bg-primary/5" : "bg-background/50"
                    } hover:bg-background/70 transition-colors cursor-pointer`}
                    onClick={() => markNotificationRead(notification.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {notification.icon && <span className="text-sm">{notification.icon}</span>}
                          <h4 className="text-sm font-medium text-foreground truncate">{notification.title}</h4>
                          {!notification.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</span>
                          <Badge variant="outline" className="text-xs">
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
