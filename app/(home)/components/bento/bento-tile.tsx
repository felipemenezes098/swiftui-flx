import { ArrowUpRight } from "lucide-react"

import { FlxThemeScope } from "@/components/core/flx-theme-scope"
import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { cn } from "@/lib/utils"

interface BentoTileProps {
  label: string
  href: string
  className?: string
  children: React.ReactNode
}

export function BentoTile({
  label,
  href,
  className,
  children,
}: Readonly<BentoTileProps>) {
  return (
    <HoverPrefetchLink
      href={href}
      aria-label={label}
      className={cn(
        "group/tile relative flex flex-col overflow-hidden rounded-2xl border border-border/60 outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/30",
        className
      )}
    >
      <FlxThemeScope
        theme="default"
        className="relative flex min-h-0 flex-1 items-center justify-center p-6"
      >
        <div className="flex w-full justify-center">{children}</div>
      </FlxThemeScope>
      <span className="px-5 pb-4 text-xs text-muted-foreground transition-colors duration-150 group-hover/tile:text-foreground">
        {label}
      </span>
      <span
        aria-hidden
        className={cn(
          "absolute top-4 right-4 flex size-7 items-center justify-center rounded-full border border-border/60 bg-background text-foreground",
          "opacity-0 transition-opacity duration-150 ease-out motion-reduce:transition-none",
          "group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100 pointer-coarse:opacity-100"
        )}
      >
        <ArrowUpRight className="size-3.5" />
      </span>
    </HoverPrefetchLink>
  )
}
