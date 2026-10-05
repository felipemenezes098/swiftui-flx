"use client"

import * as React from "react"

import { AnimatePresence, motion } from "motion/react"

import {
  IPhone,
  IPhoneContent,
  IPhoneHomeIndicator,
  IPhoneIsland,
  IPhoneScreen,
  IPhoneStatusBar,
} from "@/components/core/iphone"

const ease = [0.32, 0.72, 0, 1] as const

const width = 288
const height = 624
const scale = 0.85

export function ShowcaseIPhone({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <div
      className="relative"
      style={{ width: width * scale, height: height * scale }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        <IPhone size="lg">
          <IPhoneScreen className="transition-colors duration-500">
            <IPhoneIsland />
            <IPhoneStatusBar />
            <IPhoneContent className="overflow-hidden [&_*]:transition-[color,background-color,border-color,fill,stroke] [&_*]:duration-500">
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
            </IPhoneContent>
            <IPhoneHomeIndicator className="opacity-30" />
          </IPhoneScreen>
        </IPhone>
      </div>
    </div>
  )
}
