import { ArrowUpRight } from "lucide-react"

interface SidebarExternalLinkProps {
  href: string
  children: React.ReactNode
}

export function SidebarExternalLink({
  href,
  children,
}: Readonly<SidebarExternalLinkProps>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 py-1 text-sm text-muted-foreground hover:text-foreground"
    >
      {children}
      <ArrowUpRight className="size-3 opacity-60" aria-hidden />
    </a>
  )
}
