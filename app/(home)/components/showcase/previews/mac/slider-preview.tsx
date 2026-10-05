"use client"

import * as React from "react"

import {
  BedDouble,
  CookingPot,
  Droplets,
  Fan,
  House,
  Monitor,
  Moon,
  Sofa,
  Thermometer,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { Swap } from "../shared/swap"
import {
  thermostatModeCopy,
  thermostatModes,
  thermostatRange,
  type ThermostatMode,
} from "../shared/thermostat"
import { macGroup } from "./button-styles"
import { MacScreen } from "./screen"
import { MacSegmented } from "./segmented"
import { MacSlider } from "./slider"

const sidebar = [
  { items: [{ icon: House, name: "Home" }] },
  {
    title: "Rooms",
    items: [
      { icon: Sofa, name: "Living Room" },
      { icon: CookingPot, name: "Kitchen" },
      { icon: BedDouble, name: "Bedroom" },
      { icon: Monitor, name: "Office" },
    ],
  },
] as const

const marks = ["16°", "19°", "22°", "25°", "28°"] as const

const details = [
  { icon: Droplets, label: "Humidity", value: "42%" },
  { icon: Fan, label: "Fan", value: "Auto" },
  { icon: Moon, label: "Schedule", value: "Eco at 11 PM" },
] as const

export function MacSliderPreview() {
  const [value, setValue] = React.useState(21.5)
  const [mode, setMode] = React.useState<ThermostatMode>("Heat")

  return (
    <MacScreen
      sidebar={sidebar}
      selected="Living Room"
      title="Living Room"
      subtitle="Thermostat · Inside 20.8°"
      className="gap-4"
    >
      <div className={cn(macGroup, "flex flex-col gap-5 p-4")}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Thermometer className="size-5" />
            </span>
            <div>
              <p className="text-[11px] text-muted-foreground">
                <Swap id={mode}>{thermostatModeCopy[mode]}</Swap>
              </p>
              <p className="text-[30px] leading-none font-light tracking-tight tabular-nums">
                {value.toFixed(1)}
                <span className="align-top text-[16px]">°</span>
              </p>
            </div>
          </div>
          <div className="w-[164px]">
            <MacSegmented
              options={thermostatModes}
              value={mode}
              onValueChange={setMode}
            />
          </div>
        </div>

        <div className="pb-4">
          <MacSlider
            label="Temperature"
            value={value}
            min={thermostatRange.min}
            max={thermostatRange.max}
            step={0.5}
            marks={marks}
            onValueChange={setValue}
          />
        </div>
      </div>

      <div className={cn(macGroup, "divide-y divide-border")}>
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex h-9 items-center gap-2.5 px-3"
          >
            <detail.icon className="size-3.5 text-muted-foreground" />
            <span className="flex-1">{detail.label}</span>
            <span className="text-muted-foreground">{detail.value}</span>
          </div>
        ))}
      </div>
    </MacScreen>
  )
}
