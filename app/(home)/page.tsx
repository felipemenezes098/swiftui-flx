import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { createPageMetadata } from "@/lib/metadata"

import { HeroSection } from "./components/hero-section"
import { PlatformShowcase } from "./components/showcase/platform-showcase"

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.title,
  imageTitle: siteConfig.tagline,
  description: siteConfig.description,
  path: "/",
})

export default function HomePage() {
  return (
    <main className="container-page container-page-inner flex flex-col gap-16 overflow-x-clip pt-16 pb-24 lg:gap-20 lg:pt-24">
      <HeroSection />
      <PlatformShowcase />
    </main>
  )
}
