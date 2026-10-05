"use client"

import * as React from "react"

import { AnimatePresence, motion } from "motion/react"

import { useFitScale } from "@/hooks/use-fit-scale"
import { cn } from "@/lib/utils"

import { MacWindow } from "./mac-window"

const ease = [0.32, 0.72, 0, 1] as const

const width = 640
const height = 400
const maxScale = 1.15

export function ShowcaseMac({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const { ref, scale } = useFitScale<HTMLDivElement>(width, maxScale)
  const fit = scale ?? 1

  return (
    <div ref={ref} className="w-full">
      <div
        className={cn("relative mx-auto", scale === null && "invisible")}
        style={{ width: width * fit, height: height * fit }}
      >
        <MacWindow
          className="absolute top-0 left-0 origin-top-left transition-colors duration-500"
          style={{ width, height, transform: `scale(${fit})` }}
        >
          <div className="h-full [&_*]:transition-[color,background-color,border-color,fill,stroke] [&_*]:duration-500">
            <AnimatePresence mode="wait">
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease }}
                className="h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </MacWindow>
      </div>
    </div>
  )
}
