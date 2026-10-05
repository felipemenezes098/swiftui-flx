/** Turns heading text into a URL-safe id, deduping repeats within a single call scope. */
function slugifyText(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
}

/**
 * Creates a slug generator that dedupes within its own scope (e.g. one doc
 * page render), so a repeated heading like "Variants" doesn't collide with
 * an earlier one. Callers must create a new slugger per document.
 */
export function createSlugger() {
  const seen = new Map<string, number>()

  return function slugify(text: string) {
    const base = slugifyText(text) || "section"
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count === 0 ? base : `${base}-${count}`
  }
}
