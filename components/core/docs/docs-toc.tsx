"use client"

import * as React from "react"

import type { TocItem } from "@/lib/toc"
import { cn } from "@/lib/utils"

function flattenIds(items: TocItem[]): string[] {
  return items.flatMap((item) => [
    item.url.slice(1),
    ...(item.items ? flattenIds(item.items) : []),
  ])
}

function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (ids.length === 0) return

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: "-80px 0% -70% 0%" }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}

function TocLink({
  item,
  activeId,
}: Readonly<{ item: TocItem; activeId: string | null }>) {
  const isActive = activeId === item.url.slice(1)

  return (
    <li>
      <a
        href={item.url}
        className={cn(
          "block py-1 text-[0.8rem] no-underline transition-colors",
          isActive
            ? "font-medium text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {item.title}
      </a>
      {item.items && item.items.length > 0 && (
        <ul className="ml-3 border-l border-border pl-3">
          {item.items.map((child) => (
            <TocLink key={child.url} item={child} activeId={activeId} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function DocsToc({
  items,
  className,
}: Readonly<{ items: TocItem[]; className?: string }>) {
  const activeId = useActiveHeading(React.useMemo(() => flattenIds(items), [items]))

  if (items.length === 0) return null

  return (
    <div
      className={cn(
        "sticky top-20 hidden h-[calc(100vh-8rem)] w-48 shrink-0",
        className
      )}
    >
      <p className="text-[0.8rem] font-medium">On This Page</p>
      <nav className="scroll-fade-y mt-4 overflow-auto [--scroll-fade-reveal:24px]">
        <ul>
          {items.map((item) => (
            <TocLink key={item.url} item={item} activeId={activeId} />
          ))}
        </ul>
      </nav>
    </div>
  )
}
