import { siteConfig } from "@/config/site"
import {
  componentHref,
  componentsHref,
  getComponentMetaDescription,
  getComponentSeoTitle,
  getPlatformInfo,
  type ComponentDoc,
  type Platform,
} from "@/lib/docs"

const author = {
  "@type": "Person",
  name: siteConfig.author,
  url: siteConfig.links.twitter,
}

function absoluteUrl(path: string) {
  return `${siteConfig.url}${path}`
}

export function getSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    codeRepository: siteConfig.links.github,
    programmingLanguage: "Swift",
    runtimePlatform: ["iOS", "iPadOS", "macOS"],
    license: "https://opensource.org/licenses/MIT",
    keywords: "SwiftUI, shadcn/ui, iOS, macOS, components, design system",
    author,
  }
}

export function getComponentStructuredData(
  platform: Platform,
  doc: ComponentDoc
) {
  const platformName = getPlatformInfo(platform).name

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        headline: getComponentSeoTitle(platform, doc),
        description: getComponentMetaDescription(platform, doc),
        url: absoluteUrl(componentHref(platform, doc.slug)),
        about: `SwiftUI ${doc.seoName}`,
        proficiencyLevel: "Beginner",
        author,
        publisher: author,
        isPartOf: {
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: `${platformName} Components`,
            item: absoluteUrl(componentsHref(platform)),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: doc.name,
            item: absoluteUrl(componentHref(platform, doc.slug)),
          },
        ],
      },
    ],
  }
}
