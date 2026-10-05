"use client"

import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import { usePlatform } from "@/hooks/use-platform"
import { getNavbarItems } from "@/lib/navbar"
import { cn } from "@/lib/utils"

import { Logo } from "../logo"
import { GlobalSearch } from "./global-search"
import { SettingsDialog } from "../settings/settings-dialog"
import { ThemeSwitcher } from "./theme"
import { shellContainerClass, useUI } from "@/contexts/ui-context"

function getActiveNavbarHref(
  pathname: string,
  items: ReturnType<typeof getNavbarItems>
) {
  let activeHref: string | undefined
  for (const item of items) {
    const matches =
      pathname === item.match || pathname.startsWith(`${item.match}/`)
    if (matches && (!activeHref || item.match.length > activeHref.length)) {
      activeHref = item.match
    }
  }
  return activeHref
}

export function NavbarDesktop() {
  const pathname = usePathname()
  const navbarItems = getNavbarItems(usePlatform())
  const activeHref = getActiveNavbarHref(pathname, navbarItems)
  const { shellWidth, hideNavbar } = useUI()
  const isWide = shellWidth === "wide"

  return (
    <header
      className="hidden w-full bg-background md:block"
      aria-label="Main navigation"
      aria-hidden={hideNavbar || undefined}
    >
      <div
        className={cn(
          shellContainerClass(shellWidth),
          !isWide && "container-page-inner",
          "py-3!"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <nav className="flex min-w-0 flex-1 items-center gap-1 text-sm">
            <HoverPrefetchLink
              href="/"
              aria-label={siteConfig.name}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "icon-sm",
                  className: "shrink-0 hover:bg-muted",
                })
              )}
            >
              <Logo.Swift className="size-3.5 text-primary" />
            </HoverPrefetchLink>
            <div className="no-scrollbar hidden min-w-0 flex-1 overflow-x-auto py-1 md:flex">
              <div className="inline-flex w-max flex-nowrap gap-1 first:ml-0.5 last:mr-0.5">
                {navbarItems.map((item) => (
                  <HoverPrefetchLink
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "shrink-0 rounded-lg px-2 py-1 text-sm font-medium hover:bg-muted dark:hover:bg-muted/50",
                      activeHref === item.match && "bg-muted dark:bg-muted/50"
                    )}
                  >
                    {item.name}
                  </HoverPrefetchLink>
                ))}
              </div>
            </div>
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <GlobalSearch />
            <div className="flex items-center gap-1">
              <HoverPrefetchLink
                href={siteConfig.links.twitter}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 transition-none",
                  })
                )}
              >
                <Logo.X className="size-3" />
              </HoverPrefetchLink>
              <HoverPrefetchLink
                href={siteConfig.links.github}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 transition-none",
                  })
                )}
              >
                <Logo.Github className="size-4" />
              </HoverPrefetchLink>
            </div>
            <div className="flex items-center">
              <Separator orientation="vertical" className="!h-4" />
            </div>
            <ThemeSwitcher />
            <div className="flex items-center">
              <Separator orientation="vertical" className="!h-4" />
            </div>
            <SettingsDialog />
          </div>
        </div>
      </div>
    </header>
  )
}
