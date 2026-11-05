"use client"

import * as React from "react"

import { CopyButton } from "@/components/core/copy-button"

function codeFromBlock(button: HTMLElement): string {
  const block = button.closest('[data-slot="code-block"]')
  if (!block) return ""
  const lines = block.querySelectorAll(".shiki .line")
  return Array.from(lines, (line) => line.textContent ?? "").join("\n")
}

function CodeBlockCopyButton(
  props: Omit<React.ComponentProps<typeof CopyButton>, "content">
) {
  return <CopyButton {...props} content={codeFromBlock} />
}

export { CodeBlockCopyButton }
