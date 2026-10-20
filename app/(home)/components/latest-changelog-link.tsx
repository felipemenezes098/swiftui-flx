import { ArrowRight } from "lucide-react"

import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { changelogHref, getChangelogEntries } from "@/lib/changelog"

export function LatestChangelogLink() {
  const [latest] = getChangelogEntries()
  if (!latest) return null

  return (
    <HoverPrefetchLink
      href={`${changelogHref()}#${latest.slug}`}
      className="group inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm font-medium transition-colors hover:bg-muted/70"
    >
      {latest.title}
      <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </HoverPrefetchLink>
  )
}
