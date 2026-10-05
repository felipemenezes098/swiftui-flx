"use client"

import { usePathname } from "next/navigation"

import { useConfig } from "@/hooks/use-config"
import { platformFromPathname } from "@/lib/docs"

export function usePlatform() {
  const pathname = usePathname()
  const [config] = useConfig()

  return platformFromPathname(pathname) ?? config.platform
}
