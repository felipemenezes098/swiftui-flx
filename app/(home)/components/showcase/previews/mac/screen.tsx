import * as React from "react"

import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type MacSidebarSection = {
  title?: string
  items: readonly { icon: LucideIcon; name: string; tint?: string }[]
}

export function MacScreen({
  sidebar,
  selected,
  title,
  subtitle,
  toolbar,
  className,
  children,
}: {
  sidebar: readonly MacSidebarSection[]
  selected: string
  title: string
  subtitle?: string
  toolbar?: React.ReactNode
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className="flex h-full text-[13px] text-foreground">
      <aside className="m-2 mr-0 flex w-[176px] shrink-0 flex-col gap-3 rounded-[12px] bg-foreground/[0.035] px-2 pt-11 ring-1 ring-border/70 dark:bg-foreground/[0.06]">
        {sidebar.map((section, index) => (
          <div key={section.title ?? index} className="flex flex-col gap-px">
            {section.title && (
              <p className="px-2 pb-1 text-[11px] font-semibold text-muted-foreground">
                {section.title}
              </p>
            )}
            {section.items.map((item) => (
              <div
                key={item.name}
                className={cn(
                  "flex h-7 items-center gap-2 rounded-[6px] px-2",
                  item.name === selected && "bg-foreground/[0.08]"
                )}
              >
                {item.tint && (
                  <span
                    className="flex size-5 items-center justify-center rounded-[5px] text-white"
                    style={{ backgroundColor: item.tint }}
                  >
                    <item.icon className="size-3" strokeWidth={2.25} />
                  </span>
                )}
                {!item.tint && (
                  <item.icon className="size-[15px] text-primary" />
                )}
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-[52px] shrink-0 items-center justify-between gap-3 px-5">
          <div className="min-w-0">
            <p className="truncate text-[15px] leading-tight font-semibold">
              {title}
            </p>
            {subtitle && (
              <p className="truncate text-[11px] text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          {toolbar}
        </div>
        <div
          className={cn("flex min-h-0 flex-1 flex-col px-5 pb-5", className)}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
