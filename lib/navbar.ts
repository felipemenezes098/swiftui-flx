import { firstComponentHref, type Platform } from "@/lib/docs"

export function getNavbarItems(platform: Platform) {
  return [
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
      name: "Me",
      href: "/me",
      match: "/me",
    },
  ]
}
