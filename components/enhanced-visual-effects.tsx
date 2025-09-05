"use client"

import { useEffect, useState } from "react"

interface FloatingParticle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

export function EnhancedVisualEffects() {
  const [particles, setParticles] = useState<FloatingParticle[]>([])

  useEffect(() => {
    const createParticles = () => {
      const newParticles: FloatingParticle[] = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 2,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
      setParticles(newParticles)
    }

    createParticles()

    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y - particle.speed,
          x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
          y: particle.y < -10 ? window.innerHeight + 10 : particle.y - particle.speed,
        })),
      )
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400 to-orange-400"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  )
}
