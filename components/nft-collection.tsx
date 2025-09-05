"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useGamification } from "@/contexts/gamification-context"
import { Gem, Lock, Star } from "lucide-react"

export function NFTCollection() {
  const { profile, claimNFTReward } = useGamification()

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "shadow-gray-500/20"
      case "rare":
        return "shadow-blue-500/20"
      case "epic":
        return "shadow-purple-500/20"
      case "legendary":
        return "shadow-yellow-500/20"
      default:
        return "shadow-gray-500/20"
    }
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gem className="h-5 w-5 text-primary" />
          NFT Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.nftCollection.map((nft) => (
            <div
              key={nft.id}
              className={`relative p-4 rounded-lg border-2 transition-all duration-300 ${
                nft.unlocked
                  ? `bg-gradient-to-br from-background/80 to-background/40 border-primary/30 shadow-lg ${getRarityGlow(
                      nft.rarity,
                    )}`
                  : "bg-background/20 border-muted/20 opacity-60"
              }`}
            >
              {!nft.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg">
                  <Lock className="h-8 w-8 text-muted-foreground" />
                </div>
              )}

              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg mb-3 flex items-center justify-center">
                <img
                  src={`/abstract-geometric-shapes.png?height=120&width=120&query=${nft.name} NFT ${nft.rarity}`}
                  alt={nft.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{nft.name}</h4>
                  <Badge className={`${getRarityColor(nft.rarity)} text-white text-xs`}>
                    <Star className="h-3 w-3 mr-1" />
                    {nft.rarity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{nft.description}</p>

                {nft.unlocked && (
                  <div className="pt-2">
                    <Button size="sm" variant="outline" className="w-full bg-transparent">
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-foreground">Collection Progress</h4>
              <p className="text-sm text-muted-foreground">
                {profile.nftCollection.filter((nft) => nft.unlocked).length} of {profile.nftCollection.length} unlocked
              </p>
            </div>
            <Badge variant="outline" className="text-primary">
              {Math.round(
                (profile.nftCollection.filter((nft) => nft.unlocked).length / profile.nftCollection.length) * 100,
              )}
              %
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
