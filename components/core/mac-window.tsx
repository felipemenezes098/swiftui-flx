import * as React from "react"

import { cn } from "@/lib/utils"

const trafficLights = ["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"]

function MacWindow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="mac-window"
      className={cn(
        "mx-auto flex w-full max-w-[30rem] flex-col overflow-hidden rounded-2xl bg-background shadow-xl ring-1 ring-black/10 dark:ring-white/15",
        className
      )}
      {...props}
    >
      <div
        data-slot="mac-window-title-bar"
        className="flex h-8 shrink-0 items-center gap-2 border-b px-3.5"
      >
        {trafficLights.map((color) => (
          <span
            key={color}
            className={cn("size-3 rounded-full ring-1 ring-black/10", color)}
          />
        ))}
      </div>
      <div data-slot="mac-window-content" className="relative aspect-[8/5]">
        {children}
      </div>
    </div>
  )
}

export { MacWindow }
