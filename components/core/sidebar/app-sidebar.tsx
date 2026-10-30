import { SidebarBlocksFilters } from "./sidebar-blocks-filters"
import { SidebarDocsNav } from "./sidebar-docs-nav"
import { SidebarFooter } from "./sidebar-footer"
import { SidebarLogo } from "./sidebar-logo"
import { SidebarNav } from "./sidebar-nav"

export function AppSidebar() {
  return (
    <aside
      aria-label="Main navigation"
      className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col px-8 pt-10 pb-5 md:flex"
    >
      <SidebarLogo />
      <div className="-mx-2 mt-10 no-scrollbar flex min-h-0 flex-1 scroll-fade-y flex-col gap-10 overflow-y-auto px-2 pt-2 pb-6">
        <SidebarNav />
        <SidebarDocsNav />
        <SidebarBlocksFilters />
      </div>
      <SidebarFooter />
    </aside>
  )
}
