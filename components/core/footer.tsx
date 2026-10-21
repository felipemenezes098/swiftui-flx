"use client"

import Link from "next/link"

import { Logo } from "@/components/core/logo"
import { siteConfig } from "@/config/site"
import { shellContainerClass, useUI } from "@/contexts/ui-context"
import { cn } from "@/lib/utils"

const socials = [
  {
    name: "GitHub",
    href: siteConfig.links.github,
    Icon: Logo.Github,
    size: "size-4",
  },
  { name: "X", href: siteConfig.links.twitter, Icon: Logo.X, size: "size-3.5" },
]

export function Footer() {
  const { shellWidth } = useUI()

  return (
    <footer
      className={cn(
        shellContainerClass(shellWidth),
        shellWidth !== "wide" && "container-page-inner",
        "flex items-center justify-center gap-4 pt-10! pb-6! text-sm text-muted-foreground"
      )}
    >
      <Link
        href={siteConfig.links.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-foreground"
      >
        Built by {siteConfig.author}
      </Link>

      <span aria-hidden className="h-3.5 w-px bg-border" />

      <div className="flex items-center gap-4">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className="transition-colors hover:text-foreground"
          >
            <social.Icon className={social.size} />
          </Link>
        ))}
      </div>
    </footer>
  )
}
