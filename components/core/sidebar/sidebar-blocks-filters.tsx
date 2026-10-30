"use client"

import { usePathname } from "next/navigation"

import { SidebarLink } from "./sidebar-link"
import { SidebarPlatformSwitch } from "./sidebar-platform-switch"
import { SidebarSection } from "./sidebar-section"

export function SidebarBlocksFilters() {
  const pathname = usePathname()

  if (pathname !== "/blocks") return null

  return (
    <div className="flex flex-col gap-8">
      <SidebarPlatformSwitch />
      <SidebarSection label="Categories">
        <SidebarLink href="/blocks" active>
          Authentication
        </SidebarLink>
      </SidebarSection>
    </div>
  )
}
