"use client"

import { CopyButton } from "@/components/core/copy-button"

async function fetchMarkdown(url: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Failed to load ${url}`)
  return response.text()
}

export function DocsCopyPageButton({
  markdownPath,
}: Readonly<{ markdownPath: string }>) {
  return (
    <CopyButton
      content={() => fetchMarkdown(`/docs/${markdownPath}.md`)}
      label="Copy Page"
      variant="secondary"
      size="default"
    />
  )
}
