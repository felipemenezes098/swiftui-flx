import fs from "node:fs/promises"
import path from "node:path"

import { siteConfig } from "@/config/site"
import { extractCodeFromFilePath } from "@/lib/code"
import {
  getExistingProjectPrompt,
  getInstallPrompt,
  getMarkdownPaths,
  markdownUrl,
} from "@/lib/llms"
import {
  componentHref,
  getComponentAvailabilityText,
  getComponentDocs,
  getComponentsDescription,
  getComponentsNote,
  getPlatformInfo,
  isPlatform,
  type Platform,
} from "@/lib/docs"

const FENCE_REGEX = /(^```[\s\S]*?^```)/m
const SELF_CLOSING_REGEX =
  /<(ComponentPreviewCode|ComponentPreview|CodeBlockFromFile|CodeBlockCommand|DocsPageActions|AiInstall|PresetPreview)\b((?:`[\s\S]*?`|[^`])*?)\/>/g

function readProp(props: string, name: string) {
  const text = new RegExp(`${name}="([^"]*)"`).exec(props)
  if (text) return text[1]

  const template = new RegExp(`${name}=\\{\`((?:[^\`\\\\]|\\\\.)*)\`\\}`).exec(
    props
  )
  if (!template) return undefined

  return template[1]
    .replaceAll("${siteConfig.url}", siteConfig.url)
    .replace(/\\(.)/g, "$1")
}

function absoluteHref(href: string) {
  const pathname = href.split("#")[0]
  const docPath = pathname.replace(/^\/docs\//, "")
  const hasMarkdown = getMarkdownPaths().some(
    (item) => item.join("/") === docPath
  )
  if (!pathname.startsWith("/docs/") || !hasMarkdown) {
    return `${siteConfig.url}${href}`
  }
  return `${markdownUrl(pathname)}${href.slice(pathname.length)}`
}

function fence(code: string, language: string) {
  return `\n\`\`\`${language}\n${code.trim()}\n\`\`\`\n`
}

function renderTag(name: string, props: string) {
  if (name === "ComponentPreviewCode") {
    const filePath = readProp(props, "filePath")
    const code =
      (filePath && extractCodeFromFilePath(filePath)) ?? readProp(props, "code")
    if (!code) return ""
    return fence(code, "swift")
  }

  if (name === "CodeBlockFromFile") {
    const filePath = readProp(props, "filePath")
    const code =
      (filePath && extractCodeFromFilePath(filePath)) || readProp(props, "code")
    if (!code) return ""
    const title = readProp(props, "title") ?? path.basename(filePath ?? "")
    return `\n\`${title}\`\n${fence(code, "swift")}`
  }

  if (name === "AiInstall") {
    if (readProp(props, "variant") === "existing") {
      return `\n**Add to your app with AI.** Paste this prompt into your AI agent:\n${fence(getExistingProjectPrompt(), "text")}`
    }
    return `\n**Install with AI.** Paste this prompt into your AI agent:\n${fence(getInstallPrompt(), "text")}`
  }

  if (name === "CodeBlockCommand") {
    const command = readProp(props, "command")
    if (!command) return ""
    return fence(`npx ${command}`, "bash")
  }

  return ""
}

function convertText(text: string, tabLabels: Map<string, string>) {
  let step = 0

  return text
    .replace(/^import .*$/gm, "")
    .replace(SELF_CLOSING_REGEX, (_, name: string, props: string) =>
      renderTag(name, props)
    )
    .replace(/<TabsList>([\s\S]*?)<\/TabsList>/g, (_, triggers: string) => {
      for (const match of triggers.matchAll(
        /<TabsTrigger value="([^"]+)">([\s\S]*?)<\/TabsTrigger>/g
      )) {
        tabLabels.set(match[1], match[2].trim())
      }
      return ""
    })
    .replace(
      /<TabsContent value="([^"]+)">/g,
      (_, value: string) => `**${tabLabels.get(value) ?? value}**`
    )
    .replace(/<Steps>|<Step>([\s\S]*?)<\/Step>/g, (match, title?: string) => {
      if (match === "<Steps>") {
        step = 0
        return ""
      }
      step += 1
      return `${step}. ${title?.trim()}`
    })
    .replace(/<\/?(CodeTabs|Steps|TabsContent|DocsHeader|Callout)>/g, "")
    .replace(
      /\]\((\/[^)]*)\)/g,
      (_, href: string) => `](${absoluteHref(href)})`
    )
}

const COMPONENT_CONTENT_PATH = /^components\/([a-z]+)\/([a-z-]+)$/

function withAvailability(source: string, contentPath: string) {
  const match = COMPONENT_CONTENT_PATH.exec(contentPath)
  if (!match || !isPlatform(match[1])) return source
  return source.replace(
    "<DocsAvailability />",
    getComponentAvailabilityText(match[1], match[2])
  )
}

export async function getDocMarkdown(contentPath: string) {
  const filePath = path.join(process.cwd(), "app/content", `${contentPath}.mdx`)
  const source = withAvailability(
    await fs.readFile(filePath, "utf8"),
    contentPath
  )
  const tabLabels = new Map<string, string>()

  const markdown = source
    .split(FENCE_REGEX)
    .map((segment, index) => {
      if (index % 2 === 1) return segment
      return convertText(segment, tabLabels)
    })
    .join("")

  return `${markdown.replace(/\n{3,}/g, "\n\n").trim()}\n`
}

export function getComponentsIndexMarkdown(platform: Platform) {
  const note = getComponentsNote(platform)
  const noteLines: string[] = []
  if (note) noteLines.push(note, "")

  return [
    `# ${getPlatformInfo(platform).name} Components`,
    "",
    getComponentsDescription(platform),
    "",
    ...noteLines,
    ...getComponentDocs(platform).map(
      (doc) =>
        `- [${doc.name}](${markdownUrl(componentHref(platform, doc.slug))}): ${doc.description}`
    ),
    "",
  ].join("\n")
}
