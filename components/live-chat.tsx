"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, Users } from "lucide-react"

interface ChatMessage {
  id: string
  username: string
  message: string
  timestamp: Date
  type: "user" | "system" | "vip"
}

export function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      username: "CryptoKing",
      message: "Just hit 100 MH/s on my new rig! 🚀",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: "vip",
    },
    {
      id: "2",
      username: "MiningMaster",
      message: "Nice! What GPU are you using?",
      timestamp: new Date(Date.now() - 4 * 60 * 1000),
      type: "user",
    },
    {
      id: "3",
      username: "System",
      message: "New mining pool launched with 2% lower fees!",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      type: "system",
    },
    {
      id: "4",
      username: "HashHero",
      message: "Anyone else seeing increased efficiency today?",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      type: "user",
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [onlineUsers] = useState(247)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const sampleMessages = [
          "Just earned my first RZ token! 💰",
          "VIP membership is totally worth it",
          "Anyone want to join a mining pool?",
          "New achievement unlocked! 🏆",
          "Market looking good today 📈",
          "My efficiency hit 98% today!",
        ]

        const sampleUsers = ["TokenTitan", "DigitalDragon", "BlockchainBoss", "CoinCrusher", "MinerPro", "CryptoNinja"]

        const randomMessage: ChatMessage = {
          id: Date.now().toString(),
          username: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
          message: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
          timestamp: new Date(),
          type: Math.random() < 0.2 ? "vip" : "user",
        }

        setMessages((prev) => [...prev.slice(-19), randomMessage]) // Keep only 20 messages
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        username: "You",
        message: newMessage.trim(),
        timestamp: new Date(),
        type: "user",
      }

      setMessages((prev) => [...prev, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getMessageStyle = (type: string) => {
    switch (type) {
      case "system":
        return "bg-blue-500/10 border-blue-500/20"
      case "vip":
        return "bg-purple-500/10 border-purple-500/20"
      default:
        return "bg-background/50 border-primary/10"
    }
  }

  const getUserBadge = (type: string) => {
    switch (type) {
      case "system":
        return <Badge className="bg-blue-500 text-white text-xs">System</Badge>
      case "vip":
        return <Badge className="bg-purple-500 text-white text-xs">VIP</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 h-96 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <MessageCircle className="h-4 w-4 text-primary" />
            Community Chat
          </CardTitle>
          <Badge variant="outline" className="text-green-400 border-green-400/30">
            <Users className="h-3 w-3 mr-1" />
            {onlineUsers} online
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {messages.map((message) => (
            <div key={message.id} className={`p-2 rounded-lg border ${getMessageStyle(message.type)}`}>
              <div className="flex items-center gap-2 mb-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs bg-primary/20 text-primary">
                    {message.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">{message.username}</span>
                {getUserBadge(message.type)}
                <span className="text-xs text-muted-foreground ml-auto">{formatTime(message.timestamp)}</span>
              </div>
              <p className="text-sm text-muted-foreground pl-8">{message.message}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-primary/20">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
