"use client"

import * as React from "react"

import {
  Clock,
  Disc3,
  LayoutGrid,
  MicVocal,
  PlayCircle,
  Radio,
  Search,
} from "lucide-react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

import { madeForYou, recentlyPlayed } from "../shared/music"
import { MacScreen } from "./screen"

const sidebar = [
  {
    items: [
      { icon: PlayCircle, name: "Listen Now" },
      { icon: LayoutGrid, name: "Browse" },
      { icon: Radio, name: "Radio" },
    ],
  },
  {
    title: "Library",
    items: [
      { icon: Clock, name: "Recently Added" },
      { icon: MicVocal, name: "Artists" },
      { icon: Disc3, name: "Albums" },
    ],
  },
] as const

function Cover({
  item,
  className,
}: {
  item: { title: string; subtitle: string; image: string }
  className?: string
}) {
  return (
    <div className={cn("group flex shrink-0 flex-col gap-1.5", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt=""
        draggable={false}
        className="aspect-square w-full rounded-[calc(var(--radius)-2px)] object-cover ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div>
        <p className="truncate text-[12px] font-medium">{item.title}</p>
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
    <section className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="font-semibold">{title}</p>
        <p className="text-[12px] text-primary">See All</p>
      </div>
      <div ref={viewport} className="-mx-5 -my-2 overflow-hidden py-2">
        <motion.div
          drag="x"
          dragConstraints={viewport}
          dragElastic={0.12}
          className="flex w-max cursor-grab gap-3 px-5 active:cursor-grabbing"
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

export function MacCardPreview() {
  return (
    <MacScreen
      sidebar={sidebar}
      selected="Listen Now"
      title="Listen Now"
      subtitle="Tuesday, May 12"
      toolbar={
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-32 items-center gap-1.5 rounded-[calc(var(--radius)-2px)] bg-card px-2 text-[12px] text-muted-foreground ring-1 ring-input ring-inset">
            <Search className="size-3" />
            Search
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://github.com/felipemenezes098.png"
            alt=""
            className="size-6 rounded-full object-cover"
          />
        </div>
      }
      className="gap-4"
    >
      <Shelf title="Made for you">
        {madeForYou.map((item) => (
          <Cover key={item.title} item={item} className="w-[104px]" />
        ))}
      </Shelf>
      <Shelf title="Recently played">
        {recentlyPlayed.map((item) => (
          <Cover key={item.title} item={item} className="w-[76px]" />
        ))}
      </Shelf>
    </MacScreen>
  )
}
