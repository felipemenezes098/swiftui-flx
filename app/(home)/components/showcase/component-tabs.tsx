"use client"

import * as React from "react"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

const ease = [0.32, 0.72, 0, 1] as const

export function ComponentTabs({
  items,
  value,
  onValueChange,
  onComplete,
  paused,
  autoplay,
}: {
  items: readonly { id: string; name: string }[]
  value: string
  onValueChange: (value: string) => void
  onComplete: () => void
  paused: boolean
  autoplay: boolean
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const container = containerRef.current
    const active = container?.querySelector<HTMLElement>("[aria-pressed=true]")
    if (!container || !active) return
    if (container.scrollWidth <= container.clientWidth) return
    container.scrollTo({
      left:
        active.offsetLeft - (container.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    })
  }, [value])

  return (
    <div
      ref={containerRef}
      className="relative -mx-5 no-scrollbar overflow-x-auto overflow-y-hidden mask-x-from-90% md:mx-0 md:overflow-visible md:mask-none"
    >
      <div className="flex w-max items-center gap-6 px-5 md:px-0">
        {items.map((item) => {
          const active = item.id === value
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onValueChange(item.id)}
              aria-pressed={active}
              className="group relative shrink-0 py-1.5 whitespace-nowrap"
            >
              {active && (
                <motion.span
                  layoutId="showcase-tab-marker"
                  transition={{ duration: 0.3, ease }}
                  className="absolute bottom-0 left-0 h-px w-full overflow-hidden bg-foreground/15"
                >
                  <span
                    key={value}
                    onAnimationEnd={onComplete}
                    className={cn(
                      "absolute inset-0 origin-left bg-foreground",
                      paused && "[animation-play-state:paused]",
                      autoplay && "animate-[hero-progress-x_5.5s_linear]"
                    )}
                  />
                </motion.span>
              )}
              <span
                className={cn(
                  "text-sm tracking-tight transition-colors",
                  active && "text-foreground",
                  !active &&
                    "text-muted-foreground/70 group-hover:text-foreground"
                )}
              >
                {item.name}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
