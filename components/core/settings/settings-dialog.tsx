"use client"

import * as React from "react"

import { Settings } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { defaultConfig, useConfig } from "@/hooks/use-config"
import { useThemeTransition } from "@/hooks/use-theme-transition"
import { usePlatform } from "@/hooks/use-platform"
import { useSelectPlatform } from "@/hooks/use-select-platform"
import { platforms } from "@/lib/docs"
import { defaultSwiftPackagePath } from "@/lib/swift-package"

import { SettingsRow } from "./settings-row"
import { SettingsSegmented } from "./settings-segmented"

const themeOptions = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const

const packageManagerOptions = [
  { value: "pnpm", label: "pnpm" },
  { value: "npm", label: "npm" },
  { value: "yarn", label: "yarn" },
  { value: "bun", label: "bun" },
] as const

const installationOptions = [
  { value: "cli", label: "CLI" },
  { value: "manual", label: "Manual" },
] as const

const swiftPackageOptions = [
  { value: "off", label: "Off" },
  { value: "on", label: "On" },
] as const

const platformOptions = platforms.map((platform) => ({
  value: platform.id,
  label: platform.name,
}))

type ThemeValue = (typeof themeOptions)[number]["value"]

function swiftPackageValue(enabled: boolean) {
  if (enabled) return "on"
  return "off"
}

function SettingsDialog() {
  const [config, setConfig] = useConfig()
  const { theme } = useTheme()
  const setTheme = useThemeTransition()
  const platform = usePlatform()
  const selectPlatform = useSelectPlatform()
  const pathId = React.useId()

  const themeValue = (theme ?? "system") as ThemeValue

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 transition-none"
            aria-label="Settings"
            title="Settings"
          />
        }
      >
        <Settings className="size-3.75" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Your preferences for these docs, saved in this browser.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <SettingsRow label="Theme">
            <SettingsSegmented
              label="Theme"
              value={themeValue}
              options={themeOptions}
              onChange={setTheme}
            />
          </SettingsRow>
          <SettingsRow
            label="Platform"
            description="Components shown in the docs."
          >
            <SettingsSegmented
              label="Platform"
              value={platform}
              options={platformOptions}
              onChange={selectPlatform}
            />
          </SettingsRow>
          <SettingsRow
            label="Package manager"
            description="Used in every install command."
          >
            <SettingsSegmented
              label="Package manager"
              value={config.packageManager}
              options={packageManagerOptions}
              onChange={(packageManager) =>
                setConfig({ ...config, packageManager })
              }
            />
          </SettingsRow>
          <SettingsRow
            label="Installation"
            description="Tab shown first on install steps."
          >
            <SettingsSegmented
              label="Installation"
              value={config.installationType}
              options={installationOptions}
              onChange={(installationType) =>
                setConfig({ ...config, installationType })
              }
            />
          </SettingsRow>
          <SettingsRow
            label="Swift package"
            description="Adds --cwd to install commands."
          >
            <SettingsSegmented
              label="Swift package"
              value={swiftPackageValue(config.swiftPackage)}
              options={swiftPackageOptions}
              onChange={(value) =>
                setConfig({ ...config, swiftPackage: value === "on" })
              }
            />
          </SettingsRow>
          {config.swiftPackage && (
            <div className="flex flex-col gap-2">
              <label htmlFor={pathId} className="text-sm font-medium">
                Package path from your project folder
              </label>
              <Input
                id={pathId}
                value={config.swiftPackagePath}
                placeholder={defaultSwiftPackagePath}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                onChange={(event) =>
                  setConfig({ ...config, swiftPackagePath: event.target.value })
                }
                className="font-mono text-xs"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="sm:mr-auto"
            onClick={() => {
              setConfig(defaultConfig)
              setTheme("system")
            }}
          >
            Reset to defaults
          </Button>
          <DialogClose render={<Button>Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { SettingsDialog }
