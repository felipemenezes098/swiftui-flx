"use client"

import * as React from "react"

import { AnimatePresence, motion } from "motion/react"

import { spring } from "./spring"

export function Swap({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={id}
        initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
        transition={spring}
        className="flex items-center gap-1.5"
      >
        {children}
      </motion.span>
    </AnimatePresence>
  )
}
