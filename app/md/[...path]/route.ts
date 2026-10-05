import { isPlatform } from "@/lib/docs"
import { getMarkdownPaths } from "@/lib/llms"
import { getComponentsIndexMarkdown, getDocMarkdown } from "@/lib/markdown"

export const dynamicParams = false

export function generateStaticParams() {
  return getMarkdownPaths().map((path) => ({ path }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  const known = getMarkdownPaths().some(
    (item) => item.join("/") === path.join("/")
  )
  if (!known) return new Response("Not found", { status: 404 })

  let markdown: string
  if (path.length === 2 && path[0] === "components" && isPlatform(path[1])) {
    markdown = getComponentsIndexMarkdown(path[1])
  } else {
    markdown = await getDocMarkdown(path.join("/"))
  }

  return new Response(markdown, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  })
}
