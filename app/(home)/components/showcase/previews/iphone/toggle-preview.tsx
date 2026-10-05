"use client"

import * as React from "react"

import { AtSign, Bell, Calendar, Mail, MessageCircle } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { Screen } from "./screen"
import { Segmented } from "./segmented"
import { spring } from "../shared/spring"

function Toggle({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "flex h-[26px] w-[44px] shrink-0 items-center rounded-full p-[2px]",
        checked && "justify-end bg-primary",
        !checked && "justify-start bg-input"
      )}
    >
      <motion.span
        layout
        transition={spring}
        className={cn(
          "size-[22px] rounded-full shadow-sm",
          checked && "bg-primary-foreground",
          !checked && "bg-white"
        )}
      />
    </button>
  )
}

const channels = [
  { icon: MessageCircle, name: "Messages", detail: "Direct and groups" },
  { icon: AtSign, name: "Mentions", detail: "When you're tagged" },
  { icon: Calendar, name: "Reminders", detail: "Events and tasks" },
  { icon: Mail, name: "Weekly digest", detail: "Every Monday" },
] as const

const previewsOptions = ["Always", "Unlocked", "Never"] as const

export function TogglePreview() {
  const [allowed, setAllowed] = React.useState(true)
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>({
    Messages: true,
    Mentions: true,
    Reminders: false,
    "Weekly digest": false,
  })
  const [previews, setPreviews] =
    React.useState<(typeof previewsOptions)[number]>("Unlocked")

  return (
    <Screen eyebrow="Settings" title="Notifications">
      <div className="flex items-center gap-3 rounded-[calc(var(--radius)+2px)] bg-muted p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-primary text-primary-foreground">
          <Bell className="size-4" />
        </span>
        <p className="flex-1 text-[13px] font-medium text-foreground">
          Allow notifications
        </p>
        <Toggle
          checked={allowed}
          onCheckedChange={setAllowed}
          label="Allow notifications"
        />
      </div>

      <motion.div
        variants={{ true: { opacity: 1 }, false: { opacity: 0.35 } }}
        animate={String(allowed)}
        transition={{ duration: 0.25 }}
        inert={!allowed}
        className="mt-5 flex flex-col gap-5"
      >
        <div className="flex flex-col">
          <p className="mb-1.5 px-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Deliver
          </p>
          <div className="divide-y divide-border rounded-[calc(var(--radius)+2px)] ring-1 ring-border ring-inset">
            {channels.map((channel) => (
              <div
                key={channel.name}
                className="flex items-center gap-3 px-3 py-2.5"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-muted text-foreground">
                  <channel.icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-foreground">
                    {channel.name}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {channel.detail}
                  </p>
                </div>
                <Toggle
                  checked={enabled[channel.name]}
                  onCheckedChange={(checked) =>
                    setEnabled((value) => ({
                      ...value,
                      [channel.name]: checked,
                    }))
                  }
                  label={channel.name}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="mb-1.5 px-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
            Show previews
          </p>
          <Segmented
            options={previewsOptions}
            value={previews}
            onValueChange={setPreviews}
          />
        </div>
      </motion.div>
    </Screen>
  )
}
