interface SidebarSectionProps {
  label: string
  children: React.ReactNode
}

export function SidebarSection({
  label,
  children,
}: Readonly<SidebarSectionProps>) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="mb-2 text-xs text-muted-foreground/60">{label}</p>
      {children}
    </div>
  )
}
