import fs from "node:fs/promises"
import path from "node:path"

import { createSlugger } from "@/lib/slugify"

export interface TocItem {
  title: string
  url: string
  items?: TocItem[]
}

const HEADING_REGEX = /^(#{2,3})\s+(.+)$/

/**
 * Reads a doc's raw MDX source (a path under `app/content`, without the
 * extension) and extracts its h2/h3 headings into a nested list, slugging
 * titles the same way `mdx-components.tsx` does so the generated `#anchor`
 * links land on the right element.
 */
export async function getDocToc(contentPath: string): Promise<TocItem[]> {
  const filePath = path.join(process.cwd(), "app/content", `${contentPath}.mdx`)

  let source: string
  try {
    source = await fs.readFile(filePath, "utf8")
  } catch {
    return []
  }

  const slugify = createSlugger()
  const toc: TocItem[] = []
  let insideCodeBlock = false

  for (const line of source.split("\n")) {
    if (line.trim().startsWith("```")) {
      insideCodeBlock = !insideCodeBlock
      continue
    }
    if (insideCodeBlock) continue

    const match = HEADING_REGEX.exec(line)
    if (!match) continue

    const depth = match[1].length
    const title = match[2].trim()
    const url = `#${slugify(title)}`

    if (depth === 2) {
      toc.push({ title, url })
    } else if (toc.length > 0) {
      const parent = toc[toc.length - 1]
      parent.items = [...(parent.items ?? []), { title, url }]
    }
  }

  return toc
}
