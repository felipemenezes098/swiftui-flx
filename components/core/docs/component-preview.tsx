import { ComponentPreviewImage } from "@/components/core/docs/component-preview-image"
import { IPhone, IPhoneScreen } from "@/components/core/iphone"
import { MacWindow } from "@/components/core/mac-window"
import type { Platform } from "@/lib/docs"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface ComponentPreviewImage {
  light: string
  dark: string
}

export type { ComponentPreviewImage }

interface ComponentPreviewProps {
  image?: string | ComponentPreviewImage
  alt?: string
  platform?: Platform
  className?: string
}

function ComponentPreview({
  image,
  alt,
  platform = "ios",
  className,
}: Readonly<ComponentPreviewProps>) {
  const light = typeof image === "string" ? image : image?.light
  const dark = typeof image === "string" ? image : image?.dark
  if (!light) return null

  return (
    <Card
      className={cn(
        "flex items-center justify-center rounded-xl border px-6 py-12 ring-0 dark:bg-background",
        className
      )}
    >
      {platform === "ios" && (
        <IPhone size="default">
          <IPhoneScreen className="relative">
            <ComponentPreviewImage light={light} dark={dark} alt={alt} />
          </IPhoneScreen>
        </IPhone>
      )}
      {platform === "mac" && (
        <MacWindow>
          <ComponentPreviewImage light={light} dark={dark} alt={alt} />
        </MacWindow>
      )}
    </Card>
  )
}

export { ComponentPreview }
