"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"

interface FeedbackMessage {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
}

interface UserFeedbackProps {
  messages: FeedbackMessage[]
  onDismiss: (id: string) => void
}

export function UserFeedback({ messages, onDismiss }: UserFeedbackProps) {
  useEffect(() => {
    messages.forEach((message) => {
      if (message.duration && message.duration > 0) {
        const timer = setTimeout(() => {
          onDismiss(message.id)
        }, message.duration)
        return () => clearTimeout(timer)
      }
    })
  }, [messages, onDismiss])

  if (messages.length === 0) return null

  const getIcon = (type: FeedbackMessage["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-400" />
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />
    }
  }

  const getStyles = (type: FeedbackMessage["type"]) => {
    switch (type) {
      case "success":
        return "border-green-500/30 bg-green-500/10"
      case "error":
        return "border-red-500/30 bg-red-500/10"
      case "warning":
        return "border-orange-500/30 bg-orange-500/10"
      case "info":
        return "border-blue-500/30 bg-blue-500/10"
    }
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {messages.map((message) => (
        <Card key={message.id} className={`${getStyles(message.type)} border backdrop-blur-sm`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {getIcon(message.type)}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{message.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{message.message}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDismiss(message.id)}
                className="h-6 w-6 p-0 hover:bg-background/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Hook for managing feedback messages
export function useFeedback() {
  const [messages, setMessages] = useState<FeedbackMessage[]>([])

  const addMessage = (message: Omit<FeedbackMessage, "id">) => {
    const id = Date.now().toString()
    setMessages((prev) => [...prev, { ...message, id }])
  }

  const dismissMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id))
  }

  const clearAll = () => {
    setMessages([])
  }

  return {
    messages,
    addMessage,
    dismissMessage,
    clearAll,
    showSuccess: (title: string, message: string, duration = 5000) =>
      addMessage({ type: "success", title, message, duration }),
    showError: (title: string, message: string, duration = 0) =>
      addMessage({ type: "error", title, message, duration }),
    showWarning: (title: string, message: string, duration = 7000) =>
      addMessage({ type: "warning", title, message, duration }),
    showInfo: (title: string, message: string, duration = 5000) =>
      addMessage({ type: "info", title, message, duration }),
  }
}
