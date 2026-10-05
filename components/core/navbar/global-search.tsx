"use client"

import { flushSync } from "react-dom"
import { usePathname, useRouter } from "next/navigation"
import {
  ArrowDown,
  ArrowUp,
  BookOpen,
  Component,
  CornerDownLeft,
  Search,
} from "lucide-react"
import { useCallback, useState } from "react"
import type { Platform } from "@/lib/docs"
import { useHotkeys } from "react-hotkeys-hook"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Kbd } from "@/components/ui/kbd"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConfig } from "@/hooks/use-config"
import { usePlatform } from "@/hooks/use-platform"
import {
  componentHref,
  getComponentDocs,
  getDocsNav,
  getPlatformInfo,
  isPlatform,
  platforms,
} from "@/lib/docs"
import { cn } from "@/lib/utils"

export function GlobalSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [config, setConfig] = useConfig()
  const currentPlatform = usePlatform()
  const [platform, setPlatform] = useState<Platform>(currentPlatform)
  const [syncedPlatform, setSyncedPlatform] = useState(currentPlatform)
  if (syncedPlatform !== currentPlatform) {
    setSyncedPlatform(currentPlatform)
    setPlatform(currentPlatform)
  }
  const gettingStarted = getDocsNav(platform)[0].items.filter(
    (item) => !item.disabled
  )
  const components = getComponentDocs(platform).toSorted((a, b) =>
    a.name.localeCompare(b.name)
  )

  const toggle = useCallback(() => setOpen((prev) => !prev), [])

  const selectPlatform = (value: string) => {
    if (!isPlatform(value)) return
    setPlatform(value)
    setConfig({ ...config, platform: value })
  }

  useHotkeys("f", toggle, { preventDefault: true }, [toggle])
  useHotkeys("ctrl+f", toggle, { preventDefault: true }, [toggle])

  const navigate = useCallback(
    (href: string) => {
      flushSync(() => setOpen(false))

      const [path, hash] = href.split("#")
      if (hash && path === pathname) {
        globalThis.location.hash = hash
        return
      }
      router.push(href)
    },
    [router, pathname]
  )

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className={cn(
          "hidden h-8 w-48 justify-start gap-2 text-muted-foreground md:flex",
          open && "pointer-events-none opacity-80"
        )}
      >
        <Search data-icon="inline-start" />
        <span className="truncate">Search…</span>
        <CommandShortcut className="ml-auto">F</CommandShortcut>
      </Button>

      <CommandDialog
        open={open}
        modal={false}
        className="top-1/5 shadow-lg sm:max-w-sm"
        onOpenChange={setOpen}
        title="Global search"
        description="Search docs and components"
      >
        <Command>
          <CommandInput placeholder="Search docs and components…" />
          <Tabs
            value={platform}
            onValueChange={(value) => selectPlatform(String(value))}
            className="px-1 pt-2"
          >
            <TabsList className="w-full">
              {platforms.map((item) => (
                <TabsTrigger key={item.id} value={item.id} className="text-xs">
                  {item.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <CommandList className="2xl:max-h-80">
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Get Started">
              {gettingStarted.map((item) => (
                <CommandItem
                  key={item.href}
                  className="h-9"
                  value={`docs ${item.title}`}
                  onSelect={() => navigate(item.href)}
                >
                  <BookOpen className="size-4 shrink-0 opacity-60" />
                  <span className="truncate">{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup
              heading={`${getPlatformInfo(platform).name} Components`}
            >
              {components.map((doc) => (
                <CommandItem
                  key={doc.slug}
                  className="h-9"
                  value={`component ${doc.name}`}
                  onSelect={() => navigate(componentHref(platform, doc.slug))}
                >
                  <Component className="size-4 shrink-0 opacity-60" />
                  <span className="truncate">{doc.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center gap-4 border-t px-3 py-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Kbd>
                <ArrowUp />
              </Kbd>
              <Kbd>
                <ArrowDown />
              </Kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>
                <CornerDownLeft />
              </Kbd>
              Open
            </span>
            <span className="flex items-center gap-1.5">
              <Kbd>Esc</Kbd>
              Close
            </span>
          </div>
        </Command>
      </CommandDialog>
    </>
  )
}
