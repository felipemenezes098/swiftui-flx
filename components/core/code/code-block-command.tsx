"use client"

import * as React from "react"

import { TerminalIcon } from "lucide-react"

import { CopyButton } from "@/components/core/copy-button"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useConfig } from "@/hooks/use-config"
import { useHydrated } from "@/hooks/use-hydrated"
import { cwdSuffix } from "@/lib/swift-package"
import { cn } from "@/lib/utils"

import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
} from "./code-block"
import { CodeBlockShikiClient } from "./code-block-shiki-client"
import { SwiftPackagePath } from "./swift-package-path"

type PackageManager = "npm" | "pnpm" | "yarn" | "bun"

interface CodeBlockCommandProps {
  /** The bare command run through a package-manager runner, e.g. "shadcn@latest add <url>". */
  command: string
  className?: string
}

/** `npx`/`pnpm dlx`/`yarn dlx`/`bun x` tabs for a single dlx-style command. */
function CodeBlockCommand({
  command,
  className,
}: Readonly<CodeBlockCommandProps>) {
  const [config, setConfig] = useConfig()
  const hydrated = useHydrated()
  const packageManager = config.packageManager
  const fullCommand = `${command}${cwdSuffix(config.swiftPackage, config.swiftPackagePath)}`

  const commands: Record<PackageManager, string> = {
    pnpm: `pnpm dlx ${fullCommand}`,
    npm: `npx ${fullCommand}`,
    yarn: `yarn dlx ${fullCommand}`,
    bun: `bunx ${fullCommand}`,
  }

  return (
    <CodeBlock className={className}>
      <Tabs
        key={String(hydrated)}
        value={packageManager}
        className="w-full gap-0"
        onValueChange={(value) =>
          setConfig({ ...config, packageManager: value as PackageManager })
        }
      >
        <CodeBlockHeader className="flex-wrap gap-2">
          <CodeBlockGroup>
            <div className="flex size-7 items-center justify-center rounded-md border">
              <TerminalIcon className="size-3.5" />
            </div>
            <TabsList className="h-7 gap-1 bg-transparent p-0">
              {Object.keys(commands).map((key) => (
                <TabsTrigger
                  key={key}

                  value={key}
                  className="h-7 rounded-md px-2 text-xs font-medium group-data-[variant=default]/tabs-list:data-active:border group-data-[variant=default]/tabs-list:data-active:border-border group-data-[variant=default]/tabs-list:data-active:bg-transparent group-data-[variant=default]/tabs-list:data-active:shadow-none"
                >
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
          </CodeBlockGroup>
          <div className="ml-auto flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              aria-pressed={config.swiftPackage}
              onClick={() =>
                setConfig({ ...config, swiftPackage: !config.swiftPackage })
              }
              className={cn(
                "h-7 rounded-md border px-2 text-xs font-medium shadow-none",
                config.swiftPackage && "border-border text-foreground",
                !config.swiftPackage &&
                  "border-transparent text-muted-foreground"
              )}
            >
              Swift package
            </Button>
            <CopyButton
              content={commands[packageManager]}
              variant="ghost"
              size="sm"
              className="h-7 shrink-0 bg-transparent px-2 text-muted-foreground shadow-none hover:bg-muted"
            />
          </div>
        </CodeBlockHeader>
        {config.swiftPackage && <SwiftPackagePath />}
        <CodeBlockContent>
          {Object.entries(commands).map(([key, value]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <CodeBlockShikiClient code={value} language="bash" />
            </TabsContent>
          ))}
        </CodeBlockContent>
      </Tabs>
    </CodeBlock>
  )
}

export { CodeBlockCommand }
