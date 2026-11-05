"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const lineHeight = 23.5
const verticalPadding = 24
const maxHeight = 480

interface CodeBlockLazyProps {
  src: string
  lineCount: number
  className?: string
}

function CodeBlockLazy({ src, lineCount, className }: CodeBlockLazyProps) {
  const [html, setHtml] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    fetch(src)
      .then((response) => response.text())
      .then((text) => {
        if (active) setHtml(text)
      })
    return () => {
      active = false
    }
  }, [src])

  if (html === null) {
    const height = Math.min(lineCount * lineHeight + verticalPadding, maxHeight)
    return (
      <div aria-busy className={cn("w-full", className)} style={{ height }} />
    )
  }

  return (
    <div
      className={cn("w-full", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export { CodeBlockLazy }
