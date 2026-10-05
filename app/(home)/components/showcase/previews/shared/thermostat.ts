export const thermostatModes = ["Heat", "Cool", "Auto"] as const

export type ThermostatMode = (typeof thermostatModes)[number]

export const thermostatRange = { min: 16, max: 28 } as const

export const thermostatModeCopy: Record<ThermostatMode, string> = {
  Heat: "Heating to",
  Cool: "Cooling to",
  Auto: "Holding at",
}
