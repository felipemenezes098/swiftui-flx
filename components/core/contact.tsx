import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { Logo } from "./logo"

export function Contact() {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-3">
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.authorImage}
          alt={siteConfig.author}
          className="size-10 rounded-full bg-muted object-cover"
        />
        <div className="flex flex-col gap-0.5">
          <span className="text-sm">Need help? Contact me</span>
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-muted-foreground underline underline-offset-4"
          >
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={siteConfig.links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Logo.X data-icon="inline-start" className="size-3" />/ Twitter
        </Link>
        <Link
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Logo.Linkedin data-icon="inline-start" className="size-3" />
          LinkedIn
        </Link>
      </div>
    </div>
  )
}
