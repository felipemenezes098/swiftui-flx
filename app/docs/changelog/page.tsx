import type { Metadata } from "next"

import { DocsPageActions } from "@/components/core/docs/docs-page-actions"
import { DocsToc } from "@/components/core/docs/docs-toc"
import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  changelogEntryTitle,
  changelogFeaturedCount,
  changelogHref,
  formatChangelogMonth,
  getChangelogEntries,
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

export default async function ChangelogPage() {
  const entries = getChangelogEntries()
  const featured = entries.slice(0, changelogFeaturedCount)
  const older = entries.slice(changelogFeaturedCount)
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
    toc.push({ title: "Other Updates", url: "#other-updates" })
  }

  return (
    <div className="flex w-full gap-10">
      <article className="mx-auto max-w-[50rem] min-w-0 flex-1">
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <h1 className="scroll-m-20 text-base font-medium">Changelog</h1>
          <DocsPageActions
            markdown={getChangelogIndexMarkdown()}
            previous={previous}
            next={next}
          />
        </div>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {description}
        </p>
        {featured.map((entry, index) => {
          const Content = contents[index].default
          return (
            <section
              key={entry.slug}
              className="mt-12 border-t pt-12 first-of-type:border-t-0 first-of-type:pt-0"
            >
              <h2 id={entry.slug} className="scroll-m-20 text-base font-medium">
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
              id="other-updates"
              className="scroll-m-20 text-base font-medium"
            >
              Other Updates
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {older.map((entry) => (
                <HoverPrefetchLink
                  key={entry.slug}
                  href={changelogHref(entry.slug)}
                >
                  <Card className="h-full transition-none hover:bg-muted/50">
                    <CardHeader>
                      <CardDescription>
                        {formatChangelogMonth(entry.date)}
                      </CardDescription>
                      <CardTitle>{entry.title}</CardTitle>
                    </CardHeader>
                  </Card>
                </HoverPrefetchLink>
              ))}
            </div>
          </section>
        )}
      </article>
      <DocsToc items={toc} className="xl:block" />
    </div>
  )
}
