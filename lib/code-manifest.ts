import fs from "node:fs"
import path from "node:path"

let manifest: Record<string, string> | null = null

function readManifest(): Record<string, string> {
  try {
    const file = path.join(
      /* turbopackIgnore: true */ process.cwd(),
      "lib",
      "code-manifest.json"
    )
    return JSON.parse(fs.readFileSync(file, "utf-8"))
  } catch {
    return {}
  }
}

export function lazyCodeUrl(filePath: string): string | undefined {
  manifest ??= readManifest()
  return manifest[filePath]
}
