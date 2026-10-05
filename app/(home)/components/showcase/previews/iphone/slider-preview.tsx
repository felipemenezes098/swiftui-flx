"use client"

import * as React from "react"

import { Minus, Plus } from "lucide-react"

import {
  thermostatModes,
  thermostatRange,
  type ThermostatMode,
} from "../shared/thermostat"
import { Screen } from "./screen"
import { Segmented } from "./segmented"
import { ThermostatDial } from "./thermostat-dial"

const MIN = thermostatRange.min
const MAX = thermostatRange.max

export function SliderPreview() {
  const [value, setValue] = React.useState(21.5)
  const [mode, setMode] = React.useState<ThermostatMode>("Heat")

  const t = (value - MIN) / (MAX - MIN)
  const step = (delta: number) =>
    setValue((current) => Math.min(MAX, Math.max(MIN, current + delta)))

  return (
    <Screen eyebrow="Home" title="Living Room">
      <ThermostatDial value={value} mode={mode} className="mx-auto -mt-1" />

      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          aria-label="Decrease"
          onClick={() => step(-0.5)}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-foreground ring-1 ring-border ring-inset"
        >
          <Minus className="size-3.5" />
        </button>
        <div className="relative flex h-7 flex-1 items-center">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${t * 100}%` }}
            />
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute size-6 -translate-x-1/2 rounded-full bg-white shadow-md ring-1 ring-black/5"
            style={{ left: `calc(12px + (100% - 24px) * ${t})` }}
          />
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={0.5}
            value={value}
            aria-label="Temperature"
            onChange={(event) => setValue(Number(event.target.value))}
            className="absolute inset-0 cursor-grab opacity-0 active:cursor-grabbing"
          />
        </div>
        <button
          type="button"
          aria-label="Increase"
          onClick={() => step(0.5)}
          className="flex size-8 shrink-0 items-center justify-center rounded-full text-foreground ring-1 ring-border ring-inset"
        >
          <Plus className="size-3.5" />
        </button>
      </div>

      <div className="mt-5">
        <Segmented
          options={thermostatModes}
          value={mode}
          onValueChange={setMode}
        />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-2">
        {[
          ["Humidity", "42%"],
          ["Fan", "Auto"],
        ].map(([label, stat]) => (
          <div
            key={label}
            className="rounded-[calc(var(--radius)+2px)] bg-muted px-3 py-2.5"
          >
            <p className="text-[11px] text-muted-foreground">{label}</p>
            <p className="text-[15px] font-semibold text-foreground">{stat}</p>
          </div>
        ))}
      </div>
    </Screen>
  )
}
