import { CopyButton } from "@/components/core/copy-button"
import { extractCodeFromFilePath } from "@/lib/code"
import { cn } from "@/lib/utils"

import {
  CodeBlock,
  CodeBlockCollapsible,
  CodeBlockCollapsiblePanel,
  CodeBlockCollapsibleTrigger,
  CodeBlockContent,
  CodeBlockGroup,
  CodeBlockHeader,
} from "./code-block"
import { CodeBlockShiki } from "./code-block-shiki"
import type { Languages } from "./shiki-highlighter"

interface CodeBlockFromFileProps {
  filePath?: string
  code?: string
  language?: Languages
  title?: string
  collapsible?: boolean
  className?: string
}

async function CodeBlockFromFile({
  filePath,
  code,
  language = "swift",
  title,
  collapsible = false,
  className,
}: Readonly<CodeBlockFromFileProps>) {
  const resolvedCode = filePath ? extractCodeFromFilePath(filePath) : code

  if (!resolvedCode) return null

  const content = (
    <CodeBlockContent className="max-h-[480px]">
      <CodeBlockShiki code={resolvedCode} language={language} />
    </CodeBlockContent>
  )

  const header = title ? (
    <CodeBlockHeader>
      <CodeBlockGroup>
        <span className="min-w-0 truncate text-sm font-medium">{title}</span>
      </CodeBlockGroup>
      <div className="flex shrink-0 items-center gap-1">
        {collapsible ? <CodeBlockCollapsibleTrigger /> : null}
        <CopyButton
          content={resolvedCode}
          variant="ghost"
          size="sm"
          className="h-7 shrink-0 bg-transparent px-2 text-muted-foreground shadow-none hover:bg-muted"
        />
      </div>
    </CodeBlockHeader>
  ) : (
    <CopyButton
      content={resolvedCode}
      variant="ghost"
      size="sm"
      className="absolute top-2 right-2 z-10 h-7 bg-transparent px-2 text-muted-foreground shadow-none hover:bg-muted"
    />
  )

  return (
    <CodeBlock className={cn("relative my-6", className)}>
      {collapsible ? (
        <CodeBlockCollapsible defaultOpen={false}>
          {header}
          <CodeBlockCollapsiblePanel>{content}</CodeBlockCollapsiblePanel>
        </CodeBlockCollapsible>
      ) : (
        <>
          {header}
          {content}
        </>
      )}
    </CodeBlock>
  )
}

export { CodeBlockFromFile }
