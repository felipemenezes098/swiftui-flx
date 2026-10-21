import * as React from "react"

import { ArrowRight } from "lucide-react"

import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { FlxThemeScope } from "@/components/core/flx-theme-scope"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ShowcaseCard({
  title,
  detail,
  href,
  theme,
  className,
  children,
}: {
  title: string
  detail: string
  href: string
  theme: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-4", className)}>
      <FlxThemeScope
        theme={theme}
        className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-muted/50 px-6 py-10 ring-1 ring-border/60 lg:h-[35rem] lg:px-10"
      >
        <div className="relative flex w-full justify-center">{children}</div>
      </FlxThemeScope>

      <div className="flex items-center justify-between gap-4 px-1">
        <p className="text-sm">
          <span className="font-medium">{title}</span>
          <span className="text-muted-foreground"> · {detail}</span>
        </p>
        <HoverPrefetchLink
          href={href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "gap-1.5 text-muted-foreground hover:text-foreground"
          )}
        >
          Browse components
          <ArrowRight className="size-3.5" />
        </HoverPrefetchLink>
      </div>
    </div>
  )
}
