import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"

const linkClassName =
  "text-foreground hover:text-foreground/80 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

export function MobileLink({
  href,
  external,
  onClose,
  children,
}: Readonly<{
  href: string
  external?: boolean
  onClose: () => void
  children: React.ReactNode
}>) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className={linkClassName}
      >
        {children}
      </a>
    )
  }

  return (
    <HoverPrefetchLink href={href} onClick={onClose} className={linkClassName}>
      {children}
    </HoverPrefetchLink>
  )
}
