import { Badge } from "@/components/ui/badge"
import { getComponentAvailability, type Platform } from "@/lib/docs"

interface DocsAvailabilityProps {
  platform: Platform
  slug: string
}

function DocsAvailability({ platform, slug }: Readonly<DocsAvailabilityProps>) {
  const { releases, unavailable } = getComponentAvailability(platform, slug)

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {releases.map((release) => (
        <Badge key={release} variant="secondary">
          {release}
        </Badge>
      ))}
      {unavailable.map((item) => (
        <Badge
          key={item.id}
          variant="outline"
          className="text-muted-foreground"
        >
          Not available on {item.name}
        </Badge>
      ))}
    </div>
  )
}

export { DocsAvailability }
