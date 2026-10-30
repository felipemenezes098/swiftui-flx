import type { Metadata } from "next"

import { JsonLd } from "@/components/core/json-ld"
import { siteConfig } from "@/config/site"
import { createPageMetadata } from "@/lib/metadata"
import { getSiteStructuredData } from "@/lib/structured-data"

import { HeroSection } from "./components/hero-section"
import { BentoGrid } from "./components/bento/bento-grid"

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
    <main className="min-w-0 overflow-x-clip px-5 pt-12 pb-16 md:px-12 md:pt-24">
      <JsonLd data={getSiteStructuredData()} />
      <div className="mx-auto flex w-full max-w-[1080px] flex-col gap-14 md:gap-20">
        <HeroSection />
        <BentoGrid />
      </div>
    </main>
  )
}
