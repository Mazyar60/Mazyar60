"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useGamification } from "@/contexts/gamification-context"
import { Calendar, Clock, Gift } from "lucide-react"

export function DailyChallenges() {
  const { profile, completeDailyChallenge, addXP } = useGamification()

  const handleClaimReward = (challengeId: string) => {
    completeDailyChallenge(challengeId)
    addXP(100) // Base XP reward
  }

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date()
    const expires = new Date(expiresAt)
    const diff = expires.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Daily Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.dailyChallenges.map((challenge) => (
          <div key={challenge.id} className="p-4 rounded-lg bg-background/50 border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-foreground">{challenge.title}</h4>
                <p className="text-sm text-muted-foreground">{challenge.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {getTimeRemaining(challenge.expiresAt)}
                </Badge>
                {challenge.completed && <Badge className="bg-green-500 text-white text-xs">Completed</Badge>}
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-primary">
                  {challenge.progress.toFixed(1)} / {challenge.target}
                </span>
              </div>
              <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm">
                <Gift className="h-4 w-4 text-secondary" />
                <span className="text-muted-foreground">Reward:</span>
                <span className="font-medium text-secondary">{challenge.reward}</span>
              </div>
              <Button
                size="sm"
                disabled={!challenge.completed || challenge.progress < challenge.target}
                onClick={() => handleClaimReward(challenge.id)}
                className={challenge.completed ? "bg-green-500 hover:bg-green-600" : ""}
              >
                {challenge.completed ? "Claim" : challenge.progress >= challenge.target ? "Complete" : "In Progress"}
              </Button>
            </div>
          </div>
        ))}

        <div className="text-center pt-4 border-t border-primary/20">
          <p className="text-sm text-muted-foreground mb-2">New challenges reset in:</p>
          <Badge variant="outline" className="text-primary">
            <Clock className="h-3 w-3 mr-1" />
            {getTimeRemaining("2024-01-21T00:00:00Z")}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
