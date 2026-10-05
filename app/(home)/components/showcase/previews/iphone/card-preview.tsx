"use client"

import * as React from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { madeForYou, recentlyPlayed } from "../shared/music"
import { Screen } from "./screen"

function Cover({
  item,
  className,
}: {
  item: { title: string; subtitle: string; image: string }
  className?: string
}) {
  return (
    <div className={cn("flex shrink-0 flex-col gap-1.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt=""
        draggable={false}
        className="aspect-square w-full rounded-[calc(var(--radius)+2px)] object-cover ring-1 ring-border"
      />
      <div>
        <p className="truncate text-[12px] font-medium text-foreground">
          {item.title}
        </p>
        <p className="truncate text-[11px] text-muted-foreground">
          {item.subtitle}
        </p>
      </div>
    </div>
  )
}

function Shelf({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const viewport = React.useRef<HTMLDivElement>(null)

  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between">
        <p className="text-[17px] font-semibold tracking-tight text-foreground">
          {title}
        </p>
        <p className="text-[12px] text-muted-foreground">See all</p>
      </div>
      <div ref={viewport} className="-mx-4 -my-1 overflow-hidden py-1">
        <motion.div
          drag="x"
          dragConstraints={viewport}
          dragElastic={0.12}
          className="flex w-max cursor-grab gap-3 px-4 active:cursor-grabbing"
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export function CardPreview() {
  return (
    <Screen
      eyebrow="Tuesday, May 12"
      title="Listen Now"
      accessory={
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="https://github.com/felipemenezes098.png"
          alt=""
          className="mb-1 size-8 rounded-full object-cover"
        />
      }
    >
      <div className="flex flex-col gap-6">
        <Shelf title="Made for you">
          {madeForYou.map((item) => (
            <Cover key={item.title} item={item} className="w-[148px]" />
          ))}
        </Shelf>
        <Shelf title="Recently played">
          {recentlyPlayed.map((item) => (
            <Cover key={item.title} item={item} className="w-[112px]" />
          ))}
        </Shelf>
      </div>
    </Screen>
  )
}
