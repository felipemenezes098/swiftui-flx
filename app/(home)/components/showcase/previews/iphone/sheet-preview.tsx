"use client"

import * as React from "react"

import { Check, Coffee, Shirt } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

import { primaryButton } from "./primary-button"
import { Screen } from "./screen"
import { Spinner } from "../shared/spinner"
import { Swap } from "../shared/swap"

const bag = [
  { icon: Coffee, name: "Ceramic mug", detail: "Stoneware · Sand", price: 48 },
  { icon: Shirt, name: "Linen apron", detail: "Natural · M", price: 91 },
]

export function SheetPreview() {
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "paying" | "done">("idle")

  React.useEffect(() => {
    const id = setTimeout(() => setOpen(true), 1500)
    return () => clearTimeout(id)
  }, [])

  React.useEffect(() => {
    if (status === "paying") {
      const id = setTimeout(() => setStatus("done"), 1100)
      return () => clearTimeout(id)
    }
    if (status === "done") {
      const id = setTimeout(() => {
        setOpen(false)
        setStatus("idle")
      }, 1300)
      return () => clearTimeout(id)
    }
  }, [status])

  const total = bag.reduce((sum, item) => sum + item.price, 0)

  const [screen, setScreen] = React.useState<HTMLElement | null>(null)
  const screenRef = React.useCallback((node: HTMLDivElement | null) => {
    setScreen(node?.closest<HTMLElement>("[data-slot=iphone-screen]") ?? null)
  }, [])

  return (
    <div ref={screenRef} className="relative h-full overflow-hidden">
      <Screen eyebrow="2 items" title="Bag">
        <div className="flex flex-col gap-2">
          {bag.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-[calc(var(--radius)+2px)] p-2.5 ring-1 ring-border ring-inset"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-muted text-foreground">
                <item.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-medium text-foreground">
                  {item.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {item.detail}
                </p>
              </div>
              <p className="text-[13px] font-medium text-foreground tabular-nums">
                ${item.price}
              </p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(primaryButton, "mt-auto")}
        >
          Checkout
        </button>
      </Screen>

      {screen &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.button
                  type="button"
                  aria-label="Dismiss"
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => status === "idle" && setOpen(false)}
                  className="absolute inset-0 z-[15] bg-black/35"
                />
                <motion.div
                  key="sheet"
                  role="dialog"
                  aria-label="Confirm order"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", stiffness: 380, damping: 38 }}
                  drag="y"
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0, bottom: 0.6 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.y > 60 && status === "idle") setOpen(false)
                  }}
                  className="absolute inset-x-0 bottom-0 z-[15] flex flex-col gap-4 rounded-t-[calc(var(--radius)+12px)] bg-card px-5 pt-2.5 pb-9 shadow-[0_-8px_30px_rgb(0_0_0/0.12)]"
                >
                  <span className="mx-auto h-1 w-9 rounded-full bg-muted-foreground/30" />
                  <div>
                    <p className="text-[17px] font-semibold text-foreground">
                      Confirm order
                    </p>
                    <p className="text-[12px] text-muted-foreground">
                      Arrives Thursday, May 14
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 text-[13px]">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="tabular-nums">${total}.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-2 font-semibold text-foreground">
                      <span>Total</span>
                      <span className="tabular-nums">${total}.00</span>
                    </div>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => status === "idle" && setStatus("paying")}
                    className={primaryButton}
                  >
                    <Swap id={status}>
                      {status === "idle" && `Pay $${total}.00`}
                      {status === "paying" && <Spinner />}
                      {status === "done" && (
                        <>
                          <Check className="size-4" />
                          Order placed
                        </>
                      )}
                    </Swap>
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          screen
        )}
    </div>
  )
}
