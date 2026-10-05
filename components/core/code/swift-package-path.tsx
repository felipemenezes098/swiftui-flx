"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { useConfig } from "@/hooks/use-config"
import { defaultSwiftPackagePath } from "@/lib/swift-package"

function SwiftPackagePath() {
  const [config, setConfig] = useConfig()
  const id = React.useId()

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-border/50 px-3 py-2">
      <label htmlFor={id} className="text-xs text-muted-foreground">
        Package path from your project folder
      </label>
      <Input
        id={id}
        value={config.swiftPackagePath}
        placeholder={defaultSwiftPackagePath}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        onChange={(event) =>
          setConfig({ ...config, swiftPackagePath: event.target.value })
        }
        className="h-7 min-w-0 flex-1 basis-56 font-mono text-xs"
      />
    </div>
  )
}

export { SwiftPackagePath }
