import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const weekdays = ["S", "M", "T", "W", "T", "F", "S"]
const offset = 3
const days = Array.from({ length: 30 }, (_, index) => index + 1)
const selected: number = 14
const today: number = 9
const events = [5, 14, 21]

export function CalendarMock() {
  return (
    <div className="flex w-full max-w-[15rem] flex-col gap-2 rounded-[var(--radius)] border border-border bg-card p-3 shadow-sm">
      <div className="flex items-center justify-between px-1">
        <p className="text-[12px] font-semibold text-foreground">
          October 2026
        </p>
        <div className="flex gap-2 text-primary">
          <ChevronLeft className="size-3.5" />
          <ChevronRight className="size-3.5" />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-0.5 text-center">
        {weekdays.map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="text-[8px] font-medium text-muted-foreground"
          >
            {day}
          </span>
        ))}
        {Array.from({ length: offset }, (_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {days.map((day) => (
          <span key={day} className="flex flex-col items-center">
            <span
              className={cn(
                "flex size-[22px] items-center justify-center rounded-full text-[10px] tabular-nums",
                day === selected &&
                  "bg-primary font-semibold text-primary-foreground",
                day === today &&
                  day !== selected &&
                  "font-semibold text-primary",
                day !== selected && day !== today && "text-foreground"
              )}
            >
              {day}
            </span>
            <span
              className={cn(
                "size-[3px] rounded-full",
                events.includes(day) && "bg-muted-foreground/60",
                !events.includes(day) && "bg-transparent"
              )}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
