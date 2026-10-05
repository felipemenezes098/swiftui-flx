import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ComponentPreview } from "@/components/core/docs/component-preview"
import { ComponentPreviewCode } from "@/components/core/docs/component-preview-code"
import { DocsAvailability } from "@/components/core/docs/docs-availability"
import { DocsPageActions } from "@/components/core/docs/docs-page-actions"
import { DocsToc } from "@/components/core/docs/docs-toc"
import {
  componentHref,
  getComponentDoc,
  getComponentDocs,
  getDocsPager,
  getPlatformInfo,
  isPlatform,
  platforms,
} from "@/lib/docs"
import { getDocMarkdown } from "@/lib/markdown"
import { createDocTitle, createPageMetadata } from "@/lib/metadata"
import { getDocToc } from "@/lib/toc"
import { cn } from "@/lib/utils"
import { useMDXComponents as getMDXComponents } from "@/mdx-components"

type Props = {
  params: Promise<{ platform: string; slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return platforms.flatMap((platform) =>
    getComponentDocs(platform.id).map((doc) => ({
      platform: platform.id,
      slug: doc.slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: Readonly<Props>): Promise<Metadata> {
  const { platform, slug } = await params
  if (!isPlatform(platform)) return {}
  const doc = getComponentDoc(platform, slug)
  if (!doc) return {}

  return createPageMetadata({
    title: createDocTitle(`${doc.name} for ${getPlatformInfo(platform).name}`),
    imageTitle: doc.name,
    description: doc.description,
    path: componentHref(platform, doc.slug),
  })
}

export default async function ComponentDocPage({ params }: Readonly<Props>) {
  const { platform, slug } = await params
  if (!isPlatform(platform)) notFound()
  const doc = getComponentDoc(platform, slug)
  if (!doc) notFound()

  const contentPath = `components/${platform}/${slug}`
  const [mod, toc, markdown] = await Promise.all([
    import(`@/app/content/components/${platform}/${slug}.mdx`),
    getDocToc(contentPath),
    getDocMarkdown(contentPath),
  ])
  const Content = mod.default
  const { previous, next } = getDocsPager(
    componentHref(platform, slug),
    platform
  )
  const components = {
    ...getMDXComponents({}),
    ComponentPreview: (
      props: React.ComponentProps<typeof ComponentPreview>
    ) => (
      <ComponentPreview
        {...props}
        platform={platform}
        className={cn("mt-6 first:mt-0", props.className)}
      />
    ),
    ComponentPreviewCode: (
      props: React.ComponentProps<typeof ComponentPreviewCode>
    ) => (
      <ComponentPreviewCode
        {...props}
        platform={platform}
        className={cn("mt-6 first:mt-0", props.className)}
      />
    ),
    DocsAvailability: () => (
      <DocsAvailability platform={platform} slug={slug} />
    ),
    DocsPageActions: () => (
      <DocsPageActions markdown={markdown} previous={previous} next={next} />
    ),
  }

  return (
    <div className="flex w-full gap-10">
      <article className="mx-auto max-w-[50rem] min-w-0 flex-1">
        <Content components={components} />
      </article>
      <DocsToc items={toc} className="xl:block" />
    </div>
  )
}
