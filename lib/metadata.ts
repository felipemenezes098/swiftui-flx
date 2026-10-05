import type { Metadata } from "next"

import { siteConfig } from "@/config/site"

interface PageMetadataOptions {
  title: string
  imageTitle: string
  description: string
  path: string
}

export function createOgImageUrl(title: string, description: string) {
  const params = new URLSearchParams({ title, description })
  return `/og?${params.toString()}`
}

export function createPageMetadata({
  title,
  imageTitle,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const image = createOgImageUrl(imageTitle, description)

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      url: path,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageTitle }],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [image],
    },
  }
}

export function createDocTitle(name: string) {
  return `${name} - ${siteConfig.name}`
}
