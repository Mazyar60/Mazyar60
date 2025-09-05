"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/contexts/gamification-context"
import { Trophy, Star, Zap } from "lucide-react"

export function UserProfileCard() {
  const { profile } = useGamification()

  const getRankColor = (rank: number) => {
    if (rank <= 100) return "text-yellow-400"
    if (rank <= 500) return "text-gray-300"
    if (rank <= 1000) return "text-orange-400"
    return "text-blue-400"
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Level {profile.level}</h3>
              <p className="text-sm text-muted-foreground">{profile.title}</p>
            </div>
          </div>
          <Badge variant="outline" className={`${getRankColor(profile.rank)} border-current`}>
            #{profile.rank}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">XP Progress</span>
            <span className="text-primary font-medium">
              {profile.xp.toLocaleString()} / {(profile.xp + profile.xpToNext).toLocaleString()}
            </span>
          </div>
          <Progress value={(profile.xp / (profile.xp + profile.xpToNext)) * 100} className="h-2" />
          <p className="text-xs text-muted-foreground">{profile.xpToNext} XP to next level</p>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/20">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="text-muted-foreground">Total XP:</span>
            <span className="font-medium text-foreground">{profile.totalXp.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Achievements:</span>
            <span className="font-medium text-foreground">
              {profile.achievements.filter((a) => a.unlocked).length}/{profile.achievements.length}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
