"use client"

import * as React from "react"

import { Check, Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { spring } from "../shared/spring"
import { primaryButton } from "./primary-button"
import { Spinner } from "../shared/spinner"
import { Swap } from "../shared/swap"

export function TextFieldPreview() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [touched, setTouched] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "loading" | "done">(
    "idle"
  )

  const emailValid = /^\S+@\S+\.\S+$/.test(email)
  const showError = touched && email.length > 0 && !emailValid
  const canSubmit = emailValid && password.length >= 6 && status === "idle"

  React.useEffect(() => {
    if (status === "loading") {
      const id = setTimeout(() => setStatus("done"), 1000)
      return () => clearTimeout(id)
    }
    if (status === "done") {
      const id = setTimeout(() => setStatus("idle"), 1800)
      return () => clearTimeout(id)
    }
  }, [status])

  const field =
    "flex h-11 items-center gap-2 rounded-[var(--radius)] bg-card px-3 ring-1 ring-inset focus-within:ring-2"

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (canSubmit) setStatus("loading")
      }}
      className="flex h-full flex-col px-5 pt-6 pb-8"
    >
      <span className="flex size-9 items-center justify-center rounded-[var(--radius)] bg-primary text-primary-foreground">
        <Sparkles className="size-4" />
      </span>
      <p className="mt-4 text-[24px] leading-tight font-bold tracking-tight text-foreground">
        Welcome back
      </p>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Sign in to pick up where you left off.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[12px] font-medium text-foreground">Email</span>
          <span
            className={cn(
              field,
              showError && "ring-destructive",
              !showError && "ring-border focus-within:ring-ring"
            )}
          >
            <Mail className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="email"
              inputMode="email"
              autoComplete="off"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => setTouched(true)}
              className="w-full min-w-0 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
            />
            <AnimatePresence>
              {emailValid && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={spring}
                >
                  <Check className="size-4 text-foreground" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <AnimatePresence initial={false}>
            {showError && (
              <motion.span
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={spring}
                className="overflow-hidden text-[11px] text-destructive"
              >
                Enter a valid email address.
              </motion.span>
            )}
          </AnimatePresence>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="flex justify-between text-[12px] font-medium">
            <span className="text-foreground">Password</span>
            <span className="text-muted-foreground">Forgot?</span>
          </span>
          <span className={cn(field, "ring-border focus-within:ring-ring")}>
            <Lock className="size-4 shrink-0 text-muted-foreground" />
            <input
              type={(visible && "text") || "password"}
              autoComplete="off"
              placeholder="At least 6 characters"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full min-w-0 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
            />
            {visible && (
              <button
                type="button"
                aria-label="Hide password"
                onClick={() => setVisible(false)}
                className="text-muted-foreground"
              >
                <EyeOff className="size-4" />
              </button>
            )}
            {!visible && (
              <button
                type="button"
                aria-label="Show password"
                onClick={() => setVisible(true)}
                className="text-muted-foreground"
              >
                <Eye className="size-4" />
              </button>
            )}
          </span>
        </label>
      </div>

      <motion.button
        type="submit"
        whileTap={{ scale: 0.97 }}
        aria-disabled={!canSubmit}
        className={cn(
          primaryButton,
          "mt-6 transition-opacity",
          !canSubmit && status === "idle" && "opacity-45"
        )}
      >
        <Swap id={status}>
          {status === "idle" && "Sign in"}
          {status === "loading" && <Spinner />}
          {status === "done" && (
            <>
              <Check className="size-4" />
              Signed in
            </>
          )}
        </Swap>
      </motion.button>

      <p className="mt-auto text-center text-[12px] text-muted-foreground">
        New here?{" "}
        <span className="font-medium text-foreground">Create an account</span>
      </p>
    </form>
  )
}
