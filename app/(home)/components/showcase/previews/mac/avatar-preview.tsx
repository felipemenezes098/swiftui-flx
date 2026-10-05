"use client"

import * as React from "react"

import { Check, Clock, Video } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { standupPeople } from "../shared/standup"
import { Swap } from "../shared/swap"
import { macButtonLarge, macOutline, macPrimary } from "./button-styles"

export function MacAvatarPreview() {
  const [going, setGoing] = React.useState(false)

  return (
    <div className="flex h-full items-center justify-center text-[13px] text-foreground">
      <div className="flex w-[320px] flex-col items-start gap-5">
        <div className="flex -space-x-3">
          {standupPeople.map((person) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={person.image}
              src={person.image}
              alt={person.initials}
              className="size-14 rounded-full object-cover ring-[3px] ring-background grayscale-50"
            />
          ))}
          <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-[15px] font-semibold text-secondary-foreground ring-[3px] ring-background">
            +4
          </span>
          <AnimatePresence initial={false}>
            {going && (
              <motion.span
                key="you"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex size-14 items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-primary-foreground ring-[3px] ring-background"
              >
                You
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-0.5">
          <p className="text-[20px] font-semibold tracking-tight">
            Team standup
          </p>
          <p className="text-muted-foreground">
            <Swap id={String(going)}>
              {going && "You and 7 others going"}
              {!going && "7 people going"}
            </Swap>
          </p>
        </div>

        <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            Today, 9:30 – 9:45 AM
          </span>
          <span className="flex items-center gap-1.5">
            <Video className="size-3.5" />
            Video call
          </span>
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => setGoing((value) => !value)}
          className={cn(
            macButtonLarge,
            "min-w-32",
            going && macOutline,
            !going && macPrimary
          )}
        >
          <Swap id={String(going)}>
            {going && <Check className="size-3.5" />}
            {going && "You're going"}
            {!going && "RSVP"}
          </Swap>
        </motion.button>
      </div>
    </div>
  )
}
