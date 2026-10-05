"use client"

import * as React from "react"

import { Check, CopyIcon } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { copyToClipboard } from "@/lib/copy"

type CopyButtonProps = React.ComponentProps<typeof Button> & {
  content: string
  label?: string
  icon?: React.ReactNode
  iconClassName?: string
  copiedDuration?: number
}

const copyTransition = {
  type: "spring",
  duration: 0.3,
  bounce: 0,
} as const

function CopyButton({
  content,
  label,
  icon,
  iconClassName = "size-3.5",
  copiedDuration = 2000,
  variant = "outline",
  size = "sm",
  onClick,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const copy = React.useCallback(
    (value: string) => {
      copyToClipboard(value)
      setCopied(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), copiedDuration)
    },
    [copiedDuration]
  )

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      aria-label={label || (copied ? "Copied" : "Copy")}
      {...props}
      onClick={(event) => {
        onClick?.(event)
        copy(content)
      }}
    >
      <span
        className={cn(
          "relative grid shrink-0 place-items-center",
          iconClassName
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={copied ? "check" : "idle"}
            initial={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(4px)" }}
            transition={copyTransition}
            className="flex items-center justify-center"
          >
            {copied ? (
              <Check className={iconClassName} aria-hidden />
            ) : (
              (icon ?? <CopyIcon className={iconClassName} aria-hidden />)
            )}
          </motion.div>
        </AnimatePresence>
      </span>
      {label || null}
    </Button>
  )
}

export { CopyButton }
export type { CopyButtonProps }
