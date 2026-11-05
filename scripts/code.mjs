import { createHash } from "node:crypto"
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import { join, relative, sep } from "node:path"

import {
  highlightCode,
  tokenClassesCss,
} from "../components/core/code/shiki-highlighter.ts"

const root = join(import.meta.dirname, "..")
const contentDir = join(root, "app", "content")
const outputDir = join(root, "public", "code")
const manifestPath = join(root, "lib", "code-manifest.json")
const cssPath = join(root, "app", "shiki-tokens.css")

const lazyBlock = /<CodeBlockFromFile\s+lazy\b[^>]*?filePath="([^"]+)"/g

async function listMdx(dir) {
  const entries = await readdir(dir, { withFileTypes: true, recursive: true })
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => join(entry.parentPath, entry.name))
    .sort()
}

async function lazyFilePaths() {
  const filePaths = new Set()
  for (const file of await listMdx(contentDir)) {
    const source = await readFile(file, "utf-8")
    for (const match of source.matchAll(lazyBlock)) filePaths.add(match[1])
  }
  return [...filePaths].sort()
}

async function writeLazyCode() {
  await rm(outputDir, { recursive: true, force: true })
  await mkdir(outputDir, { recursive: true })

  const manifest = {}
  for (const filePath of await lazyFilePaths()) {
    const code = (await readFile(join(root, filePath), "utf-8")).trimEnd()
    const html = await highlightCode(code, { language: "swift" })
    const hash = createHash("sha256").update(html).digest("hex").slice(0, 12)
    const name = `${hash}.html`
    await writeFile(join(outputDir, name), html)
    manifest[filePath] = `/${relative(join(root, "public"), join(outputDir, name)).split(sep).join("/")}`
  }

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  console.log(`highlighted ${Object.keys(manifest).length} lazy code files`)
}

async function writeTokenCss() {
  await writeFile(cssPath, `${tokenClassesCss()}\n`)
  console.log(`wrote ${relative(root, cssPath)}`)
}

await writeTokenCss()
await writeLazyCode()
