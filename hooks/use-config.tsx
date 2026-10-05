"use client"

import * as React from "react"

import { defaultPlatform, type Platform } from "@/lib/docs"

type Config = {
  packageManager: "npm" | "yarn" | "pnpm" | "bun"
  installationType: "cli" | "manual"
  swiftPackage: boolean
  swiftPackagePath: string
  platform: Platform
}

export const defaultConfig: Config = {
  packageManager: "pnpm",
  installationType: "cli",
  swiftPackage: false,
  swiftPackagePath: "",
  platform: defaultPlatform,
}

type ConfigContextType = {
  config: Config
  setConfig: (config: Config) => void
}

const ConfigContext = React.createContext<ConfigContextType | null>(null)

export function useConfig() {
  const context = React.useContext(ConfigContext)

  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider")
  }

  return [context.config, context.setConfig] as const
}

const CONFIG_KEY = "config"
const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  window.addEventListener("storage", onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener("storage", onChange)
  }
}

function getSnapshot() {
  return localStorage.getItem(CONFIG_KEY)
}

function getServerSnapshot() {
  return null
}

function parseConfig(savedConfig: string | null) {
  if (!savedConfig) {
    return defaultConfig
  }
  try {
    return { ...defaultConfig, ...(JSON.parse(savedConfig) as Partial<Config>) }
  } catch (error) {
    console.error("Failed to parse config from local storage", error)
    return defaultConfig
  }
}

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const savedConfig = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
  const config = React.useMemo(() => parseConfig(savedConfig), [savedConfig])

  const setConfigAndSave = React.useCallback((newConfig: Config) => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig))
    listeners.forEach((listener) => listener())
  }, [])

  const value = React.useMemo(
    () => ({ config, setConfig: setConfigAndSave }),
    [config, setConfigAndSave]
  )

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  )
}
