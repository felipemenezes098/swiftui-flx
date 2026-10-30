import { ComponentPreviewImage } from "@/components/core/docs/component-preview-image"
import { IPhone, IPhoneScreen } from "@/components/core/iphone"
import { MacWindow } from "@/components/core/mac-window"
import { blockImage } from "@/lib/blocks"
import type { Platform } from "@/lib/docs"
import { cn } from "@/lib/utils"

interface BlockMediaProps {
  platform: Platform
  slug: string
  name: string
}

export function BlockMedia({
  platform,
  slug,
  name,
}: Readonly<BlockMediaProps>) {
  const image = blockImage(platform, slug)

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg border border-border/60 px-6",
        platform === "ios" && "aspect-[4/5]",
        platform === "mac" && "aspect-[4/3]"
      )}
    >
      {platform === "ios" && (
        <IPhone size="sm" className="shadow-lg">
          <IPhoneScreen className="relative">
            <ComponentPreviewImage
              light={image.light}
              dark={image.dark}
              alt={name}
            />
          </IPhoneScreen>
        </IPhone>
      )}
      {platform === "mac" && (
        <MacWindow className="shadow-lg">
          <ComponentPreviewImage
            light={image.light}
            dark={image.dark}
            alt={name}
          />
        </MacWindow>
      )}
    </div>
  )
}
