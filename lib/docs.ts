export type Platform = "ios" | "mac"

export interface PlatformInfo {
  id: Platform
  name: string
  releases: string[]
}

export const platforms: PlatformInfo[] = [
  { id: "ios", name: "iOS", releases: ["iOS 16.4+", "iPadOS 16.4+"] },
  { id: "mac", name: "macOS", releases: ["macOS 13.3+"] },
]

export const defaultPlatform: Platform = "ios"

export function isPlatform(value: string): value is Platform {
  return platforms.some((platform) => platform.id === value)
}

export function getPlatformInfo(platform: Platform) {
  return platforms.find((item) => item.id === platform) ?? platforms[0]
}

export interface ComponentDoc {
  slug: string
  name: string
  description: string
}

interface ComponentCatalogEntry {
  slug: string
  name: string
  descriptions: Partial<Record<Platform, string>>
}

const componentCatalog: ComponentCatalogEntry[] = [
  {
    slug: "avatar",
    name: "Avatar",
    descriptions: {
      ios: "Displays a user's profile picture, with initials as a fallback.",
      mac: "Displays a user's profile picture, with initials as a fallback.",
    },
  },
  {
    slug: "badge",
    name: "Badge",
    descriptions: {
      ios: "Displays a small label for status, category, or count.",
      mac: "Displays a small label for status, category, or count.",
    },
  },
  {
    slug: "button",
    name: "Button",
    descriptions: {
      ios: "Triggers an action or event, such as submitting a form.",
      mac: "Triggers an action or event, such as submitting a form.",
    },
  },
  {
    slug: "card",
    name: "Card",
    descriptions: {
      ios: "A card is a container that can be used to display content in a styled way.",
      mac: "A card is a container that can be used to display content in a styled way.",
    },
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    descriptions: {
      ios: "Displays content that can be expanded and collapsed.",
      mac: "Displays content that can be expanded and collapsed.",
    },
  },
  {
    slug: "field-label",
    name: "Field Label",
    descriptions: {
      ios: "Pairs a caption with a form control.",
      mac: "Pairs a caption with a form control.",
    },
  },
  {
    slug: "form-field",
    name: "Form Field",
    descriptions: {
      ios: "Groups a label, control, description, and error message for a form field.",
      mac: "Groups a label, control, description, and error message for a form field.",
    },
  },
  {
    slug: "item",
    name: "Item",
    descriptions: {
      ios: "Displays a row of content, such as a list entry, notification, or settings row.",
      mac: "Displays a row of content, such as a list entry, notification, or settings row.",
    },
  },
  {
    slug: "menu",
    name: "Menu",
    descriptions: {
      ios: "Displays a list of actions or options revealed from a button or custom trigger.",
    },
  },
  {
    slug: "picker",
    name: "Picker",
    descriptions: {
      ios: "Displays a dropdown for selecting one value from a set of options.",
    },
  },
  {
    slug: "progress-view",
    name: "Progress View",
    descriptions: {
      ios: "Displays progress toward completion of a task, as a bar or a spinner.",
      mac: "Displays progress toward completion of a task, as a bar or a spinner.",
    },
  },
  {
    slug: "secure-field",
    name: "Secure Field",
    descriptions: {
      ios: "Displays an obscured text input for passwords and other sensitive text.",
      mac: "Displays an obscured text input for passwords and other sensitive text.",
    },
  },
  {
    slug: "sheet",
    name: "Sheet",
    descriptions: {
      ios: "Presents content in a sheet over the current view, driven by an item binding.",
      mac: "Presents content in a sheet over the current view, driven by an item binding.",
    },
  },
  {
    slug: "slider",
    name: "Slider",
    descriptions: {
      ios: "Displays a control for selecting a value from a bounded range.",
      mac: "Displays a control for selecting a value from a bounded range.",
    },
  },
  {
    slug: "text-editor",
    name: "Text Editor",
    descriptions: {
      ios: "Displays a multi-line text input for long-form content.",
      mac: "Displays a multi-line text input for long-form content.",
    },
  },
  {
    slug: "text-field",
    name: "Text Field",
    descriptions: {
      ios: "Displays a single-line text input.",
      mac: "Displays a single-line text input.",
    },
  },
  {
    slug: "text-field-group",
    name: "Text Field Group",
    descriptions: {
      ios: "Wraps a text field in a shared box with optional leading and trailing addons.",
      mac: "Wraps a text field in a shared box with optional leading and trailing addons.",
    },
  },
  {
    slug: "toggle",
    name: "Toggle",
    descriptions: {
      ios: "Displays a switch for an on/off value.",
      mac: "Displays a checkbox for an on/off value.",
    },
  },
]

