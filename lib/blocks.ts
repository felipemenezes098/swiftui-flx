import type { Platform } from "@/lib/docs"

export const blockCategories = [
  { id: "authentication", name: "Authentication" },
  { id: "settings", name: "Settings" },
] as const

export type BlockCategory = (typeof blockCategories)[number]["id"]

export interface Block {
  slug: string
  name: string
  category: BlockCategory
  files: Record<Platform, string>
}

export const blocks: Block[] = [
  {
    slug: "sign-in",
    category: "authentication",
    name: "Sign In",
    files: {
      ios: "blocks/sign-in/SignInView.swift",
      mac: "blocks/sign-in/SignInView+macOS.swift",
    },
  },
  {
    slug: "sign-up",
    category: "authentication",
    name: "Sign Up",
    files: {
      ios: "blocks/sign-up/SignUpView.swift",
      mac: "blocks/sign-up/SignUpView+macOS.swift",
    },
  },
  {
    slug: "settings",
    category: "settings",
    name: "Settings",
    files: {
      ios: "blocks/settings/SettingsView.swift",
      mac: "blocks/settings/SettingsView+macOS.swift",
    },
  },
]

export function blockImage(platform: Platform, slug: string) {
  const base = `/images/blocks/${platform}/${slug}/${slug}`
  return { light: `${base}.webp`, dark: `${base}-dark.webp` }
}

export function blockFileName(block: Block, platform: Platform) {
  return block.files[platform].split("/").pop()?.replace("+macOS", "") ?? ""
}

export function blocksInCategory(category: BlockCategory) {
  return blocks.filter((block) => block.category === category)
}
