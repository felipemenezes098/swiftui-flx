import {
  transformerMetaHighlight,
  transformerMetaWordHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerRemoveLineBreak,
} from "@shikijs/transformers"
import { createJavaScriptRegexEngine } from "shiki/engine/javascript"
import {
  type HighlighterCore,
  type RegexEngine,
  type ShikiTransformer,
  createHighlighterCore,
} from "shiki/core"

// Themes:
import lightTheme from "@shikijs/themes/min-light"
import darkTheme from "@shikijs/themes/vesper"

// Languages:
import bash from "@shikijs/langs/bash"
import css from "@shikijs/langs/css"
import html from "@shikijs/langs/html"
import js from "@shikijs/langs/js"
import json from "@shikijs/langs/json"
import markdown from "@shikijs/langs/markdown"
import swift from "@shikijs/langs/swift"
import ts from "@shikijs/langs/ts"
import tsx from "@shikijs/langs/tsx"

let jsEngine: RegexEngine | null = null
let highlighter: Promise<HighlighterCore> | null = null

const Themes = {
  light: "min-light",
  dark: "vesper",
}

type Languages =
  "bash" | "css" | "html" | "js" | "json" | "markdown" | "swift" | "ts" | "tsx"

const getJsEngine = (): RegexEngine => {
  jsEngine ??= createJavaScriptRegexEngine()
  return jsEngine
}

const highlight = async (): Promise<HighlighterCore> => {
  highlighter ??= createHighlighterCore({
    themes: [lightTheme, darkTheme],
    langs: [bash, css, html, js, json, markdown, swift, ts, tsx],
    engine: getJsEngine(),
  })
  return highlighter
}

export type HighlightCodeOptions = {
  language?: Languages
  lineNumbers?: boolean
  highlightLines?: string
  highlightWords?: string
}

/**
 * Isomorphic Shiki utility — plain async function, no React, no 'use
 * client'. Runs equally well awaited directly in a Server Component
 * (`CodeBlockShiki`) or inside a `useEffect` in a client component
 * (`CodeBlockShikiClient`); those two own how/when it's called, this only
 * owns the actual highlighting. The highlighter instance is created once
 * and memoized (`highlight()`), same as every other call site.
 *
 * Renders both themes into one HTML string (`--shiki-light`/`--shiki-dark`
 * CSS vars), so light/dark switches instantly via the `.dark` class with no
 * client JS or re-render — see the `.shiki` rules in globals.css.
 */
export async function highlightCode(
  code: string,
  {
    language = "tsx",
    lineNumbers = false,
    highlightLines,
    highlightWords,
  }: HighlightCodeOptions = {}
) {
  const shiki = await highlight()

  const lineNumbersTransformer: ShikiTransformer = {
    name: "AddLineNumbers",
    pre(node) {
      if (lineNumbers) {
        const shikiStyles = node.properties.class
        node.properties.class = `${shikiStyles} shiki-line-numbers`
      }
    },
  }

  const transformers: ShikiTransformer[] = [
    transformerNotationDiff(),
    transformerNotationHighlight(),
    transformerRemoveLineBreak(),
    lineNumbersTransformer,
    ...(highlightLines ? [transformerMetaHighlight()] : []),
    ...(highlightWords ? [transformerMetaWordHighlight()] : []),
  ]

  let metaString = ""
  if (highlightLines) metaString += `{${highlightLines}}`
  if (highlightWords) metaString += ` /${highlightWords}/`

  return shiki.codeToHtml(code, {
    lang: language,
    themes: { light: Themes.light, dark: Themes.dark },
    defaultColor: false,
    transformers,
    meta: metaString ? { __raw: metaString.trim() } : undefined,
  })
}

export { Themes, type Languages }
