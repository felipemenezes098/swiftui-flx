export function DocsHeader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 [&>h1]:mt-0">
      {children}
    </div>
  )
}
