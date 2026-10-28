import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import {
  changelogHref,
  getChangelogEntries,
  getComponentChangelog,
} from "@/lib/changelog"
import {
  componentHref,
  componentsHref,
  getComponentDocs,
  platforms,
} from "@/lib/docs"

interface SitemapPath {
  path: string
  lastModified?: string
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getChangelogEntries()
  const latest = entries[0].date
  const paths: SitemapPath[] = [
    { path: "/", lastModified: latest },
    { path: "/docs/installation" },
    { path: "/docs/existing-projects" },
    { path: "/docs/swift-packages" },
    { path: "/docs/presets" },
    { path: changelogHref(), lastModified: latest },
    ...entries.map((entry) => ({
      path: changelogHref(entry.slug),
      lastModified: entry.date,
    })),
    { path: "/me" },
    ...platforms.flatMap((platform) => [
      { path: componentsHref(platform.id), lastModified: latest },
      ...getComponentDocs(platform.id).map((doc) => ({
        path: componentHref(platform.id, doc.slug),
        lastModified: getComponentChangelog(platform.id, doc.slug)[0]?.entry
          .date,
      })),
    ]),
  ]

  return paths.map(({ path, lastModified }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
  }))
}
