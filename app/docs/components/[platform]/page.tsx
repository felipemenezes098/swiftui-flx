import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { HoverPrefetchLink } from "@/components/core/hover-prefetch-link"
import { DocsPageActions } from "@/components/core/docs/docs-page-actions"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
  componentHref,
  componentsHref,
  getComponentDocs,
  getComponentsDescription,
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
    title: createDocTitle(`${name} Components`),
    imageTitle: `${name} Components`,
    description: getComponentsDescription(platform),
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
          <h1 className="text-3xl font-bold tracking-tight">
            {name} Components
          </h1>
          <DocsPageActions
            markdown={markdown}
            previous={previous}
            next={next}
          />
        </div>
        <p className="text-muted-foreground">{description}</p>
        {note && <p className="text-sm text-muted-foreground">{note}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {docs.map((doc) => (
          <HoverPrefetchLink
            key={doc.slug}
            href={componentHref(platform, doc.slug)}
          >
            <Card className="h-full transition-none hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{doc.name}</CardTitle>
              </CardHeader>
            </Card>
          </HoverPrefetchLink>
        ))}
      </div>
    </div>
  )
}
