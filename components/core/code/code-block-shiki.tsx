import { cn } from "@/lib/utils"

import { highlightCode, type HighlightCodeOptions } from "./shiki-highlighter"

type CodeBlockShikiProps = {
  code: string
  className?: string
} & HighlightCodeOptions

/**
 * Server-rendered Shiki output — an async Server Component, meant to be
 * dropped as `children` inside `CodeBlockContent`. Highlighting happens on
 * the server; nothing shiki-related ships to the client. Use
 * `CodeBlockShikiClient` instead if this needs to run inside a fully
 * client-rendered tree (no server round-trip available for the code).
 */
async function CodeBlockShiki({
  code,
  className,
  ...options
}: CodeBlockShikiProps) {
  const html = await highlightCode(code, options)

  return (
    <div
      className={cn("w-full", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export { CodeBlockShiki }
export type { CodeBlockShikiProps }
