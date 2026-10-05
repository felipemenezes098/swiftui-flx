"use client"

import { motion } from "motion/react"

import { cn } from "@/lib/utils"

export function Spinner({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
      className={cn("size-4", className)}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="40 60"
      />
    </motion.svg>
  )
}
