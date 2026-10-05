"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { spring } from "../shared/spring"
import { Swap } from "../shared/swap"
import {
  thermostatModeCopy,
  thermostatRange,
  type ThermostatMode,
} from "../shared/thermostat"

const radius = 80
const arc = 2 * Math.PI * radius * 0.75

export function ThermostatDial({
  value,
  mode,
  className,
}: {
  value: number
  mode: ThermostatMode
  className?: string
}) {
  const t =
    (value - thermostatRange.min) / (thermostatRange.max - thermostatRange.min)

  return (
    <div className={cn("relative size-48", className)}>
      <svg viewBox="0 0 192 192" className="size-full rotate-[135deg]">
        <circle
          cx="96"
          cy="96"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${arc} 1000`}
          className="stroke-muted"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={radius}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          initial={false}
          animate={{ strokeDasharray: `${Math.max(arc * t, 0.01)} 1000` }}
          transition={spring}
          className="stroke-primary"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[11px] text-muted-foreground">
          <Swap id={mode}>{thermostatModeCopy[mode]}</Swap>
        </p>
        <p className="text-[44px] leading-none font-light tracking-tight text-foreground tabular-nums">
          {value.toFixed(1)}
          <span className="align-top text-[22px]">°</span>
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">Inside 20.8°</p>
      </div>
    </div>
  )
}
