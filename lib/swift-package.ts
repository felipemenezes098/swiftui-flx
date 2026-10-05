export const defaultSwiftPackagePath = "Packages/DesignSystem/Sources"

export function cwdSuffix(enabled: boolean, path: string) {
  if (!enabled) return ""

  const cleaned = path.trim().replace(/\/+$/, "") || defaultSwiftPackagePath
  if (/\s/.test(cleaned)) return ` --cwd "${cleaned}"`

  return ` --cwd ${cleaned}`
}
