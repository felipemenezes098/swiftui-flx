import type { Platform } from "@/lib/docs"

export interface ChangelogAction {
  component: string
  platforms: Platform[]
  summary: string
}

export interface ChangelogEntry {
  slug: string
  title: string
  date: string
  description: string
  actions: ChangelogAction[]
}

export const changelogFeaturedCount = 5

const changelog: ChangelogEntry[] = [
  {
    slug: "2026-10-navigation",
    title: "Navigation",
    date: "2026-10-25",
    description:
      "New Navigation guide: the navigation stack with titles and subtitles on iOS, and the sidebar split view on macOS.",
    actions: [],
  },
  {
    slug: "2026-10-date-picker",
    title: "Date Picker",
    date: "2026-10-25",
    description:
      "New Date Picker guide: the compact field, calendar, and wheels on iOS, and the date field and calendar on macOS.",
    actions: [],
  },
  {
    slug: "2026-10-tab-view",
    title: "Tab View",
    date: "2026-10-21",
    description:
      "New Tab View guide: the tab bar for app sections on iOS, and tabbed panes and the Settings window on macOS.",
    actions: [],
  },
  {
    slug: "2026-10-alert-and-segmented-control",
    title: "Alert and Segmented Control",
    date: "2026-10-20",
    description:
      "New Alert and Segmented Control guides, and an accent color step so system-drawn views follow the theme.",
    actions: [],
  },
  {
    slug: "2026-10-native-guides-and-tint",
    title: "Native Guides and Tint",
    date: "2026-10-19",
    description:
      "New List and Form guides, and a tint color in the theme so native controls follow it in dark mode.",
    actions: [
      {
        component: "toggle",
        platforms: ["ios"],
        summary:
          "Reads the theme's new tint color. Update the foundation before adding this version.",
      },
      {
        component: "slider",
        platforms: ["ios", "mac"],
        summary:
          "Reads the theme's new tint color. Update the foundation before adding this version.",
      },
    ],
  },
  {
    slug: "2026-10-launch",
    title: "swiftui-flx",
    date: "2026-10-05",
    description:
      "SwiftUI components for iOS, iPadOS and macOS that live in your own project, installed with the shadcn CLI.",
    actions: [],
  },
]

export function getChangelogEntries() {
  return [...changelog].sort((a, b) => b.date.localeCompare(a.date))
}

export function getChangelogEntry(slug: string) {
  return changelog.find((entry) => entry.slug === slug)
}

export function changelogHref(slug?: string) {
  if (!slug) return "/docs/changelog"
  return `/docs/changelog/${slug}`
}

export function formatChangelogMonth(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function changelogEntryTitle(entry: ChangelogEntry) {
  return `${formatChangelogMonth(entry.date)} - ${entry.title}`
}

export function getComponentChangelog(platform: Platform, slug: string) {
  return getChangelogEntries().flatMap((entry) =>
    entry.actions
      .filter(
        (action) =>
          action.component === slug && action.platforms.includes(platform)
      )
      .map((action) => ({ entry, summary: action.summary }))
  )
}
