"use client"

import * as React from "react"

import { Tabs } from "@/components/ui/tabs"
import { useConfig } from "@/hooks/use-config"
import { useHydrated } from "@/hooks/use-hydrated"

export function CodeTabs({
  children,
  className,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  const [config, setConfig] = useConfig()
  const hydrated = useHydrated()

  return (
    <Tabs
      key={String(hydrated)}
      value={config.installationType}
      onValueChange={(value) =>
        setConfig({ ...config, installationType: value as "cli" | "manual" })
      }
      className={className}
      {...props}
    >
      {children}
    </Tabs>
  )
}
