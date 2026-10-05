import manifest from "@/lib/image-manifest.json"

const hashes: Record<string, string> = manifest

export function imageUrl(path: string) {
  const hash = hashes[path]
  if (!hash) return path
  return `${path}?v=${hash}`
}
