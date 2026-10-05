"use client"

import * as React from "react"

import { Check, Clock, Video } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

import { standupPeople } from "../shared/standup"
import { primaryButton } from "./primary-button"
import { Swap } from "../shared/swap"

export function AvatarPreview() {
  const [going, setGoing] = React.useState(false)

  return (
    <div className="flex h-full flex-col justify-center gap-4 px-6 pb-10">
      <div className="flex -space-x-3">
        {standupPeople.map((person) => (
          <span
            key={person.image}
            className="flex size-11 items-center justify-center rounded-full border-2 border-background bg-muted"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={person.image}
              alt={person.initials}
              className="size-full rounded-full object-cover grayscale-50"
            />
          </span>
        ))}
        <span className="flex size-11 items-center justify-center rounded-full border-2 border-background bg-secondary text-[12px] font-semibold text-secondary-foreground">
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
              className="flex size-11 items-center justify-center rounded-full border-2 border-background bg-primary text-[11px] font-semibold text-primary-foreground"
            >
              You
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-[15px] font-semibold text-foreground">
          Team standup
        </p>
        <p className="text-[13px] text-muted-foreground">
          <Swap id={String(going)}>
            {going && "You and 7 others going"}
            {!going && "7 people going"}
          </Swap>
        </p>
      </div>

      <div className="flex flex-col gap-1.5 text-[12px] text-muted-foreground">
        <span className="flex items-center gap-2">
          <Clock className="size-3.5" />
          Today, 9:30 – 9:45 AM
        </span>
        <span className="flex items-center gap-2">
          <Video className="size-3.5" />
          Video call
        </span>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => setGoing((value) => !value)}
        className={cn(
          primaryButton,
          going &&
            "bg-transparent text-foreground ring-1 ring-border ring-inset"
        )}
      >
        <Swap id={String(going)}>
          {going && <Check className="size-4" />}
          {going && "You're going"}
          {!going && "RSVP"}
        </Swap>
      </motion.button>
    </div>
  )
}
