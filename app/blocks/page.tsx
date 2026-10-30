import type { Metadata } from "next"

import { BlockCard } from "@/components/core/blocks/block-card"
import { BlockMedia } from "@/components/core/blocks/block-media"
import { BlocksPlatformFilter } from "@/components/core/blocks/blocks-platform-filter"
import { BlocksPlatformGrid } from "@/components/core/blocks/blocks-platform-grid"
import { CodeBlockFromFile } from "@/components/core/code/code-block-from-file"
import { blockPrompt } from "@/lib/block-prompt"
import { blockFileName, blocks } from "@/lib/blocks"
import { platforms } from "@/lib/docs"
import { createPageMetadata } from "@/lib/metadata"

const description =
  "Ready-made SwiftUI screens for iPhone, iPad and Mac. Click one to copy its code or a prompt."

export const metadata: Metadata = createPageMetadata({
  title: "SwiftUI Blocks - swiftui-flx",
  imageTitle: "Blocks",
  description,
  path: "/blocks",
})

export default function BlocksPage() {
  return (
    <main className="min-w-0 px-5 pt-12 pb-16 md:px-12 md:pt-24">
      <div className="mx-auto flex w-full max-w-[880px] flex-col gap-8 md:gap-12">
        <header className="flex max-w-xl flex-col gap-3">
          <h1 className="text-base font-medium">Blocks</h1>
          <p className="text-base leading-relaxed text-pretty text-muted-foreground">
            {description}
          </p>
        </header>
        <div className="flex flex-col gap-4">
          <div className="md:hidden">
            <BlocksPlatformFilter />
          </div>
          {platforms.map((platform) => (
            <BlocksPlatformGrid key={platform.id} platform={platform.id}>
              {blocks.map((block) => (
                <BlockCard
                  key={block.slug}
                  name={block.name}
                  prompt={blockPrompt(block, platform.id)}
                  media={
                    <BlockMedia
                      platform={platform.id}
                      slug={block.slug}
                      name={block.name}
                    />
                  }
                  code={
                    <CodeBlockFromFile
                      filePath={block.files[platform.id]}
                      title={blockFileName(block, platform.id)}
                      className="my-0"
                    />
                  }
                />
              ))}
            </BlocksPlatformGrid>
          ))}
        </div>
      </div>
    </main>
  )
}
