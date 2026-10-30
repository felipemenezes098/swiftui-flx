import { ArrowRight } from "lucide-react"

import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { changelogHref, getChangelogEntries } from "@/lib/changelog"

export function LatestChangelogLink() {
  const [latest] = getChangelogEntries()
  if (!latest) return null

  return (
    <HoverPrefetchLink
      href={`${changelogHref()}#${latest.slug}`}
      className="group mb-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      {latest.title}
      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
    </HoverPrefetchLink>
  )
}
