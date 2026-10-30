"use client"

import { ArrowUpRight } from "lucide-react"
import { usePathname } from "next/navigation"

import { usePlatform } from "@/hooks/use-platform"
import { getDocsNav } from "@/lib/docs"

import { SidebarLink } from "./sidebar-link"
import { SidebarPlatformSwitch } from "./sidebar-platform-switch"
import { SidebarSection } from "./sidebar-section"

export function SidebarDocsNav() {
  const pathname = usePathname()
  const platform = usePlatform()

  if (!pathname.startsWith("/docs")) return null

  return (
    <div className="flex flex-col gap-8">
      <SidebarPlatformSwitch />
      {getDocsNav(platform).map((group) => (
        <SidebarSection key={group.title} label={group.title}>
          {group.items.map((item) => (
            <div key={item.href} className="flex flex-col">
              {item.external && (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 py-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.title}
                  <ArrowUpRight className="size-3 opacity-60" aria-hidden />
                </a>
              )}
              {!item.external && (
                <SidebarLink href={item.href} active={pathname === item.href}>
                  {item.title}
                </SidebarLink>
              )}
            </div>
          ))}
        </SidebarSection>
      ))}
    </div>
  )
}
