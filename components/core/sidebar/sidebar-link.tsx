import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { cn } from "@/lib/utils"

interface SidebarLinkProps {
  href: string
  active: boolean
  children: React.ReactNode
}

export function SidebarLink({
  href,
  active,
  children,
}: Readonly<SidebarLinkProps>) {
  const className = cn(
    "py-1 text-sm hover:text-foreground",
    active && "text-foreground",
    !active && "text-muted-foreground"
  )
  const ariaCurrent = (active && "page") || undefined

  if (href.includes("#")) {
    return (
      <a href={href} aria-current={ariaCurrent} className={className}>
        {children}
      </a>
    )
  }

  return (
    <HoverPrefetchLink
      href={href}
      aria-current={ariaCurrent}
      className={className}
    >
      {children}
    </HoverPrefetchLink>
  )
}
