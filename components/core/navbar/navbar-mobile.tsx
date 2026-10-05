"use client"

import { AnimatePresence, motion } from "motion/react"
import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import * as React from "react"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/config/site"
import { usePlatform } from "@/hooks/use-platform"
import { getDocsNav } from "@/lib/docs"
import { getNavbarItems } from "@/lib/navbar"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"

import { DocsPlatformTabs } from "../docs/docs-platform-tabs"
import { Logo } from "../logo"
import { MobileNavSection } from "./mobile-nav-section"
import { SettingsDialog } from "../settings/settings-dialog"
import { ThemeSwitcher } from "./theme"
import { shellContainerClass, useUI } from "@/contexts/ui-context"

export function NavbarMobile() {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)
  const { shellWidth, hideNavbar } = useUI()
  const isWide = shellWidth === "wide"
  const platform = usePlatform()
  const sections = [
    {
      title: "Menu",
      items: getNavbarItems(platform).map((item) => ({
        title: item.name,
        href: item.href,
      })),
    },
    ...getDocsNav(platform).map((group) => ({
      title: group.title,
      items: group.items.filter((item) => !item.disabled),
    })),
  ]

  if (!isMobile && open) {
    setOpen(false)
  }

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header
        className="w-full overflow-hidden bg-background md:hidden"
        aria-label="Main navigation"
        aria-hidden={hideNavbar || undefined}
      >
        <div
          className={cn(
            shellContainerClass(shellWidth),
            isWide ? "py-3" : "px-5 py-3"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((prev) => !prev)}
              className="extend-touch-target flex h-8 touch-manipulation items-center justify-start gap-3 p-0"
            >
              <div className="relative flex h-8 w-4 items-center justify-center">
                <div className="relative mb-1 size-3">
                  <span
                    className={cn(
                      "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-300",
                      open ? "top-[0.4rem] -rotate-45" : "top-1"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-300",
                      open ? "top-[0.4rem] rotate-45" : "top-2.5"
                    )}
                  />
                </div>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: open ? 0 : 1 }}
                transition={{
                  duration: 0.5,
                  delay: open ? 0 : 0.15,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className={cn(
                  "flex items-center gap-2",
                  open && "pointer-events-none"
                )}
                aria-hidden={open}
              >
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
                <div className="flex items-center">
                  <Separator orientation="vertical" className="!h-4" />
                </div>
                <ThemeSwitcher />
                <div className="flex items-center">
                  <Separator orientation="vertical" className="!h-4" />
                </div>
                <SettingsDialog />
                <div className="flex items-center">
                  <Separator orientation="vertical" className="!h-4" />
                </div>
                <HoverPrefetchLink
                  href="/"
                  aria-label={siteConfig.name}
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "icon-sm",
                      className: "hover:bg-muted",
                    })
                  )}
                >
                  <Logo.Swift className="size-3.5 text-primary" />
                </HoverPrefetchLink>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.3,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="fixed inset-0 top-[3.5rem] z-[39] bg-background md:hidden"
              aria-hidden
            />
            <div
              key="mobile-panel-bg"
              className="fixed top-[2rem] right-0 bottom-0 left-0 z-40 overflow-hidden md:hidden"
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.32, 0.72, 0, 1],
                  delay: 0.1,
                }}
                style={{ transformOrigin: "top" }}
                className="h-full w-full bg-background"
              />
            </div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-panel-content"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 0.15,
                },
              },
            }}
            className="fixed top-[3.5rem] right-0 bottom-0 left-0 z-[41] overflow-auto px-5 pt-6 pb-6 md:hidden"
          >
            <div className="flex flex-col gap-10">
              <DocsPlatformTabs />
              {sections.map((section) => (
                <MobileNavSection
                  key={section.title}
                  title={section.title}
                  items={section.items}
                  onClose={() => setOpen(false)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
