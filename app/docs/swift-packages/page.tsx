import type { Metadata } from "next"

import { DocsPageActions } from "@/components/core/docs/docs-page-actions"
import { DocsToc } from "@/components/core/docs/docs-toc"
import { getDocMarkdown } from "@/lib/markdown"
import { getDocsPager } from "@/lib/docs"
import { createDocTitle, createPageMetadata } from "@/lib/metadata"
import { getDocToc } from "@/lib/toc"
import { useMDXComponents as getMDXComponents } from "@/mdx-components"

export const metadata: Metadata = createPageMetadata({
  title: createDocTitle("Swift Packages"),
  imageTitle: "Swift Packages",
  description:
    "Keep the design system in its own Swift package and use it from your app and your other packages.",
  path: "/docs/swift-packages",
})

export default async function SwiftPackagesPage() {
  const [mod, toc, markdown] = await Promise.all([
    import("@/app/content/swift-packages.mdx"),
    getDocToc("swift-packages"),
    getDocMarkdown("swift-packages"),
  ])
  const Content = mod.default
  const { previous, next } = getDocsPager("/docs/swift-packages")
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
