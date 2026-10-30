"use client"

import { useConfig } from "@/hooks/use-config"
import type { Platform } from "@/lib/docs"

interface BlocksPlatformGridProps {
  platform: Platform
  children: React.ReactNode
}

export function BlocksPlatformGrid({
  platform,
  children,
}: Readonly<BlocksPlatformGridProps>) {
  const [config] = useConfig()
  if (config.platform !== platform) return null

  return <div className="grid gap-6 md:grid-cols-2">{children}</div>
}
