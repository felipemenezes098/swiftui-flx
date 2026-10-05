import { DocsPlatformSync } from "@/components/core/docs/docs-platform-sync"
import { DocsSidebar } from "@/components/core/docs/docs-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider className="min-h-0">
      <DocsPlatformSync />
      <main className="container-page container-page-inner flex w-full gap-10 py-12 md:py-16">
        <DocsSidebar />
        <div className="flex w-full min-w-0 flex-1 flex-col">{children}</div>
      </main>
    </SidebarProvider>
  )
}
