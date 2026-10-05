import * as React from "react"

import { cn } from "@/lib/utils"

interface FlxThemeScopeProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: string
  appearance?: "inherit" | "dark"
}

function FlxThemeScope({
  theme,
  appearance = "inherit",
  className,
  ...props
}: FlxThemeScopeProps) {
  return (
    <div
      data-slot="flx-theme-scope"
      data-flx-theme={theme}
      className={cn(appearance === "dark" && "dark", className)}
      {...props}
    />
  )
}

export { FlxThemeScope }
