"use client"

import * as React from "react"

import { BatteryFull, Signal, Wifi } from "lucide-react"

import { cn } from "@/lib/utils"

type IPhoneSize = "sm" | "default" | "lg"

const sizeStyles: Record<
  IPhoneSize,
  {
    frame: string
    bezel: string
    screen: string
    island: string
    statusBar: string
    statusIcon: string
    home: string
    buttons: string
  }
> = {
  sm: {
    frame: "w-40",
    bezel: "rounded-[2rem] p-1.5",
    screen: "rounded-[1.65rem]",
    island: "top-2 h-3.5 w-14",
    statusBar: "px-4 pt-2.5 text-[9px]",
    statusIcon: "size-2.5",
    home: "bottom-1 h-[3px] w-14",
    buttons: "w-[2.5px]",
  },
  default: {
    frame: "w-56",
    bezel: "rounded-[2.75rem] p-2",
    screen: "rounded-[2.25rem]",
    island: "top-2.5 h-5 w-20",
    statusBar: "px-6 pt-3 text-[11px]",
    statusIcon: "size-3",
    home: "bottom-1.5 h-1 w-24",
    buttons: "w-[3px]",
  },
  lg: {
    frame: "w-72",
    bezel: "rounded-[3.25rem] p-2.5",
    screen: "rounded-[2.75rem]",
    island: "top-3 h-6 w-24",
    statusBar: "px-8 pt-4 text-sm",
    statusIcon: "size-3.5",
    home: "bottom-2 h-1.5 w-28",
    buttons: "w-1",
  },
}

interface IPhoneContextValue {
  size: IPhoneSize
}

const IPhoneContext = React.createContext<IPhoneContextValue | null>(null)

function useIPhoneContext() {
  const context = React.useContext(IPhoneContext)
  if (!context) {
    throw new Error("IPhone* parts must be used inside an <IPhone>")
  }
  return context
}

function IPhone({
  size = "default",
  className,
  children,
  ...props
}: {
  size?: IPhoneSize
} & React.HTMLAttributes<HTMLDivElement>) {
  const vs = sizeStyles[size]

  return (
    <IPhoneContext.Provider value={{ size }}>
      <div
        data-slot="iphone"
        className={cn(
          "relative mx-auto aspect-[9/19.5] bg-neutral-900 shadow-xl ring-1 ring-black/10 dark:bg-neutral-800 dark:ring-white/10",
          vs.frame,
          vs.bezel,
          className
        )}
        {...props}
      >
        <span
          data-slot="iphone-button"
          className={cn(
            "absolute top-24 -left-px h-6 rounded-l-sm bg-neutral-800 dark:bg-neutral-700",
            vs.buttons
          )}
        />
        <span
          data-slot="iphone-button"
          className={cn(
            "absolute top-36 -left-px h-9 rounded-l-sm bg-neutral-800 dark:bg-neutral-700",
            vs.buttons
          )}
        />
        <span
          data-slot="iphone-button"
          className={cn(
            "absolute top-48 -left-px h-9 rounded-l-sm bg-neutral-800 dark:bg-neutral-700",
            vs.buttons
          )}
        />
        <span
          data-slot="iphone-button"
          className={cn(
            "absolute top-32 -right-px h-14 rounded-r-sm bg-neutral-800 dark:bg-neutral-700",
            vs.buttons
          )}
        />

        {children}
      </div>
    </IPhoneContext.Provider>
  )
}

function IPhoneScreen({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { size } = useIPhoneContext()
  const vs = sizeStyles[size]

  return (
    <div
      data-slot="iphone-screen"
      className={cn(
        "bg-background relative flex h-full w-full flex-col overflow-hidden",
        vs.screen,
        className
      )}
      {...props}
    />
  )
}

function IPhoneIsland({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { size } = useIPhoneContext()
  const vs = sizeStyles[size]

  return (
    <div
      data-slot="iphone-island"
      className={cn(
        "absolute left-1/2 z-20 -translate-x-1/2 rounded-full bg-black",
        vs.island,
        className
      )}
      {...props}
    />
  )
}

function IPhoneStatusBar({
  time = "9:41",
  className,
  children,
  ...props
}: {
  time?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const { size } = useIPhoneContext()
  const vs = sizeStyles[size]

  return (
    <div
      data-slot="iphone-status-bar"
      className={cn(
        "text-foreground relative z-10 flex shrink-0 items-center justify-between font-semibold",
        vs.statusBar,
        className
      )}
      {...props}
    >
      <span className="tabular-nums">{time}</span>
      {children ?? (
        <div className="flex items-center gap-1">
          <Signal className={vs.statusIcon} />
          <Wifi className={vs.statusIcon} />
          <BatteryFull className={vs.statusIcon} />
        </div>
      )}
    </div>
  )
}

function IPhoneContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="iphone-content"
      className={cn(
        "no-scrollbar relative flex-1 overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

function IPhoneHomeIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { size } = useIPhoneContext()
  const vs = sizeStyles[size]

  return (
    <div
      data-slot="iphone-home-indicator"
      className={cn(
        "bg-foreground/80 absolute left-1/2 z-20 -translate-x-1/2 rounded-full",
        vs.home,
        className
      )}
      {...props}
    />
  )
}

export {
  IPhone,
  IPhoneContent,
  IPhoneHomeIndicator,
  IPhoneIsland,
  IPhoneScreen,
  IPhoneStatusBar,
}
