import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import {
  componentHref,
  componentsHref,
  getComponentDocs,
  platforms,
} from "@/lib/docs"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/docs/installation",
    "/docs/existing-projects",
    "/docs/swift-packages",
    "/docs/presets",
    "/me",
    ...platforms.flatMap((platform) => [
      componentsHref(platform.id),
      ...getComponentDocs(platform.id).map((doc) =>
        componentHref(platform.id, doc.slug)
      ),
    ]),
  ]

  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }))
}
