import type { Metadata } from "next"

import { DocsPageActions } from "@/components/core/docs/docs-page-actions"
import { DocsToc } from "@/components/core/docs/docs-toc"
import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import {
  changelogEntryTitle,
  changelogFeaturedCount,
  changelogHref,
  formatChangelogMonth,
  getChangelogEntries,
  type ChangelogEntry,
} from "@/lib/changelog"
import { getDocsPager } from "@/lib/docs"
import { getChangelogIndexMarkdown } from "@/lib/markdown"
import { createDocTitle, createPageMetadata } from "@/lib/metadata"
import { useMDXComponents as getMDXComponents } from "@/mdx-components"

const description = "Latest updates and announcements."

export const metadata: Metadata = createPageMetadata({
  title: createDocTitle("Changelog"),
  imageTitle: "Changelog",
  description,
  path: changelogHref(),
})

function groupByMonth(entries: ChangelogEntry[]) {
  const groups = new Map<string, ChangelogEntry[]>()
  for (const entry of entries) {
    const month = formatChangelogMonth(entry.date)
    groups.set(month, [...(groups.get(month) ?? []), entry])
  }
  return [...groups.entries()]
}

export default async function ChangelogPage() {
  const entries = getChangelogEntries()
  const featured = entries.slice(0, changelogFeaturedCount)
  const older = groupByMonth(entries.slice(changelogFeaturedCount))
  const contents = await Promise.all(
    featured.map((entry) => import(`@/app/content/changelog/${entry.slug}.mdx`))
  )
  const components = getMDXComponents({})
  const { previous, next } = getDocsPager(changelogHref())
  const toc = featured.map((entry) => ({
    title: changelogEntryTitle(entry),
    url: `#${entry.slug}`,
  }))
  if (older.length > 0) {
    toc.push({ title: "More Updates", url: "#more-updates" })
  }

  return (
    <div className="flex w-full gap-10">
      <article className="mx-auto max-w-[50rem] min-w-0 flex-1">
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight">
            Changelog
          </h1>
          <DocsPageActions
            markdown={getChangelogIndexMarkdown()}
            previous={previous}
            next={next}
          />
        </div>
        <p className="mt-4 leading-7 text-muted-foreground">{description}</p>
        {featured.map((entry, index) => {
          const Content = contents[index].default
          return (
            <section
              key={entry.slug}
              className="mt-12 border-t pt-12 first-of-type:border-t-0 first-of-type:pt-0"
            >
              <h2
                id={entry.slug}
                className="scroll-m-20 text-xl font-medium tracking-tight"
              >
                <HoverPrefetchLink
                  href={changelogHref(entry.slug)}
                  className="hover:underline hover:underline-offset-4"
                >
                  {changelogEntryTitle(entry)}
                </HoverPrefetchLink>
              </h2>
              <div className="mt-6">
                <Content components={components} />
              </div>
            </section>
          )
        })}
        {older.length > 0 && (
          <section className="mt-12 border-t pt-12">
            <h2
              id="more-updates"
              className="scroll-m-20 text-xl font-medium tracking-tight"
            >
              More Updates
            </h2>
            {older.map(([month, items]) => (
              <div key={month} className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {month}
                </h3>
                <ul className="mt-3 flex flex-col gap-2">
                  {items.map((entry) => (
                    <li key={entry.slug}>
                      <HoverPrefetchLink
                        href={changelogHref(entry.slug)}
                        className="font-medium underline-offset-4 hover:underline"
                      >
                        {entry.title}
                      </HoverPrefetchLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </article>
      <DocsToc items={toc} className="xl:block" />
    </div>
  )
}
