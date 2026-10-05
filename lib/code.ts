import fs from "node:fs"
import path from "node:path"

/**
 * Reads a source file relative to the project root for use in docs code
 * blocks. Paths point at `registry/**`, copies of the real swift-flx
 * component source kept in sync by hand when the upstream file changes.
 */
export function extractCodeFromFilePath(filePath: string): string | null {
  const absolutePath = path.join(
    /* turbopackIgnore: true */ process.cwd(),
    filePath
  )

  try {
    return fs.readFileSync(absolutePath, "utf-8").trimEnd()
  } catch {
    return null
  }
}
