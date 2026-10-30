"use client"

import { usePathname } from "next/navigation"

import { usePlatform } from "@/hooks/use-platform"
import { getActiveNavbarHref, getNavbarItems } from "@/lib/navbar"

import { SidebarExternalLink } from "./sidebar-external-link"
import { SidebarLink } from "./sidebar-link"

export function SidebarNav() {
  const pathname = usePathname()
  const items = getNavbarItems(usePlatform())
  const activeHref = getActiveNavbarHref(pathname, items)

  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((item) => (
        <SidebarLink
          key={item.name}
          href={item.href}
          active={activeHref === item.match}
        >
          {item.name}
        </SidebarLink>
      ))}
      <SidebarExternalLink href="https://ui.flexnative.com/">
        Web
      </SidebarExternalLink>
    </nav>
  )
}
