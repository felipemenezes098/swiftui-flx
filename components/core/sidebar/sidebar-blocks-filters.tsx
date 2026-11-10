"use client"

import { usePathname } from "next/navigation"

import { useLocationHash } from "@/hooks/use-location-hash"
import { blockCategories } from "@/lib/blocks"

import { SidebarLink } from "./sidebar-link"
import { SidebarPlatformSwitch } from "./sidebar-platform-switch"
import { SidebarSection } from "./sidebar-section"

export function SidebarBlocksFilters() {
  const pathname = usePathname()
  const hash = useLocationHash()

  if (pathname !== "/blocks") return null

  return (
    <div className="flex flex-col gap-8">
      <SidebarPlatformSwitch />
      <SidebarSection label="Categories">
        {blockCategories.map((category) => (
          <SidebarLink
            key={category.id}
            href={`/blocks#${category.id}`}
            active={hash === category.id}
          >
            {category.name}
          </SidebarLink>
        ))}
      </SidebarSection>
    </div>
  )
}
