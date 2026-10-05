"use client"

import * as React from "react"

import { Bell, Hand, Moon, Settings, Volume2 } from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { macGroup } from "./button-styles"
import { MacCheckbox } from "./checkbox"
import { MacScreen } from "./screen"

const sidebar = [
  {
    items: [
      { icon: Settings, name: "General", tint: "#8e8e93" },
      { icon: Bell, name: "Notifications", tint: "#ff3b30" },
      { icon: Volume2, name: "Sound", tint: "#ff2d55" },
      { icon: Moon, name: "Focus", tint: "#5e5ce6" },
      { icon: Hand, name: "Privacy", tint: "#0a84ff" },
    ],
  },
] as const

const channels = [
  { name: "Messages", detail: "Direct and groups" },
  { name: "Mentions", detail: "When you're tagged" },
  { name: "Reminders", detail: "Events and tasks" },
  { name: "Weekly digest", detail: "Every Monday" },
] as const

function Row({
  label,
  detail,
  checked,
  onCheckedChange,
  children,
}: {
  label: string
  detail: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className="flex w-full items-center gap-3 px-3 py-2 text-left"
    >
      {children}
      <span className="min-w-0 flex-1">
        <span className="block">{label}</span>
        <span className="block text-[11px] text-muted-foreground">
          {detail}
        </span>
      </span>
      <MacCheckbox checked={checked} />
    </button>
  )
}

export function MacTogglePreview() {
  const [allowed, setAllowed] = React.useState(true)
  const [enabled, setEnabled] = React.useState<Record<string, boolean>>({
    Messages: true,
    Mentions: true,
    Reminders: false,
    "Weekly digest": false,
  })

  return (
    <MacScreen
      sidebar={sidebar}
      selected="Notifications"
      title="Notifications"
      className="gap-4"
    >
      <div className={macGroup}>
        <Row
          label="Allow notifications"
          detail="Banners, sounds and badges"
          checked={allowed}
          onCheckedChange={setAllowed}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-primary text-primary-foreground">
            <Bell className="size-4" />
          </span>
        </Row>
      </div>

      <motion.div
        variants={{ true: { opacity: 1 }, false: { opacity: 0.5 } }}
        animate={String(allowed)}
        transition={{ duration: 0.25 }}
        inert={!allowed}
        className="flex flex-col gap-1.5"
      >
        <p className="px-1 font-semibold">Deliver</p>
        <div className={cn("divide-y divide-border", macGroup)}>
          {channels.map((channel) => (
            <Row
              key={channel.name}
              label={channel.name}
              detail={channel.detail}
              checked={enabled[channel.name]}
              onCheckedChange={(checked) =>
                setEnabled((value) => ({ ...value, [channel.name]: checked }))
              }
            />
          ))}
        </div>
      </motion.div>
    </MacScreen>
  )
}
