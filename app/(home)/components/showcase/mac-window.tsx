import * as React from "react"

import { cn } from "@/lib/utils"

const trafficLights = ["bg-[#ff5f57]", "bg-[#febc2e]", "bg-[#28c840]"]

export function MacWindow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="showcase-mac-window"
      className={cn(
        "relative overflow-hidden rounded-[20px] bg-background shadow-2xl ring-1 ring-black/10 dark:ring-white/15",
        className
      )}
      {...props}
    >
      {children}
      <div className="absolute top-[18px] left-[18px] z-30 flex gap-2">
        {trafficLights.map((color) => (
          <span
            key={color}
            className={cn("size-3 rounded-full ring-1 ring-black/10", color)}
          />
        ))}
      </div>
    </div>
  )
}
