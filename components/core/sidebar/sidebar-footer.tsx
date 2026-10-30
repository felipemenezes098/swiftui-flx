import Link from "next/link"

import { Logo } from "@/components/core/logo"
import { ThemeSwitcher } from "@/components/core/navbar/theme"
import { SettingsDialog } from "@/components/core/settings/settings-dialog"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"

const iconLinkClassName = buttonVariants({
  variant: "ghost",
  size: "icon",
  className:
    "h-8 w-8 text-muted-foreground transition-none hover:text-foreground",
})

export function SidebarFooter() {
  return (
    <div className="-ml-2 flex items-center gap-1">
      <Link
        href={siteConfig.links.twitter}
        target="_blank"
        aria-label="X"
        className={iconLinkClassName}
      >
        <Logo.X className="size-3" />
      </Link>
      <Link
        href={siteConfig.links.github}
        target="_blank"
        aria-label="GitHub"
        className={iconLinkClassName}
      >
        <Logo.Github className="size-4" />
      </Link>
      <ThemeSwitcher />
      <SettingsDialog />
    </div>
  )
}
