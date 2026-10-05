"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHydrated } from "@/hooks/use-hydrated"
import { usePlatform } from "@/hooks/use-platform"
import { useSelectPlatform } from "@/hooks/use-select-platform"
import { platforms } from "@/lib/docs"
import { cn } from "@/lib/utils"

interface DocsPlatformTabsProps {
  className?: string
}

export function DocsPlatformTabs({
  className,
}: Readonly<DocsPlatformTabsProps>) {
  const hydrated = useHydrated()
  const platform = usePlatform()
  const select = useSelectPlatform()

  return (
    <Tabs
      key={String(hydrated)}
      value={platform}
      onValueChange={(value) => select(String(value))}
      className={cn("w-full", className)}
    >
      <TabsList className="w-full">
        {platforms.map((item) => (
          <TabsTrigger key={item.id} value={item.id} className="text-xs">
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
