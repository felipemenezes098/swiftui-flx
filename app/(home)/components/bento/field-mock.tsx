import { cn } from "@/lib/utils"

interface FieldMockProps {
  label: string
  value: string
  trailing?: string
  focused?: boolean
}

export function FieldMock({
  label,
  value,
  trailing,
  focused,
}: Readonly<FieldMockProps>) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[10px]">
        <span className="font-medium text-foreground">{label}</span>
        {trailing && <span className="text-muted-foreground">{trailing}</span>}
      </div>
      <span
        className={cn(
          "flex h-6 items-center rounded-[calc(var(--radius)*0.6)] border bg-card px-2 text-[10px] text-foreground",
          focused && "border-ring ring-1 ring-ring",
          !focused && "border-input"
        )}
      >
        {value}
      </span>
    </div>
  )
}
