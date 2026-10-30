import { firstComponentHref, type Platform } from "@/lib/docs"

export function getNavbarItems(platform: Platform) {
  return [
    {
      name: "Home",
      href: "/",
      match: "/",
    },
    {
      name: "Docs",
      href: "/docs/installation",
      match: "/docs",
    },
    {
      name: "Components",
      href: firstComponentHref(platform),
      match: "/docs/components",
    },
    {
      name: "Blocks",
      href: "/blocks",
      match: "/blocks",
    },
    {
      name: "Me",
      href: "/me",
      match: "/me",
    },
  ]
}

export function getActiveNavbarHref(
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
