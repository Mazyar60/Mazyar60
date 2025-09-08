"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SocialLink {
  platform: string
  url: string
  icon: string
  color: string
}

interface Project {
  name: string
  category: string
  description: string
  socialLinks: SocialLink[]
}

const projects: Project[] = [
  {
    name: "RZ Coin",
    category: "Core Token",
    description: "The main utility token of the RZ ecosystem",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/RZ_coin", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/rzcoin_rz", icon: "📱", color: "hover:bg-blue-500" },
      { platform: "Instagram", url: "https://www.instagram.com/rzcoin.rz/", icon: "📷", color: "hover:bg-pink-500" },
    ],
  },
  {
    name: "MetaGamesCoin (MGC)",
    category: "Gaming",
    description: "Gaming-focused token for the metaverse ecosystem",
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com/MetaGamesC", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/MetaGamesCoin_io", icon: "📱", color: "hover:bg-blue-500" },
      { platform: "Instagram", url: "https://instagram.com/metagamescoin_io", icon: "📷", color: "hover:bg-pink-500" },
    ],
  },
  {
    name: "Car Token",
    category: "Automotive",
    description: "Automotive industry blockchain solution",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/Carcoin_1", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/Carcoin_1", icon: "📱", color: "hover:bg-blue-500" },
      { platform: "Instagram", url: "https://www.instagram.com/carcoin_1/", icon: "📷", color: "hover:bg-pink-500" },
    ],
  },
  {
    name: "Jewelry Token",
    category: "Luxury",
    description: "Luxury jewelry and precious metals tokenization",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/Jewelry_token", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/Jewelry_token/", icon: "📱", color: "hover:bg-blue-500" },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/Jewelry_token/",
        icon: "📷",
        color: "hover:bg-pink-500",
      },
    ],
  },
  {
    name: "Insurance Token",
    category: "Finance",
    description: "Decentralized insurance solutions",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/insurance0game", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/insurance0game", icon: "📱", color: "hover:bg-blue-500" },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/insurance.game/",
        icon: "📷",
        color: "hover:bg-pink-500",
      },
    ],
  },
  {
    name: "Industrial Token",
    category: "Industry",
    description: "Industrial automation and IoT solutions",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/TokenIndustrial", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/IndustrialToken", icon: "📱", color: "hover:bg-blue-500" },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/TokenIndustrial/",
        icon: "📷",
        color: "hover:bg-pink-500",
      },
    ],
  },
  {
    name: "Real Estate Token",
    category: "Real Estate",
    description: "Real estate tokenization and investment platform",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/RealEstate_2ken", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/realestate_token/", icon: "📱", color: "hover:bg-blue-500" },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/realestate_token/",
        icon: "📷",
        color: "hover:bg-pink-500",
      },
    ],
  },
  {
    name: "Trip Token",
    category: "Travel",
    description: "Travel and tourism blockchain ecosystem",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/Trip_Token1", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/Trip_Token", icon: "📱", color: "hover:bg-blue-500" },
      { platform: "Instagram", url: "https://www.instagram.com/trip_token1/", icon: "📷", color: "hover:bg-pink-500" },
    ],
  },
  {
    name: "OMG (Oil Meta Games)",
    category: "Gaming",
    description: "Oil and energy sector gaming platform",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/OilMetaGames", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/oilmetagames", icon: "📱", color: "hover:bg-blue-500" },
      { platform: "Instagram", url: "https://www.instagram.com/oilmetagames/", icon: "📷", color: "hover:bg-pink-500" },
    ],
  },
  {
    name: "Ranking Game",
    category: "Platform",
    description: "Gaming ranking and leaderboard platform",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/RankingdotGame", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/rankingdotgame", icon: "📱", color: "hover:bg-blue-500" },
      { platform: "Instagram", url: "https://www.instagram.com/ranking.game/", icon: "📷", color: "hover:bg-pink-500" },
    ],
  },
  {
    name: "RZ Chain",
    category: "Infrastructure",
    description: "RZ blockchain explorer and infrastructure",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/RZ_chain", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/rzchain", icon: "📱", color: "hover:bg-blue-500" },
      { platform: "Instagram", url: "https://www.instagram.com/rzchain/", icon: "📷", color: "hover:bg-pink-500" },
    ],
  },
  {
    name: "CZW Token",
    category: "Environmental",
    description: "Carbon zero world environmental token",
    socialLinks: [
      { platform: "Twitter", url: "https://x.com/CzwToken", icon: "𝕏", color: "hover:bg-gray-800" },
      { platform: "Telegram", url: "https://t.me/czwtoken/", icon: "📱", color: "hover:bg-blue-500" },
      { platform: "Instagram", url: "https://www.instagram.com/czwtoken/", icon: "📷", color: "hover:bg-pink-500" },
    ],
  },
]

export default function CommunityPage() {
  const [followedProjects, setFollowedProjects] = useState<Set<string>>(new Set())

  const toggleFollow = (projectName: string) => {
    const newFollowed = new Set(followedProjects)
    if (newFollowed.has(projectName)) {
      newFollowed.delete(projectName)
    } else {
      newFollowed.add(projectName)
    }
    setFollowedProjects(newFollowed)
  }

  const categories = [...new Set(projects.map((p) => p.category))]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Tokens
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  RZ Community
                </h1>
                <p className="text-gray-400 text-sm">Connect with all RZ ecosystem projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Follow Your Favorite Projects</h2>
          <p className="text-gray-400">
            Stay connected with the RZ ecosystem. Follow projects on social media to get the latest updates.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.name} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-white">{project.name}</CardTitle>
                    <span className="text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-full mt-1 inline-block">
                      {project.category}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFollow(project.name)}
                    className={`${
                      followedProjects.has(project.name)
                        ? "text-green-400 hover:text-green-300"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    <Check className={`w-4 h-4 ${followedProjects.has(project.name) ? "opacity-100" : "opacity-50"}`} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>

                <div className="space-y-2">
                  {project.socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700 transition-all duration-200 ${social.color} hover:border-gray-600 group`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{social.icon}</span>
                        <span className="text-sm font-medium">{social.platform}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-gray-900/50 border border-gray-800 rounded-xl px-8 py-4">
            <div>
              <div className="text-2xl font-bold text-purple-400">{projects.length}</div>
              <div className="text-sm text-gray-400">Projects</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{categories.length}</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
            <div className="w-px h-8 bg-gray-700"></div>
            <div>
              <div className="text-2xl font-bold text-green-400">{followedProjects.size}</div>
              <div className="text-sm text-gray-400">Following</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
