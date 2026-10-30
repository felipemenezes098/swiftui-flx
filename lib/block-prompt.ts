import { siteConfig } from "@/config/site"
import { blockFileName, type Block } from "@/lib/blocks"
import { extractCodeFromFilePath } from "@/lib/code"
import { getPlatformInfo, type Platform } from "@/lib/docs"

export function blockPrompt(block: Block, platform: Platform) {
  const code = extractCodeFromFilePath(block.files[platform]) ?? ""
  const name = getPlatformInfo(platform).name

  return [
    `Add this ${block.name} screen to my SwiftUI ${name} app as ${blockFileName(block, platform)}.`,
    `It uses swiftui-flx components. Add any that are missing by following ${siteConfig.url}/llms.txt, then connect the closures to my auth.`,
    "",
    "```swift",
    code,
    "```",
  ].join("\n")
}
