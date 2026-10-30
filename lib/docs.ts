export type Platform = "ios" | "mac"

export interface PlatformInfo {
  id: Platform
  name: string
  devices: string
  releases: string[]
}

export const platforms: PlatformInfo[] = [
  {
    id: "ios",
    name: "iOS",
    devices: "iPhone and iPad",
    releases: ["iOS 16.4+", "iPadOS 16.4+"],
  },
  { id: "mac", name: "macOS", devices: "Mac", releases: ["macOS 13.3+"] },
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
  seoName: string
  description: string
}

interface ComponentCatalogEntry {
  slug: string
  name: string
  seoNames: Partial<Record<Platform, string>>
  descriptions: Partial<Record<Platform, string>>
}

const componentCatalog: ComponentCatalogEntry[] = [
  {
    slug: "alert",
    name: "Alert",
    seoNames: {
      ios: "Alert",
      mac: "Alert",
    },
    descriptions: {
      ios: "Asks people to confirm an action or acknowledge important information with SwiftUI's native alert.",
      mac: "Asks people to confirm an action or acknowledge important information with SwiftUI's native alert.",
    },
  },
  {
    slug: "avatar",
    name: "Avatar",
    seoNames: {
      ios: "Avatar View",
      mac: "Avatar View",
    },
    descriptions: {
      ios: "Displays a user's profile picture, with initials as a fallback.",
      mac: "Displays a user's profile picture, with initials as a fallback.",
    },
  },
  {
    slug: "badge",
    name: "Badge",
    seoNames: {
      ios: "Badge",
      mac: "Badge",
    },
    descriptions: {
      ios: "Displays a small label for status, category, or count.",
      mac: "Displays a small label for status, category, or count.",
    },
  },
  {
    slug: "button",
    name: "Button",
    seoNames: {
      ios: "Button Style",
      mac: "Button Style",
    },
    descriptions: {
      ios: "Triggers an action or event, such as submitting a form.",
      mac: "Triggers an action or event, such as submitting a form.",
    },
  },
  {
    slug: "card",
    name: "Card",
    seoNames: {
      ios: "Card View",
      mac: "Card View",
    },
    descriptions: {
      ios: "A card is a container that can be used to display content in a styled way.",
      mac: "A card is a container that can be used to display content in a styled way.",
    },
  },
  {
    slug: "collapsible",
    name: "Collapsible",
    seoNames: {
      ios: "Collapsible (DisclosureGroup)",
      mac: "Collapsible (DisclosureGroup)",
    },
    descriptions: {
      ios: "Displays content that can be expanded and collapsed.",
      mac: "Displays content that can be expanded and collapsed.",
    },
  },
  {
    slug: "date-picker",
    name: "Date Picker",
    seoNames: {
      ios: "DatePicker",
      mac: "DatePicker",
    },
    descriptions: {
      ios: "Picks a date, a time, or both with SwiftUI's native date picker.",
      mac: "Picks a date, a time, or both with SwiftUI's native date picker.",
    },
  },
  {
    slug: "empty",
    name: "Empty",
    seoNames: {
      ios: "Empty State View",
      mac: "Empty State View",
    },
    descriptions: {
      ios: "Displays an empty state, with an optional icon, title, description, and actions.",
      mac: "Displays an empty state, with an optional icon, title, description, and actions.",
    },
  },
  {
    slug: "field-label",
    name: "Field Label",
    seoNames: {
      ios: "Form Field Label",
      mac: "Form Field Label",
    },
    descriptions: {
      ios: "Pairs a caption with a form control.",
      mac: "Pairs a caption with a form control.",
    },
  },
  {
    slug: "form",
    name: "Form",
    seoNames: {
      ios: "Form",
      mac: "Form",
    },
    descriptions: {
      ios: "Builds settings and data-entry screens with SwiftUI's native Form.",
      mac: "Builds settings and data-entry screens with SwiftUI's native Form.",
    },
  },
  {
    slug: "form-field",
    name: "Form Field",
    seoNames: {
      ios: "Form Field with Error Message",
      mac: "Form Field with Error Message",
    },
    descriptions: {
      ios: "Groups a label, control, description, and error message for a form field.",
      mac: "Groups a label, control, description, and error message for a form field.",
    },
  },
  {
    slug: "item",
    name: "Item",
    seoNames: {
      ios: "List Row (Item)",
      mac: "List Row (Item)",
    },
    descriptions: {
      ios: "Displays a row of content, such as a list entry, notification, or settings row.",
      mac: "Displays a row of content, such as a list entry, notification, or settings row.",
    },
  },
  {
    slug: "list",
    name: "List",
    seoNames: {
      ios: "List",
    },
    descriptions: {
      ios: "Displays a collection of rows with SwiftUI's native List.",
    },
  },
  {
    slug: "menu",
    name: "Menu",
    seoNames: {
      ios: "Menu",
    },
    descriptions: {
      ios: "Displays a list of actions or options revealed from a button or custom trigger.",
    },
  },
  {
    slug: "navigation",
    name: "Navigation",
    seoNames: {
      ios: "NavigationStack",
      mac: "NavigationSplitView",
    },
    descriptions: {
      ios: "Moves through a hierarchy of screens with SwiftUI's native navigation stack.",
      mac: "Organizes a window into a sidebar and a detail view with SwiftUI's native split view.",
    },
  },
  {
    slug: "picker",
    name: "Picker",
    seoNames: {
      ios: "Picker",
    },
    descriptions: {
      ios: "Displays a dropdown for selecting one value from a set of options.",
    },
  },
  {
    slug: "progress-view",
    name: "Progress View",
    seoNames: {
      ios: "ProgressView",
      mac: "ProgressView",
    },
    descriptions: {
      ios: "Displays progress toward completion of a task, as a bar or a spinner.",
      mac: "Displays progress toward completion of a task, as a bar or a spinner.",
    },
  },
  {
    slug: "search",
    name: "Search",
    seoNames: {
      ios: "Search (searchable)",
      mac: "Search (searchable)",
    },
    descriptions: {
      ios: "Searches the content of a screen with SwiftUI's native search field.",
      mac: "Searches the content of a window with SwiftUI's native search field.",
    },
  },
  {
    slug: "secure-field",
    name: "Secure Field",
    seoNames: {
      ios: "SecureField (Password Field)",
      mac: "SecureField (Password Field)",
    },
    descriptions: {
      ios: "Displays an obscured text input for passwords and other sensitive text.",
      mac: "Displays an obscured text input for passwords and other sensitive text.",
    },
  },
  {
    slug: "segmented-control",
    name: "Segmented Control",
    seoNames: {
      ios: "Segmented Control",
      mac: "Segmented Control",
    },
    descriptions: {
      ios: "Switches between a few options or views, like tabs, with SwiftUI's native segmented picker.",
      mac: "Picks one of a few closely related options with SwiftUI's native segmented picker.",
    },
  },
  {
    slug: "sheet",
    name: "Sheet",
    seoNames: {
      ios: "Sheet",
      mac: "Sheet",
    },
    descriptions: {
      ios: "Presents FLX components in SwiftUI's native sheet.",
      mac: "Presents FLX components in SwiftUI's native sheet.",
    },
  },
  {
    slug: "slider",
    name: "Slider",
    seoNames: {
      ios: "Slider",
      mac: "Slider",
    },
    descriptions: {
      ios: "Displays a control for selecting a value from a bounded range.",
      mac: "Displays a control for selecting a value from a bounded range.",
    },
  },
  {
    slug: "tab-view",
    name: "Tab View",
    seoNames: {
      ios: "TabView (Tab Bar)",
      mac: "TabView",
    },
    descriptions: {
      ios: "Switches between the main sections of an app with SwiftUI's native tab bar.",
      mac: "Switches between related panes of content in a window with SwiftUI's native tab view.",
    },
  },
  {
    slug: "text-editor",
    name: "Text Editor",
    seoNames: {
      ios: "TextEditor",
      mac: "TextEditor",
    },
    descriptions: {
      ios: "Displays a multi-line text input for long-form content.",
      mac: "Displays a multi-line text input for long-form content.",
    },
  },
  {
    slug: "text-field",
    name: "Text Field",
    seoNames: {
      ios: "TextField",
      mac: "TextField",
    },
    descriptions: {
      ios: "Displays a single-line text input.",
      mac: "Displays a single-line text input.",
    },
  },
  {
    slug: "text-field-group",
    name: "Text Field Group",
    seoNames: {
      ios: "TextField with Icon and Addons",
      mac: "TextField with Icon and Addons",
    },
    descriptions: {
      ios: "Wraps a text field in a shared box with optional leading and trailing addons.",
      mac: "Wraps a text field in a shared box with optional leading and trailing addons.",
    },
  },
  {
    slug: "toggle",
    name: "Toggle",
    seoNames: {
      ios: "Toggle Switch",
      mac: "Toggle Checkbox",
    },
    descriptions: {
      ios: "Displays a switch for an on/off value.",
      mac: "Displays a checkbox for an on/off value.",
    },
  },
]

export function getComponentDocs(platform: Platform): ComponentDoc[] {
  return componentCatalog.flatMap((entry) => {
    const description = entry.descriptions[platform]
    const seoName = entry.seoNames[platform]
    if (!description || !seoName) return []
    return [{ slug: entry.slug, name: entry.name, seoName, description }]
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

export function getComponentsMetaDescription(platform: Platform) {
  return `Copy-paste SwiftUI components for ${getPlatformInfo(platform).devices}, styled like shadcn/ui. Buttons, forms, lists, empty states and more, in code you own.`
}

export function getComponentSeoTitle(platform: Platform, doc: ComponentDoc) {
  return `SwiftUI ${doc.seoName} for ${getPlatformInfo(platform).name}`
}

export function getComponentMetaDescription(
  platform: Platform,
  doc: ComponentDoc
) {
  return `${doc.description} Copy-paste SwiftUI code for ${getPlatformInfo(platform).devices}, styled like shadcn/ui.`
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
        { title: "Changelog", href: "/docs/changelog" },
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
