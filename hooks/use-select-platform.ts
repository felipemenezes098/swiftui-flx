"use client"

import { usePathname, useRouter } from "next/navigation"

import { useConfig } from "@/hooks/use-config"
import { counterpartHref, isPlatform } from "@/lib/docs"

export function useSelectPlatform() {
  const pathname = usePathname()
  const router = useRouter()
  const [config, setConfig] = useConfig()

  return (value: string) => {
    if (!isPlatform(value)) return

    setConfig({ ...config, platform: value })
    const href = counterpartHref(pathname, value)
    if (href) router.push(href)
  }
}
