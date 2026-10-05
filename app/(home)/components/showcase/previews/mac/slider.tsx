"use client"

import { cn } from "@/lib/utils"

export function MacSlider({
  label,
  value,
  min,
  max,
  step,
  marks,
  onValueChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  marks?: readonly string[]
  onValueChange: (value: number) => void
}) {
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className="relative flex h-5 flex-1 items-center">
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onValueChange(Number(event.target.value))}
        style={{
          backgroundImage: `linear-gradient(to right, var(--primary) ${percent}%, transparent ${percent}%)`,
        }}
        className={cn(
          "relative z-10 h-1 w-full cursor-pointer appearance-none rounded-full bg-foreground/15 outline-none",
          "[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgb(0_0_0/0.3),0_0_0_0.5px_rgb(0_0_0/0.12)]",
          "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:shadow-[0_1px_3px_rgb(0_0_0/0.3),0_0_0_0.5px_rgb(0_0_0/0.12)]"
        )}
      />
      {marks && (
        <div className="pointer-events-none absolute inset-x-2 top-[15px] flex justify-between">
          {marks.map((mark) => (
            <span key={mark} className="flex w-0 flex-col items-center gap-1">
              <span className="h-1 w-px bg-foreground/30" />
              <span className="text-[10px] text-muted-foreground tabular-nums">
                {mark}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
