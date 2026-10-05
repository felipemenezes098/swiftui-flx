import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export function MacCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
        checked && "border-primary bg-primary text-primary-foreground",
        !checked && "border-input bg-card"
      )}
    >
      {checked && <Check strokeWidth={4} className="size-2.5" />}
    </span>
  )
}
