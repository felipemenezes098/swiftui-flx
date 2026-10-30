import { DocsPlatformSync } from "@/components/core/docs/docs-platform-sync"

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="container-page container-page-inner flex w-full pt-12 pb-16 md:pt-20">
      <DocsPlatformSync />
      <div className="flex w-full min-w-0 flex-1 flex-col">{children}</div>
    </main>
  )
}
