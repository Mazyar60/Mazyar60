"use client"

import type React from "react"

import { useState } from "react"
import { ExternalLink, TrendingUp, Gamepad2, Factory, Pickaxe, Users, Crown, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Platform {
  id: string
  name: string
  description: string
  url: string
  icon: React.ReactNode
  category: string
  features: string[]
  status: "active" | "coming-soon"
}

const platforms: Platform[] = [
  {
    id: "ranking-game",
    name: "Ranking Game",
    description:
      "Revolutionary gaming platform with player rankings and competitive gameplay. Track your progress and compete with players worldwide.",
    url: "https://ranking.game",
    icon: <Gamepad2 className="w-8 h-8 text-purple-400" />,
    category: "Gaming",
    features: ["Player Rankings", "Competitive Gaming", "Leaderboards", "Achievements"],
    status: "active",
  },
  {
    id: "rz-blockchain",
    name: "RZ Blockchain",
    description:
      "Explore the RZ blockchain network with comprehensive transaction tracking, block explorer, and network statistics.",
    url: "https://explorer.rz.game",
    icon: <Search className="w-8 h-8 text-cyan-400" />,
    category: "Blockchain",
    features: ["Block Explorer", "Transaction Tracking", "Network Stats", "Address Lookup"],
    status: "active",
  },
  {
    id: "coin-factory",
    name: "Coin Factory",
    description:
      "Revolutionary tokenization platform powering the next generation of digital experiences. Launch your own token or integrate our infrastructure.",
    url: "https://coinfactory.com",
    icon: <Factory className="w-8 h-8 text-blue-400" />,
    category: "DeFi",
    features: ["Token Creation", "Market Analytics", "Real-time Data", "Infrastructure"],
    status: "active",
  },
  {
    id: "rz-dex",
    name: "RZ DEX",
    description:
      "Decentralized exchange for seamless token swapping and liquidity provision. Trade RZ ecosystem tokens with minimal fees.",
    url: "https://dex.rz.game",
    icon: <TrendingUp className="w-8 h-8 text-green-400" />,
    category: "DeFi",
    features: ["Token Swapping", "Liquidity Pools", "Low Fees", "AMM Protocol"],
    status: "active",
  },
  {
    id: "rz-prime",
    name: "RZ Prime",
    description:
      "The world's first pre-sale platform where losing is impossible. Zero-risk crypto investment with guaranteed returns.",
    url: "https://rzprime.com",
    icon: <Crown className="w-8 h-8 text-yellow-400" />,
    category: "Investment",
    features: ["Zero Risk", "Pre-sale Platform", "Guaranteed Returns", "Web3 Friendly"],
    status: "active",
  },
  {
    id: "coin-mining",
    name: "RZ Mining",
    description:
      "Mine RZ ecosystem tokens through innovative proof-of-stake mechanisms. Earn rewards while securing the network.",
    url: "https://coinmaining.game",
    icon: <Pickaxe className="w-8 h-8 text-orange-400" />,
    category: "Mining",
    features: ["Token Mining", "Staking Rewards", "Network Security", "Passive Income"],
    status: "active",
  },
  {
    id: "rz-rank",
    name: "RZRank",
    description:
      "Ranking platform connecting the RZ community. Track rankings, compare performance, and compete with fellow investors.",
    url: "https://coinranking.game",
    icon: <Users className="w-8 h-8 text-pink-400" />,
    category: "Social",
    features: ["Community Rankings", "Performance Tracking", "Leaderboards", "User Profiles"],
    status: "active",
  },
  {
    id: "rz-neobank",
    name: "RZ NEOBANK",
    description:
      "Next-generation digital banking platform for the RZ ecosystem. Bridge assets, manage finances, and access DeFi services seamlessly.",
    url: "https://rzbank.game",
    icon: <Crown className="w-8 h-8 text-cyan-400" />,
    category: "Banking",
    features: ["Asset Bridging", "DeFi Integration", "Secure Wallet", "Cross-chain Support"],
    status: "active",
  },
]

export default function PlatformsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(platforms.map((p) => p.category)))]

  const filteredPlatforms =
    selectedCategory === "all" ? platforms : platforms.filter((p) => p.category === selectedCategory)

  const handlePlatformClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tokens
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <img
                  src="https://i.postimg.cc/dZGYw59D/logo.png"
                  alt="RZ Oasis Logo"
                  className="w-10 h-10 rounded-full"
                />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  RZ Platforms
                </h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            RZ Ecosystem Platforms
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover the complete RZ ecosystem with innovative platforms for gaming, DeFi, mining, and social
            interaction.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-gray-600 hover:bg-gray-800 bg-transparent"
              }
            >
              {category === "all" ? "All Platforms" : category}
            </Button>
          ))}
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((platform) => (
            <Card
              key={platform.id}
              className="bg-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group hover:scale-105"
              onClick={() => handlePlatformClick(platform.url)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {platform.icon}
                    <div>
                      <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                        {platform.name}
                      </CardTitle>
                      <Badge variant="outline" className="mt-1 border-gray-600 text-gray-400">
                        {platform.category}
                      </Badge>
                    </div>
                  </div>
                  <img
                    src="https://i.postimg.cc/dZGYw59D/logo.png"
                    alt="RZ Logo"
                    className="w-6 h-6 rounded-full group-hover:scale-110 transition-transform"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 mb-4 line-clamp-3">{platform.description}</CardDescription>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {platform.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-gray-800 text-gray-300 border-gray-600"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge
                      variant={platform.status === "active" ? "default" : "secondary"}
                      className={platform.status === "active" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"}
                    >
                      {platform.status === "active" ? "Live" : "Coming Soon"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePlatformClick(platform.url)
                      }}
                    >
                      Visit Platform
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{platforms.length}</div>
              <div className="text-gray-300">Active Platforms</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{categories.length - 1}</div>
              <div className="text-gray-300">Categories</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500/50">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Availability</div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
