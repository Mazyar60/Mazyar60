"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ExternalLink, CheckCircle, Lock, Twitter, MessageCircle, Youtube, Instagram } from "lucide-react"
import { Header } from "@/components/header"
import { useReferral } from "@/contexts/referral-context"
import { useAuth } from "@/contexts/auth-context"

const platformIcons = {
  twitter: Twitter,
  telegram: MessageCircle,
  discord: MessageCircle,
  youtube: Youtube,
  instagram: Instagram,
}

export default function ActivitiesPage() {
  const { socialTasks, completedTasks, monthlySocialBonus, completeSocialTask, isLoading } = useReferral()
  const { isAuthenticated } = useAuth()

  const handleCompleteTask = async (taskId: string, url: string) => {
    // Open the social media link
    window.open(url, "_blank")

    // Mark task as completed after a short delay
    setTimeout(async () => {
      await completeSocialTask(taskId)
    }, 2000)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-serif font-bold mb-4">Sign In Required</h1>
            <p className="text-muted-foreground">Please sign in to access social activities.</p>
          </div>
        </div>
      </div>
    )
  }

  const progressPercentage = socialTasks.length > 0 ? (completedTasks / socialTasks.length) * 100 : 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Social Activities</h1>
          <p className="text-muted-foreground">
            Complete social tasks to earn monthly yield bonuses. Tasks reset every month!
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-card/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Tasks Completed</span>
                  <span className="text-sm font-medium">
                    {completedTasks}/{socialTasks.length}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Monthly Bonus</p>
                <p className="text-2xl font-bold text-primary">+{(monthlySocialBonus * 100).toFixed(3)}%</p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Bonus Value</p>
                <p className="text-2xl font-bold text-green-400">${(monthlySocialBonus * 1000).toFixed(2)}/month</p>
                <p className="text-xs text-muted-foreground">Per $1000 invested</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Tasks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialTasks.map((task) => {
            const IconComponent = platformIcons[task.platform]
            const isCompleted = task.completed

            return (
              <Card
                key={task.id}
                className={`bg-card/80 backdrop-blur-sm transition-all duration-300 ${
                  isCompleted ? "border-green-500/30 bg-green-500/5" : "hover:border-primary/30"
                }`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isCompleted ? "bg-green-500/20" : "bg-primary/20"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <IconComponent className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{task.title}</CardTitle>
                        <p className="text-sm text-muted-foreground capitalize">{task.platform}</p>
                      </div>
                    </div>
                    <Badge
                      variant={isCompleted ? "default" : "secondary"}
                      className={
                        isCompleted
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                      }
                    >
                      {isCompleted ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{task.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Reward</p>
                      <p className="font-bold text-primary">+{(task.reward * 100).toFixed(3)}% monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Value</p>
                      <p className="font-bold text-green-400">${(task.reward * 1000).toFixed(2)}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant={isCompleted ? "secondary" : "default"}
                    onClick={() => handleCompleteTask(task.id, task.url)}
                    disabled={isCompleted || isLoading}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Complete Task
                      </>
                    )}
                  </Button>

                  {isCompleted && task.completedDate && (
                    <p className="text-xs text-muted-foreground text-center">
                      Completed on {new Date(task.completedDate).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Monthly Reset Notice */}
        <Card className="bg-card/80 backdrop-blur-sm mt-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Monthly Reset</h4>
                <p className="text-sm text-muted-foreground">
                  Social task bonuses are applied for the current month only. Tasks reset at the beginning of each
                  month, and you'll need to complete them again to maintain your bonus.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
