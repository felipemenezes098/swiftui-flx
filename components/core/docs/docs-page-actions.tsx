import { ArrowLeft, ArrowRight } from "lucide-react"

import { CopyButton } from "@/components/core/copy-button"
import type { DocsNavItem } from "@/lib/docs"

import { DocsPagerButton } from "./docs-pager-button"

export function DocsPageActions({
  markdown,
  previous,
  next,
}: Readonly<{
  markdown: string
  previous?: DocsNavItem
  next?: DocsNavItem
}>) {
  return (
    <div className="flex items-center gap-2">
      <CopyButton
        content={markdown}
        label="Copy Page"
        variant="secondary"
        size="default"
      />
      <DocsPagerButton item={previous} label="Previous" icon={<ArrowLeft />} />
      <DocsPagerButton item={next} label="Next" icon={<ArrowRight />} />
    </div>
  )
}
