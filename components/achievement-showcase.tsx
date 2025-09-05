"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/contexts/gamification-context"
import { Trophy, Star, Lock } from "lucide-react"

export function AchievementShowcase() {
  const { profile } = useGamification()

  const featuredAchievements = profile.achievements.slice(0, 4)

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Achievement Showcase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {featuredAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              achievement.unlocked ? "bg-primary/10 border-primary/30" : "bg-background/50 border-primary/10 opacity-60"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                  achievement.unlocked ? "bg-primary/20" : "bg-muted/20"
                }`}
              >
                {achievement.unlocked ? achievement.icon : <Lock className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">{achievement.name}</h4>
                  {achievement.unlocked && (
                    <Badge className="bg-green-500 text-white text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Unlocked
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>

            {!achievement.unlocked && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary">
                    {achievement.progress} / {achievement.maxProgress}
                  </span>
                </div>
                <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1.5" />
              </div>
            )}

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/10">
              <Badge variant="outline" className="text-xs">
                {achievement.category}
              </Badge>
              <span className="text-xs text-secondary font-medium">{achievement.reward}</span>
            </div>
          </div>
        ))}

        <div className="text-center pt-4 border-t border-primary/20">
          <p className="text-sm text-muted-foreground">
            {profile.achievements.filter((a) => a.unlocked).length} of {profile.achievements.length} achievements
            unlocked
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
