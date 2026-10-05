"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { spring } from "../shared/spring"

export function Segmented<T extends string>({
  options,
  value,
  onValueChange,
}: {
  options: readonly T[]
  value: T
  onValueChange: (value: T) => void
}) {
  const index = options.indexOf(value)

  return (
    <div
      className="relative grid rounded-[calc(var(--radius)-2px)] bg-muted p-0.5"
      style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
    >
      <motion.span
        aria-hidden
        animate={{ x: `${index * 100}%` }}
        transition={spring}
        className="absolute inset-y-0.5 left-0.5 rounded-[calc(var(--radius)-4px)] bg-card shadow-sm"
        style={{ width: `calc((100% - 4px) / ${options.length})` }}
      />
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onValueChange(option)}
          className={cn(
            "relative h-8 text-[12px] font-medium",
            option === value && "text-foreground",
            option !== value && "text-muted-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
