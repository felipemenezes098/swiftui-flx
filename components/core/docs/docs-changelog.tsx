import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import {
  changelogEntryTitle,
  changelogHref,
  getComponentChangelog,
} from "@/lib/changelog"
import type { Platform } from "@/lib/docs"

export function DocsChangelog({
  platform,
  slug,
}: Readonly<{ platform: Platform; slug: string }>) {
  const items = getComponentChangelog(platform, slug)
  if (items.length === 0) return null

  return (
    <section>
      <h2 id="changelog" className="mt-14 scroll-m-20 text-base font-medium">
        Changelog
      </h2>
      <ul className="my-6 ml-6 list-disc">
        {items.map(({ entry, summary }) => (
          <li key={`${entry.slug}-${summary}`} className="mt-2 leading-7">
            <HoverPrefetchLink
              href={changelogHref(entry.slug)}
              className="font-medium text-primary underline underline-offset-4"
            >
              {changelogEntryTitle(entry)}
            </HoverPrefetchLink>
            : {summary}
          </li>
        ))}
      </ul>
    </section>
  )
}
