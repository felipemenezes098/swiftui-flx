import type { Platform } from "@/lib/docs"

export interface Block {
  slug: string
  name: string
  files: Record<Platform, string>
}

export const blocks: Block[] = [
  {
    slug: "sign-in",
    name: "Sign In",
    files: {
      ios: "blocks/sign-in/SignInView.swift",
      mac: "blocks/sign-in/SignInView+macOS.swift",
    },
  },
  {
    slug: "sign-up",
    name: "Sign Up",
    files: {
      ios: "blocks/sign-up/SignUpView.swift",
      mac: "blocks/sign-up/SignUpView+macOS.swift",
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
