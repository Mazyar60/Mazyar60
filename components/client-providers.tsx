"use client"

import type React from "react"

import dynamic from "next/dynamic"
import { Suspense } from "react"

const DynamicProviders = dynamic(() => import("../app/providers").then((mod) => ({ default: mod.Providers })), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-black" />,
})

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <DynamicProviders>{children}</DynamicProviders>
    </Suspense>
  )
}