export function getComponentDocs(platform: Platform): ComponentDoc[] {
  return componentCatalog.flatMap((entry) => {
    const description = entry.descriptions[platform]
    if (!description) return []
    return [{ slug: entry.slug, name: entry.name, description }]
  })
}

export function getComponentDoc(platform: Platform, slug: string) {
  return getComponentDocs(platform).find((doc) => doc.slug === slug)
}

export function getComponentAvailability(platform: Platform, slug: string) {
  return {
    releases: getPlatformInfo(platform).releases,
    unavailable: platforms.filter((item) => !getComponentDoc(item.id, slug)),
  }
}

export function getComponentAvailabilityText(platform: Platform, slug: string) {
  const { releases, unavailable } = getComponentAvailability(platform, slug)
  const notes = unavailable.map((item) => `Not available on ${item.name}.`)
  return [`Availability: ${releases.join(", ")}.`, ...notes].join(" ")
}

const componentsNotes: Partial<Record<Platform, string>> = {
  mac: "Menu and Picker are iOS only. On macOS, use SwiftUI's Menu and Picker: the Mac always draws them natively.",
}

export function getComponentsDescription(platform: Platform) {
  return `Components you can copy and paste into your ${getPlatformInfo(platform).name} apps.`
}

export function getComponentsNote(platform: Platform) {
  return componentsNotes[platform]
}

export function componentsHref(platform: Platform) {
  return `/docs/components/${platform}`
}

export function componentHref(platform: Platform, slug: string) {
  return `${componentsHref(platform)}/${slug}`
}

export function firstComponentHref(platform: Platform) {
  return componentHref(platform, getComponentDocs(platform)[0].slug)
}

const COMPONENTS_PATH = /^\/docs\/components\/([a-z]+)(?:\/([a-z-]+))?$/

export function platformFromPathname(pathname: string) {
  const match = COMPONENTS_PATH.exec(pathname)
  if (!match || !isPlatform(match[1])) return undefined
  return match[1]
}

export function counterpartHref(pathname: string, platform: Platform) {
  const match = COMPONENTS_PATH.exec(pathname)
  if (!match || !isPlatform(match[1])) return undefined

  const slug = match[2]
  if (slug && getComponentDoc(platform, slug))
    return componentHref(platform, slug)

  return componentsHref(platform)
}

export interface DocsNavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
}

export interface DocsNavGroup {
  title: string
  items: DocsNavItem[]
}

export function getDocsNav(platform: Platform): DocsNavGroup[] {
  return [
    {
      title: "Get Started",
      items: [
        { title: "Installation", href: "/docs/installation" },
        { title: "Existing Projects", href: "/docs/existing-projects" },
        { title: "Swift Packages", href: "/docs/swift-packages" },
        { title: "Presets", href: "/docs/presets" },
        { title: "Components", href: componentsHref(platform) },
      ],
    },
    {
      title: "AI",
      items: [{ title: "llms.txt", href: "/llms.txt", external: true }],
    },
    {
      title: "Components",
      items: getComponentDocs(platform).map((doc) => ({
        title: doc.name,
        href: componentHref(platform, doc.slug),
      })),
    },
  ]
}

export function getDocsPager(
  href: string,
  platform: Platform = defaultPlatform
) {
  const items = getDocsNav(platform)
    .flatMap((group) => group.items)
    .filter((item) => !item.disabled && !item.external)
  const index = items.findIndex((item) => item.href === href)
  if (index === -1) return {}

  return { previous: items[index - 1], next: items[index + 1] }
}
