import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsHeader } from "@/components/core/docs/docs-header"
import { DocsPageActions } from "@/components/core/docs/docs-page-actions"
import { DocsToc } from "@/components/core/docs/docs-toc"
import {
  changelogEntryTitle,
  changelogHref,
  getChangelogEntries,
  getChangelogEntry,
} from "@/lib/changelog"
import { getChangelogMarkdown } from "@/lib/markdown"
import { createDocTitle, createPageMetadata } from "@/lib/metadata"
import { getDocToc } from "@/lib/toc"
import { useMDXComponents as getMDXComponents } from "@/mdx-components"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getChangelogEntries().map((entry) => ({ slug: entry.slug }))
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { slug } = await params
  const entry = getChangelogEntry(slug)
  if (!entry) return {}

  return createPageMetadata({
    title: createDocTitle(changelogEntryTitle(entry)),
    imageTitle: entry.title,
    description: entry.description,
    path: changelogHref(entry.slug),
  })
}

export default async function ChangelogEntryPage({ params }: Readonly<Props>) {
  const { slug } = await params
  const entry = getChangelogEntry(slug)
  if (!entry) notFound()

  const [mod, toc, markdown] = await Promise.all([
    import(`@/app/content/changelog/${slug}.mdx`),
    getDocToc(`changelog/${slug}`),
    getChangelogMarkdown(slug),
  ])
  const Content = mod.default
  const components = getMDXComponents({})
  const Title = components.h1 as React.ComponentType<{
    children: React.ReactNode
  }>

  return (
    <div className="flex w-full gap-10">
      <article className="mx-auto max-w-[50rem] min-w-0 flex-1">
        <DocsHeader>
          <Title>{changelogEntryTitle(entry)}</Title>
          <DocsPageActions markdown={markdown ?? ""} />
        </DocsHeader>
        <div className="mt-6">
          <Content components={components} />
        </div>
      </article>
      <DocsToc items={toc} className="xl:block" />
    </div>
  )
}
