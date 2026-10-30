import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"

import { Logo } from "@/components/core/logo"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { defaultPlatform, firstComponentHref } from "@/lib/docs"
import { cn } from "@/lib/utils"

import { LatestChangelogLink } from "./latest-changelog-link"

export function HeroSection() {
  return (
    <section className="flex max-w-xl flex-col items-start gap-3">
      <LatestChangelogLink />
      <h1 className="text-base font-medium">
        SwiftUI components you paste and own.
      </h1>
      <p className="text-base leading-relaxed text-pretty text-muted-foreground">
        Open source components for iPhone, iPad and Mac, the shadcn/ui way. Copy
        the code and it&apos;s yours: style it, extend it, ship it.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <HoverPrefetchLink
          href={firstComponentHref(defaultPlatform)}
          className={cn(buttonVariants({ className: "rounded-full px-4" }))}
        >
          Components
        </HoverPrefetchLink>
        <HoverPrefetchLink
          href={siteConfig.links.github}
          target="_blank"
          className={cn(
            buttonVariants({
              variant: "outline",
              className: "gap-1.5 rounded-full px-4",
            })
          )}
        >
          <Logo.Github className="size-4" />
          Star on GitHub
        </HoverPrefetchLink>
      </div>
    </section>
  )
}
