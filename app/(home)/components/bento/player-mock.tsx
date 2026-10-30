/* eslint-disable @next/next/no-img-element */
import { Pause, SkipBack, SkipForward } from "lucide-react"

const track = {
  title: "Night Drive",
  subtitle: "Synthwave",
  image:
    "https://images.unsplash.com/photo-1675830028194-02f405ff664b?q=75&w=600&auto=format&fit=crop",
}

export function PlayerMock() {
  return (
    <div className="flex w-full max-w-[16rem] flex-col gap-3 rounded-[var(--radius)] border border-border bg-card p-3.5 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={track.image}
          alt={track.title}
          className="size-12 rounded-[calc(var(--radius)*0.7)] object-cover ring-1 ring-border"
        />
        <div className="min-w-0">
          <p className="text-[9px] font-medium tracking-wide text-muted-foreground uppercase">
            Now playing
          </p>
          <p className="truncate text-[12px] font-semibold text-foreground">
            {track.title}
          </p>
          <p className="truncate text-[10px] text-muted-foreground">
            {track.subtitle}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <span className="h-1 overflow-hidden rounded-full bg-muted">
          <span className="block h-full w-[62%] rounded-full bg-primary" />
        </span>
        <div className="flex justify-between text-[8px] text-muted-foreground tabular-nums">
          <span>2:14</span>
          <span>-1:22</span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5 text-foreground">
        <SkipBack className="size-3.5 fill-current" />
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Pause className="size-3.5 fill-current" />
        </span>
        <SkipForward className="size-3.5 fill-current" />
      </div>
    </div>
  )
}
