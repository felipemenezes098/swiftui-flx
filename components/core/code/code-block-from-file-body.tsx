import { lazyCodeUrl } from "@/lib/code-manifest"

import { CodeBlockLazy } from "./code-block-lazy"
import { CodeBlockShiki } from "./code-block-shiki"
import type { Languages } from "./shiki-highlighter"

interface CodeBlockFromFileBodyProps {
  filePath?: string
  code: string
  language: Languages
  lazy: boolean
}

function lazySource(filePath: string | undefined, lazy: boolean) {
  if (!lazy || !filePath) return undefined
  return lazyCodeUrl(filePath)
}

function CodeBlockFromFileBody({
  filePath,
  code,
  language,
  lazy,
}: Readonly<CodeBlockFromFileBodyProps>) {
  const src = lazySource(filePath, lazy)
  if (src) {
    return <CodeBlockLazy src={src} lineCount={code.split("\n").length} />
  }
  return <CodeBlockShiki code={code} language={language} />
}

export { CodeBlockFromFileBody }
