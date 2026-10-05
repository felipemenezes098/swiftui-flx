import type { ComponentPreviewImage as PreviewImage } from "@/components/core/docs/component-preview"
import { ComponentPreviewImage } from "@/components/core/docs/component-preview-image"
import { IPhone, IPhoneScreen } from "@/components/core/iphone"
import { MacWindow } from "@/components/core/mac-window"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PresetPreviewProps {
  ios: PreviewImage
  mac: PreviewImage
  alt: string
  className?: string
}

function PresetPreview({
  ios,
  mac,
  alt,
  className,
}: Readonly<PresetPreviewProps>) {
  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center gap-10 rounded-xl border px-6 py-12 ring-0 xl:flex-row xl:gap-8 dark:bg-background",
        className
      )}
    >
      <IPhone size="default" className="mx-0 shrink-0">
        <IPhoneScreen className="relative">
          <ComponentPreviewImage
            light={ios.light}
            dark={ios.dark}
            alt={`${alt} on iPhone`}
          />
        </IPhoneScreen>
      </IPhone>
      <MacWindow className="mx-0 min-w-0">
        <ComponentPreviewImage
          light={mac.light}
          dark={mac.dark}
          alt={`${alt} on Mac`}
        />
      </MacWindow>
    </Card>
  )
}

export { PresetPreview }
