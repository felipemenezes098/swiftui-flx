import type { Metadata } from "next"

import { DocsPageActions } from "@/components/core/docs/docs-page-actions"
import { DocsToc } from "@/components/core/docs/docs-toc"
import { getDocMarkdown } from "@/lib/markdown"
import { getDocsPager } from "@/lib/docs"
import { createDocTitle, createPageMetadata } from "@/lib/metadata"
import { getDocToc } from "@/lib/toc"
import { useMDXComponents as getMDXComponents } from "@/mdx-components"

export const metadata: Metadata = createPageMetadata({
  title: createDocTitle("Presets"),
  imageTitle: "Presets",
  description:
    "Theme presets that set the colors and radius of every component.",
  path: "/docs/presets",
})

export default async function PresetsPage() {
  const [mod, toc, markdown] = await Promise.all([
    import("@/app/content/presets.mdx"),
    getDocToc("presets"),
    getDocMarkdown("presets"),
  ])
  const Content = mod.default
  const { previous, next } = getDocsPager("/docs/presets")
  const components = {
    ...getMDXComponents({}),
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
