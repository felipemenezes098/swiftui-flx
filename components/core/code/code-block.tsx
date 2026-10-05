"use client"

import * as React from "react"

import { ChevronsDownUp, ChevronsUpDown } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function CodeBlock({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="code-block"
      className={cn(
        "relative w-full overflow-hidden rounded-xl border bg-card",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="code-block-header"
      className={cn(
        "flex items-center justify-between border-b border-border/50 px-3 py-2",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="code-block-group"
      className={cn(
        "flex items-center gap-2",
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CodeBlockContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="code-block-content"
      className={cn(
        "no-scrollbar w-full overflow-auto font-mono text-[13px]",
        className
      )}
      {...props}
    />
  )
}

interface CodeBlockCollapsibleContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const CodeBlockCollapsibleContext =
  React.createContext<CodeBlockCollapsibleContextValue | null>(null)

function useCodeBlockCollapsible() {
  const context = React.useContext(CodeBlockCollapsibleContext)
  if (!context) {
    throw new Error(
      "CodeBlockCollapsible* parts must be used inside a <CodeBlockCollapsible>"
    )
  }
  return context
}

function CodeBlockCollapsible({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  ...props
}: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
} & React.HTMLAttributes<HTMLDivElement>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen

  const setOpen = React.useCallback(
    (value: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(value)
      onOpenChange?.(value)
    },
    [openProp, onOpenChange]
  )

  return (
    <CodeBlockCollapsibleContext.Provider value={{ open, setOpen }}>
      <div
        data-slot="code-block-collapsible"
        data-state={open ? "open" : "closed"}
        className={cn("relative w-full", className)}
        {...props}
      />
    </CodeBlockCollapsibleContext.Provider>
  )
}

const panelTransition = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
} as const

function CodeBlockCollapsiblePanel({
  peekHeight = 200,
  maxHeight,
  className,
  children,
  ...props
}: {
  peekHeight?: number
  maxHeight?: number
} & Omit<
  React.ComponentProps<typeof motion.div>,
  "animate" | "transition" | "children"
> & { children?: React.ReactNode }) {
  const { open, setOpen } = useCodeBlockCollapsible()

  return (
    <motion.div
      data-slot="code-block-collapsible-panel"
      data-state={open ? "open" : "closed"}
      initial={false}
      animate={{ height: open ? (maxHeight ?? "auto") : peekHeight }}
      transition={panelTransition}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        inert={!open}
        className={cn("h-full", maxHeight && "no-scrollbar overflow-y-auto")}
      >
        {children}
      </div>

      {!open && (
        <div className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center bg-linear-to-t from-background via-background/70 to-transparent p-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-card text-muted-foreground hover:bg-muted"
            onClick={() => setOpen(true)}
          >
            Show more
          </Button>
        </div>
      )}
    </motion.div>
  )
}

function CodeBlockCollapsibleTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useCodeBlockCollapsible()

  return (
    <button
      type="button"
      data-slot="code-block-collapsible-trigger"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-card px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80",
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          <span className={open ? "hidden" : undefined}>Expand</span>
          <span className={open ? undefined : "hidden"}>Collapse</span>
          <ChevronsUpDown className={cn("size-4", open && "hidden")} />
          <ChevronsDownUp className={cn("size-4", !open && "hidden")} />
        </>
      )}
    </button>
  )
}

export {
  CodeBlock,
  CodeBlockCollapsible,
  CodeBlockCollapsiblePanel,
  CodeBlockCollapsibleTrigger,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
}
