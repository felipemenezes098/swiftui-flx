export default function MeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 md:py-16">{children}</main>
  )
}
