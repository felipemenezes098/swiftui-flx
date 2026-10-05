"use client"

import { usePathname } from "next/navigation"

import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePlatform } from "@/hooks/use-platform"
import { getDocsNav } from "@/lib/docs"

import { DocsPlatformTabs } from "./docs-platform-tabs"

export function DocsSidebar() {
  const pathname = usePathname()
  const platform = usePlatform()

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-20 hidden h-[calc(100vh-11rem)] w-56 shrink-0 border-r border-border bg-transparent p-0 md:flex"
    >
      <DocsPlatformTabs className="mb-3 pr-5" />
      <SidebarContent className="scroll-fade-y overscroll-none [--scroll-fade-reveal:24px]">
        {getDocsNav(platform).map((group) => (
          <SidebarGroup key={group.title} className="pr-5">
            <SidebarGroupLabel className="font-medium text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    {item.disabled && (
                      <SidebarMenuButton
                        disabled
                        className="text-[0.8rem] font-medium text-muted-foreground"
                      >
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                    {item.external && (
                      <SidebarMenuButton
                        render={
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        }
                        className="text-[0.8rem] font-medium"
                      >
                        {item.title}
                      </SidebarMenuButton>
                    )}
                    {!item.disabled && !item.external && (
                      <SidebarMenuButton
                        render={<HoverPrefetchLink href={item.href} />}
                        isActive={pathname === item.href}
                        className="text-[0.8rem] font-medium"
                      >
                        {item.title}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
