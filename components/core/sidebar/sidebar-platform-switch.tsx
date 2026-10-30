"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHydrated } from "@/hooks/use-hydrated"
import { usePlatform } from "@/hooks/use-platform"
import { useSelectPlatform } from "@/hooks/use-select-platform"
import { platforms } from "@/lib/docs"

import { SidebarSection } from "./sidebar-section"

export function SidebarPlatformSwitch() {
  const hydrated = useHydrated()
  const platform = usePlatform()
  const select = useSelectPlatform()

  return (
    <SidebarSection label="Platform">
      <Tabs
        key={String(hydrated)}
        value={platform}
        onValueChange={(value) => select(String(value))}
      >
        <TabsList className="h-7! w-fit gap-0.5 rounded-full bg-muted/50 p-0.5">
          {platforms.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className="flex-none cursor-pointer rounded-full px-3 text-xs font-normal text-muted-foreground data-active:border-border/60 data-active:text-foreground group-data-[variant=default]/tabs-list:data-active:shadow-[0_1px_2px_0_rgb(0_0_0/0.06)] dark:data-active:border-border/60 dark:data-active:bg-white/[0.06]"
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </SidebarSection>
  )
}
