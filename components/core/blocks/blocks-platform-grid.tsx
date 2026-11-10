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

  return <div className="flex flex-col gap-10 md:gap-12">{children}</div>
}
