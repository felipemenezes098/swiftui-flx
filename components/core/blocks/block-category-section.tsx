interface BlockCategorySectionProps {
  id: string
  name: string
  children: React.ReactNode
}

export function BlockCategorySection({
  id,
  name,
  children,
}: Readonly<BlockCategorySectionProps>) {
  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-4">
      <h2 className="text-sm text-muted-foreground">{name}</h2>
      <div className="grid gap-6 md:grid-cols-2">{children}</div>
    </section>
  )
}
