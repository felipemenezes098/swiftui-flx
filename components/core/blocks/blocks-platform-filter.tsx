"use client"

import { useConfig } from "@/hooks/use-config"
import { useHydrated } from "@/hooks/use-hydrated"
import { blocks } from "@/lib/blocks"
import { platforms } from "@/lib/docs"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BlocksPlatformFilter() {
  const [config, setConfig] = useConfig()
  const hydrated = useHydrated()

  return (
    <div className="flex items-center gap-1.5">
      {platforms.map((platform) => {
        const active = hydrated && config.platform === platform.id
        return (
          <button
            key={platform.id}
            type="button"
            aria-pressed={active}
            onClick={() => setConfig({ ...config, platform: platform.id })}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "h-7 px-2 text-xs transition-none",
              !active &&
                "border-border/50 text-muted-foreground/80 hover:text-foreground"
            )}
          >
            <span>{platform.name}</span>
            <span
              className={cn(
                "text-muted-foreground/50 tabular-nums",
                active && "text-muted-foreground"
              )}
            >
              {blocks.length}
            </span>
          </button>
        )
      })}
    </div>
  )
}
