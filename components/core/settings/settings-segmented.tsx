"use client"

import { cn } from "@/lib/utils"

interface SettingsSegmentedProps<T extends string> {
  label: string
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
}

function SettingsSegmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: Readonly<SettingsSegmentedProps<T>>) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="flex w-fit items-center gap-1 rounded-lg border p-0.5"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          onClick={() => onChange(option.value)}
          className={cn(
            "h-7 rounded-md px-2.5 text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
            option.value === value && "bg-muted text-foreground",
            option.value !== value &&
              "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export { SettingsSegmented }
