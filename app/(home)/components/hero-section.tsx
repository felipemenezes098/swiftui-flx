import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"

import { Logo } from "@/components/core/logo"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { defaultPlatform, firstComponentHref } from "@/lib/docs"
import { cn } from "@/lib/utils"

import { LatestChangelogLink } from "./latest-changelog-link"

export function HeroSection() {
  return (
    <section className="grid gap-5 pt-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-end lg:gap-6">
      <div className="flex flex-col items-start gap-5">
        <LatestChangelogLink />
        <h1 className="max-w-xl text-3xl font-medium tracking-tight text-balance sm:text-[2.125rem]">
          SwiftUI components you paste and own.
        </h1>
      </div>

      <div className="flex flex-col items-start gap-5">
        <p className="max-w-xl text-balance text-muted-foreground">
          Open source components for iPhone, iPad and Mac, the shadcn/ui way.
          Copy the code and it&apos;s yours: style it, extend it, ship it.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <HoverPrefetchLink
            href={firstComponentHref(defaultPlatform)}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Components
          </HoverPrefetchLink>
          <HoverPrefetchLink
            href={siteConfig.links.github}
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
                className: "gap-1.5",
              })
            )}
          >
            <Logo.Github className="size-4" />
            Star on GitHub
          </HoverPrefetchLink>
        </div>
      </div>
    </section>
  )
}
