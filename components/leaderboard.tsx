"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  username: string
  level: number
  totalXp: number
  weeklyEarnings: number
  change: number
}

export function Leaderboard() {
  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, username: "CryptoKing", level: 45, totalXp: 125000, weeklyEarnings: 2.45, change: 0 },
    { rank: 2, username: "MiningMaster", level: 42, totalXp: 118000, weeklyEarnings: 2.31, change: 1 },
    { rank: 3, username: "HashHero", level: 40, totalXp: 112000, weeklyEarnings: 2.18, change: -1 },
    { rank: 4, username: "TokenTitan", level: 38, totalXp: 105000, weeklyEarnings: 2.05, change: 2 },
    { rank: 5, username: "DigitalDragon", level: 36, totalXp: 98000, weeklyEarnings: 1.92, change: -1 },
    { rank: 6, username: "BlockchainBoss", level: 35, totalXp: 94000, weeklyEarnings: 1.87, change: 0 },
    { rank: 7, username: "CoinCrusher", level: 33, totalXp: 89000, weeklyEarnings: 1.74, change: 3 },
    { rank: 8, username: "You", level: 12, totalXp: 12450, weeklyEarnings: 0.69, change: 15 },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-300" />
      case 3:
        return <Award className="h-5 w-5 text-orange-400" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-400"
    if (change < 0) return "text-red-400"
    return "text-muted-foreground"
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Global Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                entry.username === "You"
                  ? "bg-primary/10 border border-primary/30 shadow-lg"
                  : "bg-background/50 hover:bg-background/70"
              }`}
            >
              <div className="flex items-center justify-center w-8">{getRankIcon(entry.rank)}</div>

              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                  {entry.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className={`font-semibold ${entry.username === "You" ? "text-primary" : "text-foreground"}`}>
                    {entry.username}
                  </h4>
                  <Badge variant="outline" className="text-xs">
                    Lv.{entry.level}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{entry.totalXp.toLocaleString()} XP</span>
                  <span>{entry.weeklyEarnings.toFixed(2)} RZ/week</span>
                </div>
              </div>

              <div className="text-right">
                <div className={`text-sm font-medium ${getChangeColor(entry.change)}`}>
                  {entry.change > 0 && "+"}
                  {entry.change !== 0 && entry.change}
                  {entry.change === 0 && "—"}
                </div>
                <div className="text-xs text-muted-foreground">7d change</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
          <div className="text-center">
            <h4 className="font-semibold text-foreground mb-1">Season 1 Rewards</h4>
            <p className="text-sm text-muted-foreground mb-2">Top 100 players earn exclusive NFTs</p>
            <div className="flex justify-center gap-4 text-xs">
              <span className="text-yellow-400">🥇 Legendary NFT</span>
              <span className="text-gray-300">🥈 Epic NFT</span>
              <span className="text-orange-400">🥉 Rare NFT</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
