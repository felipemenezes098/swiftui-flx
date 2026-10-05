import { imageUrl } from "@/lib/image-url"
import { cn } from "@/lib/utils"

interface ComponentPreviewImageProps {
  light: string
  dark?: string
  alt?: string
}

function ComponentPreviewImage({
  light,
  dark,
  alt,
}: Readonly<ComponentPreviewImageProps>) {
  const hasDark = Boolean(dark) && dark !== light

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl(light)}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
        className={cn(
          "absolute inset-0 size-full object-cover",
          hasDark && "dark:hidden"
        )}
      />
      {hasDark && dark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl(dark)}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 hidden size-full object-cover dark:block"
        />
      )}
    </>
  )
}

export { ComponentPreviewImage }
