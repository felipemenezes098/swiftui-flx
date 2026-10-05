import * as React from "react"

import { cn } from "@/lib/utils"

export function Screen({
  eyebrow,
  title,
  accessory,
  className,
  children,
}: {
  eyebrow: string
  title: string
  accessory?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex h-full flex-col px-4 pt-3 pb-8", className)}>
      <div className="mb-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <p className="text-[26px] leading-tight font-bold tracking-tight text-foreground">
            {title}
          </p>
        </div>
        {accessory}
      </div>
      {children}
    </div>
  )
}
