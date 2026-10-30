import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { Logo } from "@/components/core/logo"
import { siteConfig } from "@/config/site"

export function SidebarLogo() {
  return (
    <HoverPrefetchLink
      href="/"
      aria-label={siteConfig.name}
      className="flex size-6 shrink-0 items-center justify-center self-start rounded-md bg-foreground"
    >
      <Logo.Swift className="size-3.5 text-background" />
    </HoverPrefetchLink>
  )
}
