"use client"

import * as React from "react"

import { Check, Eye, EyeOff } from "lucide-react"
import { motion } from "motion/react"

import { Logo } from "@/components/core/logo"
import { cn } from "@/lib/utils"

import { Spinner } from "../shared/spinner"
import { Swap } from "../shared/swap"
import { macButtonLarge, macPrimary } from "./button-styles"
import { MacCheckbox } from "./checkbox"

const field =
  "flex h-6 items-center rounded-[calc(var(--radius)-2px)] bg-card px-3 ring-1 ring-input transition-shadow ring-inset focus-within:ring-2 focus-within:ring-ring"

export function MacTextFieldPreview() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [visible, setVisible] = React.useState(false)
  const [remember, setRemember] = React.useState(true)
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">(
    "idle"
  )

  React.useEffect(() => {
    if (status === "loading") {
      const id = setTimeout(() => setStatus("done"), 1100)
      return () => clearTimeout(id)
    }
    if (status === "done") {
      const id = setTimeout(() => setStatus("idle"), 1600)
      return () => clearTimeout(id)
    }
  }, [status])

  let passwordType = "password"
  if (visible) passwordType = "text"

  return (
    <div className="flex h-full items-center justify-center text-[13px] text-foreground">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (status === "idle") setStatus("loading")
        }}
        className="flex w-[260px] flex-col gap-4"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo.SwiftUI aria-hidden className="size-11 drop-shadow-sm" />
          <div>
            <p className="text-[15px] font-semibold">Sign in to FLX</p>
            <p className="text-[12px] text-muted-foreground">
              Use your account to sync your themes.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1">
            <span className="font-medium">Email</span>
            <span className={field}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full min-w-0 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </span>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-medium">Password</span>
            <span className={cn(field, "gap-2 pr-1.5")}>
              <input
                type={passwordType}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className="w-full min-w-0 bg-transparent outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setVisible((value) => !value)}
                aria-label="Toggle password visibility"
                className="text-muted-foreground hover:text-foreground"
              >
                {visible && <EyeOff className="size-3.5" />}
                {!visible && <Eye className="size-3.5" />}
              </button>
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            role="checkbox"
            aria-checked={remember}
            onClick={() => setRemember((value) => !value)}
            className="flex items-center gap-[5px]"
          >
            <MacCheckbox checked={remember} />
            Remember me
          </button>
          <span className="text-[12px] text-primary">Forgot password?</span>
        </div>

        <motion.button
          type="submit"
          whileTap={{ scale: 0.98 }}
          className={cn(macButtonLarge, macPrimary, "w-full")}
        >
          <Swap id={status}>
            {status === "idle" && "Sign In"}
            {status === "loading" && <Spinner className="size-3.5" />}
            {status === "done" && (
              <>
                <Check className="size-3.5" />
                Signed in
              </>
            )}
          </Swap>
        </motion.button>

        <p className="text-center text-[12px] text-muted-foreground">
          New to FLX? <span className="text-primary">Create an account</span>
        </p>
      </form>
    </div>
  )
}
