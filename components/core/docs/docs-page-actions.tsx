import { ArrowLeft, ArrowRight } from "lucide-react"

import type { DocsNavItem } from "@/lib/docs"

import { DocsCopyPageButton } from "./docs-copy-page-button"
import { DocsPagerButton } from "./docs-pager-button"

export function DocsPageActions({
  markdownPath,
  previous,
  next,
}: Readonly<{
  markdownPath: string
  previous?: DocsNavItem
  next?: DocsNavItem
}>) {
  return (
    <div className="flex items-center gap-2">
      <DocsCopyPageButton markdownPath={markdownPath} />
      <DocsPagerButton item={previous} label="Previous" icon={<ArrowLeft />} />
      <DocsPagerButton item={next} label="Next" icon={<ArrowRight />} />
    </div>
  )
}
