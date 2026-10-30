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
  return (
    <HoverPrefetchLink
      href={href}
      aria-current={(active && "page") || undefined}
      className={cn(
        "py-1 text-sm hover:text-foreground",
        active && "text-foreground",
        !active && "text-muted-foreground"
      )}
    >
      {children}
    </HoverPrefetchLink>
  )
}
