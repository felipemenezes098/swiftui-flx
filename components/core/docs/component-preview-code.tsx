import { CodeBlockFromFile } from "@/components/core/code/code-block-from-file"
import type { Languages } from "@/components/core/code/shiki-highlighter"
import {
  ComponentPreview,
  type ComponentPreviewImage,
} from "@/components/core/docs/component-preview"
import type { Platform } from "@/lib/docs"
import { cn } from "@/lib/utils"

interface ComponentPreviewCodeProps {
  image?: string | ComponentPreviewImage
  alt?: string
  platform?: Platform
  filePath?: string
  code?: string
  title?: string
  language?: Languages
  collapsible?: boolean
  className?: string
}

function ComponentPreviewCode({
  image,
  alt,
  platform,
  filePath,
  code,
  title,
  language,
  collapsible,
  className,
}: Readonly<ComponentPreviewCodeProps>) {
  return (
    <div className={cn("flex flex-col", className)}>
      <ComponentPreview
        image={image}
        alt={alt}
        platform={platform}
        className="rounded-b-none"
      />
      <CodeBlockFromFile
        filePath={filePath}
        code={code}
        title={title}
        language={language}
        collapsible={collapsible}
        className={cn(
          "my-0 dark:bg-background",
          image && "rounded-t-none border-t-0"
        )}
      />
    </div>
  )
}

export { ComponentPreviewCode }
