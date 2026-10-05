"use client"

import { usePathname } from "next/navigation"
import * as React from "react"

import { useConfig } from "@/hooks/use-config"
import { platformFromPathname } from "@/lib/docs"

export function DocsPlatformSync() {
  const pathname = usePathname()
  const [config, setConfig] = useConfig()
  const platform = platformFromPathname(pathname)

  const sync = React.useEffectEvent(() => {
    if (!platform || platform === config.platform) return
    setConfig({ ...config, platform })
  })

  React.useEffect(() => {
    sync()
  }, [platform])

  return null
}
