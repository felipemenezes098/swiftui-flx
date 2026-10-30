import { Bell, ChevronRight, Lock, Moon } from "lucide-react"

import {
  IPhone,
  IPhoneContent,
  IPhoneHomeIndicator,
  IPhoneIsland,
  IPhoneScreen,
  IPhoneStatusBar,
} from "@/components/core/iphone"
import { cn } from "@/lib/utils"

const rows = [
  { icon: Bell, name: "Notifications", on: true },
  { icon: Moon, name: "Focus", on: false },
  { icon: Lock, name: "Face ID", on: true },
]

function SwitchMock({ on }: Readonly<{ on: boolean }>) {
  return (
    <span
      className={cn(
        "flex h-[18px] w-[30px] items-center rounded-full p-[2px]",
        on && "justify-end bg-primary",
        !on && "justify-start bg-input"
      )}
    >
      <span className="size-[14px] rounded-full bg-white shadow-sm" />
    </span>
  )
}

export function SettingsPhone() {
  return (
    <IPhone className="shadow-2xl shadow-black/10">
      <IPhoneScreen className="bg-background">
        <IPhoneIsland />
        <IPhoneStatusBar />
        <IPhoneContent className="flex flex-col gap-4 px-3 pt-2">
          <p className="text-[20px] font-bold tracking-tight text-foreground">
            Settings
          </p>
          <div className="flex items-center gap-2.5 rounded-[var(--radius)] border border-border bg-card p-2.5">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-[11px] font-medium text-primary-foreground">
              AS
            </span>
            <div className="flex-1">
              <p className="text-[11px] font-semibold text-foreground">
                Ana Souza
              </p>
              <p className="text-[9px] text-muted-foreground">
                Account, iCloud, Media
              </p>
            </div>
            <ChevronRight className="size-3 text-muted-foreground" />
          </div>
          <div className="divide-y divide-border rounded-[var(--radius)] border border-border bg-card">
            {rows.map((row) => (
              <div
                key={row.name}
                className="flex items-center gap-2.5 px-2.5 py-2"
              >
                <row.icon className="size-3.5 text-muted-foreground" />
                <span className="flex-1 text-[11px] text-foreground">
                  {row.name}
                </span>
                <SwitchMock on={row.on} />
              </div>
            ))}
          </div>
          <span className="flex h-8 items-center justify-center rounded-[var(--radius)] bg-primary text-[11px] font-medium text-primary-foreground">
            Save changes
          </span>
        </IPhoneContent>
        <IPhoneHomeIndicator className="opacity-30" />
      </IPhoneScreen>
    </IPhone>
  )
}
