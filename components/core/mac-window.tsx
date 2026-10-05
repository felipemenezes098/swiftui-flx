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
        "relative mx-auto aspect-[8/5] w-full max-w-[30rem] overflow-hidden rounded-2xl bg-background shadow-xl ring-1 ring-black/10 dark:ring-white/15",
        className
      )}
      {...props}
    >
      {children}
      <div
        data-slot="mac-window-traffic-lights"
        className="absolute top-3.5 left-3.5 z-10 flex gap-2"
      >
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

export { MacWindow }
