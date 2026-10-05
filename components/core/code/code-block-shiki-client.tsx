"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { highlightCode, type HighlightCodeOptions } from "./shiki-highlighter"

type CodeBlockShikiClientProps = {
  code: string
  className?: string
} & HighlightCodeOptions

/**
 * Client-rendered counterpart to `CodeBlockShiki` — for when there's no
 * server round-trip for this code (e.g. an interactive playground where the
 * code comes from client state). Highlights in a `useEffect`, so Shiki ships
 * to the browser and there's a brief plain-text render before it resolves.
 * Prefer `CodeBlockShiki` (Server Component) whenever the code is known
 * ahead of render.
 */
function CodeBlockShikiClient({
  code,
  className,
  language,
  lineNumbers,
  highlightLines,
  highlightWords,
}: CodeBlockShikiClientProps) {
  const [html, setHtml] = React.useState<string | null>(null)

  React.useEffect(() => {
    let isMounted = true

    highlightCode(code, {
      language,
      lineNumbers,
      highlightLines,
      highlightWords,
    }).then((result) => {
      if (isMounted) setHtml(result)
    })

    return () => {
      isMounted = false
    }
  }, [code, language, lineNumbers, highlightLines, highlightWords])

  const classNames = cn("w-full", className)

  if (html) {
    return (
      <div className={classNames} dangerouslySetInnerHTML={{ __html: html }} />
    )
  }

  return (
    <div className={classNames}>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export { CodeBlockShikiClient }
export type { CodeBlockShikiClientProps }
