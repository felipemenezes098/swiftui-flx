import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { DocsPageActions } from "@/components/core/docs/docs-page-actions"
import {
  componentHref,
  componentsHref,
  getComponentDocs,
  getComponentsDescription,
  getComponentsMetaDescription,
  getComponentsNote,
  getDocsPager,
  getPlatformInfo,
  isPlatform,
  platforms,
} from "@/lib/docs"
import { getComponentsIndexMarkdown } from "@/lib/markdown"
import { createDocTitle, createPageMetadata } from "@/lib/metadata"

type Props = {
  params: Promise<{ platform: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return platforms.map((platform) => ({ platform: platform.id }))
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { platform } = await params
  if (!isPlatform(platform)) return {}
  const name = getPlatformInfo(platform).name

  return createPageMetadata({
    title: createDocTitle(`SwiftUI Components for ${name}`),
    imageTitle: `${name} Components`,
    description: getComponentsMetaDescription(platform),
    path: componentsHref(platform),
  })
}

export default async function ComponentsIndexPage({ params }: Readonly<Props>) {
  const { platform } = await params
  if (!isPlatform(platform)) notFound()

  const docs = getComponentDocs(platform)
  const name = getPlatformInfo(platform).name
  const description = getComponentsDescription(platform)
  const note = getComponentsNote(platform)
  const { previous, next } = getDocsPager(componentsHref(platform), platform)
  const markdown = getComponentsIndexMarkdown(platform)

  return (
    <div className="mx-auto flex w-full max-w-[50rem] flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <h1 className="text-base font-medium">{name} Components</h1>
          <DocsPageActions
            markdown={markdown}
            previous={previous}
            next={next}
          />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        {note && <p className="text-sm text-muted-foreground">{note}</p>}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {docs.map((doc) => (
          <HoverPrefetchLink
            key={doc.slug}
            href={componentHref(platform, doc.slug)}
          >
            <span className="block rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-muted/50">
              {doc.name}
            </span>
          </HoverPrefetchLink>
        ))}
      </div>
    </div>
  )
}
