"use client"

import * as React from "react"

import {
  Check,
  Coffee,
  Heart,
  Package,
  Shirt,
  ShoppingBag,
  Store,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

import { Spinner } from "../shared/spinner"
import { Swap } from "../shared/swap"
import { macButton, macOutline, macPrimary } from "./button-styles"
import { MacScreen } from "./screen"

const sidebar = [
  {
    items: [
      { icon: Store, name: "Shop" },
      { icon: ShoppingBag, name: "Bag" },
      { icon: Package, name: "Orders" },
      { icon: Heart, name: "Favorites" },
    ],
  },
] as const

const bag = [
  { icon: Coffee, name: "Ceramic mug", detail: "Stoneware · Sand", price: 48 },
  { icon: Shirt, name: "Linen apron", detail: "Natural · M", price: 91 },
]

export function MacSheetPreview() {
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

  const [windowNode, setWindowNode] = React.useState<HTMLElement | null>(null)
  const windowRef = React.useCallback((node: HTMLDivElement | null) => {
    setWindowNode(
      node?.closest<HTMLElement>("[data-slot=showcase-mac-window]") ?? null
    )
  }, [])

  return (
    <div ref={windowRef} className="h-full">
      <MacScreen
        sidebar={sidebar}
        selected="Bag"
        title="Bag"
        subtitle="2 items"
      >
        <div className="flex flex-col gap-2">
          {bag.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 rounded-[calc(var(--radius)+2px)] p-2.5 ring-1 ring-border ring-inset"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] bg-muted">
                <item.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {item.detail}
                </p>
              </div>
              <p className="font-medium tabular-nums">${item.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <p className="text-muted-foreground">
            Total{" "}
            <span className="font-semibold text-foreground tabular-nums">
              ${total}.00
            </span>
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(macButton, macPrimary)}
          >
            Checkout
          </button>
        </div>
      </MacScreen>

      {windowNode &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-[25] bg-black/10"
                />
                <motion.div
                  key="sheet"
                  role="dialog"
                  aria-label="Confirm order"
                  initial={{ opacity: 0, y: -24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  className="absolute top-3 left-1/2 z-[25] -ml-[150px] flex w-[300px] flex-col gap-4 rounded-[var(--radius)] bg-popover p-5 text-[13px] text-popover-foreground shadow-[0_18px_50px_rgb(0_0_0/0.25)] ring-1 ring-black/10 dark:ring-white/15"
                >
                  <div>
                    <p className="font-semibold">Confirm order</p>
                    <p className="text-[11px] text-muted-foreground">
                      Arrives Thursday, May 14
                    </p>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="tabular-nums">${total}.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between border-t border-border pt-1.5 font-semibold">
                      <span>Total</span>
                      <span className="tabular-nums">${total}.00</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => status === "idle" && setOpen(false)}
                      className={cn(macButton, macOutline)}
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => status === "idle" && setStatus("paying")}
                      className={cn(macButton, macPrimary, "min-w-28")}
                    >
                      <Swap id={status}>
                        {status === "idle" && `Pay $${total}.00`}
                        {status === "paying" && <Spinner className="size-3" />}
                        {status === "done" && (
                          <>
                            <Check className="size-3.5" />
                            Order placed
                          </>
                        )}
                      </Swap>
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          windowNode
        )}
    </div>
  )
}
