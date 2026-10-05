import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { Button, buttonVariants } from "@/components/ui/button"
import type { DocsNavItem } from "@/lib/docs"

export function DocsPagerButton({
  item,
  label,
  icon,
}: Readonly<{
  item?: DocsNavItem
  label: string
  icon: React.ReactNode
}>) {
  if (!item) {
    return (
      <Button variant="secondary" size="icon" disabled aria-label={label}>
        {icon}
      </Button>
    )
  }

  return (
    <HoverPrefetchLink
      href={item.href}
      aria-label={`${label}: ${item.title}`}
      className={buttonVariants({ variant: "secondary", size: "icon" })}
    >
      {icon}
    </HoverPrefetchLink>
  )
}
