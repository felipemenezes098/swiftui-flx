"use client"

import { cn } from "@/lib/utils"

export type ShowcaseTheme = "default" | "sienna"

const themes: { id: ShowcaseTheme; name: string; swatch: string }[] = [
  { id: "default", name: "Default", swatch: "bg-[#4e3d37] dark:bg-[#fcfcfc]" },
  { id: "sienna", name: "Sienna", swatch: "bg-[#cb4832]" },
]

export function ThemePicker({
  value,
  onValueChange,
}: {
  value: ShowcaseTheme
  onValueChange: (value: ShowcaseTheme) => void
}) {
  return (
    <div className="flex items-center gap-4">
      {themes.map((item) => {
        const active = item.id === value
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onValueChange(item.id)}
            aria-pressed={active}
            className={cn(
              "group flex items-center gap-2 text-sm transition-colors",
              active && "text-foreground",
              !active && "text-muted-foreground/70 hover:text-foreground"
            )}
          >
            <span
              className={cn(
                "size-2.5 rounded-full transition-[box-shadow,opacity] duration-300",
                item.swatch,
                active &&
                  "opacity-100 ring-2 ring-foreground/25 ring-offset-2 ring-offset-background",
                !active && "opacity-50 group-hover:opacity-80"
              )}
            />
            {item.name}
          </button>
        )
      })}
    </div>
  )
}
