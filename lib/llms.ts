import { siteConfig } from "@/config/site"
import {
  componentHref,
  componentsHref,
  getComponentDocs,
  getComponentsDescription,
  getPlatformInfo,
  platforms,
} from "@/lib/docs"

export const guides = [
  {
    slug: "installation",
    title: "Installation",
    description: "How the design system is organized and how to set it up.",
  },
  {
    slug: "existing-projects",
    title: "Existing Projects",
    description:
      "Add the design system to an app you already have, with your own colors, one screen at a time.",
  },
  {
    slug: "swift-packages",
    title: "Swift Packages",
    description:
      "Keep the design system in its own Swift package and use it from your app and your other packages.",
  },
  {
    slug: "presets",
    title: "Presets",
    description:
      "Theme presets that set the colors and radius of every component.",
  },
] as const

export function markdownUrl(href: string) {
  return `${siteConfig.url}${href}.md`
}

export function getMarkdownPaths() {
  return [
    ...guides.map((guide) => [guide.slug]),
    ...platforms.flatMap((platform) => [
      ["components", platform.id],
      ...getComponentDocs(platform.id).map((doc) => [
        "components",
        platform.id,
        doc.slug,
      ]),
    ]),
  ]
}

export function getLlmsTxt() {
  const url = siteConfig.url

  const componentSections = platforms.flatMap((platform) => {
    const info = getPlatformInfo(platform.id)
    return [
      `## ${info.name} components`,
      "",
      `- [All ${info.name} components](${markdownUrl(componentsHref(platform.id))}): ${getComponentsDescription(platform.id)} Requires ${info.releases.join(" or ")}.`,
      ...getComponentDocs(platform.id).map(
        (doc) =>
          `- [${doc.name}](${markdownUrl(componentHref(platform.id, doc.slug))}): ${doc.description}`
      ),
      "",
    ]
  })

  return [
    `# ${siteConfig.name}`,
    "",
    "> SwiftUI components for iOS, iPadOS and macOS that live in your own project, the shadcn/ui way. Built on native SwiftUI controls and their *Style protocols, themed through shared tokens, MIT licensed.",
    "",
    "swiftui-flx is not a Swift package. Every component is plain Swift source added to the app's project, so the user owns and edits it.",
    "",
    "- `DesignSystem/Tokens` and `DesignSystem/Theme` are the foundation. Every component needs them, so add them once, before any component.",
    "- `DesignSystem/Components/FLX<Name>` holds one component. Components read colors, radius, spacing and fonts from the theme, so never hardcode those values.",
    "- Requires iOS 16.4, iPadOS 16.4 or macOS 13.3 or later. Compiles in Swift 5 and Swift 6 language modes.",
    "",
    "Install with the shadcn CLI, run from the folder Xcode compiles (the one with the app's Swift files), or pass `--cwd <folder>`:",
    "",
    `- Foundation: \`npx shadcn@latest add ${url}/r/foundation.json\``,
    `- iOS and iPadOS component: \`npx shadcn@latest add ${url}/r/ios-<component>.json\``,
    `- macOS component: \`npx shadcn@latest add ${url}/r/mac-<component>.json\``,
    "- An app that runs on iPhone and Mac adds both the `ios-` and `mac-` version of each component. Shared files are identical and platform files are guarded with `#if os(...)`.",
    "- Projects created before Xcode 16 list files one by one: after adding files, the user adds them to the target in Xcode with File > Add Files. Don't edit `project.pbxproj` by hand.",
    "- Without Node, copy each file by hand from the component's page, following the paths shown.",
    `- For an app that already has screens and its own styles, read [Existing Projects](${markdownUrl("/docs/existing-projects")}) first.`,
    "",
    "## Docs",
    "",
    ...guides.map(
      (guide) =>
        `- [${guide.title}](${markdownUrl(`/docs/${guide.slug}`)}): ${guide.description}`
    ),
    "",
    ...componentSections,
    "## Optional",
    "",
    `- [Website](${url}): Live previews of every component on iPhone and Mac.`,
    "",
  ].join("\n")
}

export function getInstallPrompt() {
  const url = siteConfig.url

  return [
    "Add swiftui-flx to this project. It's a set of SwiftUI components that live in the app's own source, installed with the shadcn CLI.",
    "",
    "Components I want: Button, Card, Text Field",
    "",
    `1. Read ${url}/llms.txt and follow the docs it links to. If the app already has screens and its own styles, follow ${url}/docs/existing-projects.md instead.`,
    "2. Look at the project first: the platforms it targets (iOS, iPadOS, macOS), the folder Xcode compiles, whether the project was created before Xcode 16, and whether shared code lives in Swift packages.",
    "3. Add the foundation, then the components above. Use the ios- items for iOS and iPadOS, the mac- items for macOS, and both for an app that runs on both.",
    "4. If Node isn't available, copy the files by hand from each component's page.",
    "5. Build the app for every platform it targets and fix any errors.",
    "6. Tell me what you added and show a short example of one component in use.",
    "",
    "Use the FLX tokens and theme instead of hardcoded colors, spacing or fonts. Don't edit project.pbxproj by hand: if files need adding to the target, tell me how to do it in Xcode.",
  ].join("\n")
}

export function getExistingProjectPrompt() {
  const url = siteConfig.url

  return [
    "Add swiftui-flx to this existing app. It's a set of SwiftUI components that live in the app's own source, installed with the shadcn CLI.",
    "",
    "Components I want: Button, Card, Text Field",
    "",
    "First, plan. Don't change anything yet:",
    `1. Read ${url}/llms.txt and ${url}/docs/existing-projects.md.`,
    "2. Check the deployment target. swiftui-flx needs iOS 16.4 or macOS 13.3 or later. If the app supports older versions, stop and tell me.",
    "3. Look at the project: its targets and extensions, the platforms they run on (Mac Catalyst counts as iOS), whether it uses synchronized folders, Swift packages, Tuist or XcodeGen, and where the brand colors, radius and fonts are defined today.",
    "4. Look for anything that could conflict, like an existing DesignSystem folder or SwiftLint rules that would flag the new files.",
    "5. Show me the plan: where DesignSystem will live, which files you'll add, how the app's colors, corner radius and font map into the theme, and anything I need to do in Xcode. Then ask me which screen to start with.",
    "",
    "After I approve:",
    "6. Add the foundation and the components above, and create the app's preset in DesignSystem/Theme/Presets/FLXTheme+Brand.swift.",
    "7. Use the components in the screen I picked and apply .flxTheme(.brand) to it. Leave the rest of the app as it is.",
    "8. Build every target that includes the new files and fix any errors.",
    "",
    "Use the FLX tokens and theme instead of hardcoded colors, spacing or fonts. Don't edit project.pbxproj by hand: if files need adding to a target, tell me how to do it in Xcode.",
  ].join("\n")
}
