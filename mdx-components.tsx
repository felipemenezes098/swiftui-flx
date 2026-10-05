import type { MDXComponents } from "mdx/types"

import { CodeBlock, CodeBlockContent } from "@/components/core/code/code-block"
import { CodeBlockCommand } from "@/components/core/code/code-block-command"
import { CodeBlockFromFile } from "@/components/core/code/code-block-from-file"
import { CodeBlockShiki } from "@/components/core/code/code-block-shiki"
import { CodeTabs } from "@/components/core/code/code-tabs"
import type { Languages } from "@/components/core/code/shiki-highlighter"
import { CopyButton } from "@/components/core/copy-button"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComponentPreview } from "@/components/core/docs/component-preview"
import { ComponentPreviewCode } from "@/components/core/docs/component-preview-code"
import { AiInstall } from "@/components/core/docs/ai-install"
import { PresetPreview } from "@/components/core/docs/preset-preview"
import { DocsHeader } from "@/components/core/docs/docs-header"
import { Card } from "@/components/ui/card"
import { createSlugger } from "@/lib/slugify"
import { cn } from "@/lib/utils"

const supportedLanguages = [
  "bash",
  "css",
  "html",
  "js",
  "json",
  "markdown",
  "swift",
  "ts",
  "tsx",
] as const

/** Pulls the code string + fence language (```swift) out of the `<code>` MDX hands `pre`. */
function codePropsFromChildren(children: React.ReactNode) {
  const codeElement = children as
    | React.ReactElement<{ className?: string; children?: React.ReactNode }>
    | undefined

  const match = /language-(\w+)/.exec(codeElement?.props?.className ?? "")
  const lang = match?.[1]
  const language = (
    (supportedLanguages as readonly string[]).includes(lang ?? "")
      ? lang
      : "bash"
  ) as Languages

  const code =
    typeof codeElement?.props?.children === "string"
      ? codeElement.props.children.trimEnd()
      : ""

  return { code, language }
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const slugify = createSlugger()
  const headingId = (children: React.ReactNode) =>
    slugify(typeof children === "string" ? children : "section")

  return {
    ...components,
    h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
      <h1
        {...props}
        className="mt-2 scroll-m-20 text-3xl font-bold tracking-tight"
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
      <h2
        id={headingId(children)}
        {...props}
        className="mt-12 scroll-m-20 text-xl font-medium tracking-tight first:mt-0"
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
      <h3
        id={headingId(children)}
        {...props}
        className="mt-8 scroll-m-20 text-base font-medium tracking-tight"
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
      <p {...props} className="leading-7 not-first:mt-4">
        {children}
      </p>
    ),
    a: ({ children, ...props }: React.ComponentProps<"a">) => (
      <a
        {...props}
        className="font-medium text-primary underline underline-offset-4"
      >
        {children}
      </a>
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className
        )}
        {...props}
      />
    ),
    pre: async ({ children }: React.HTMLAttributes<HTMLPreElement>) => {
      const { code, language } = codePropsFromChildren(children)

      return (
        <CodeBlock className="relative my-6">
          <CodeBlockContent>
            <CodeBlockShiki code={code} language={language} />
          </CodeBlockContent>
          <CopyButton
            content={code}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-7 bg-transparent px-2 text-muted-foreground shadow-none hover:bg-muted"
          />
        </CodeBlock>
      )
    },
    table: ({ className, ...props }: React.ComponentProps<"table">) => (
      <Card className="my-6 w-full gap-0 py-0">
        <div className="w-full overflow-x-auto">
          <table className={cn("w-full text-sm", className)} {...props} />
        </div>
      </Card>
    ),
    thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
      <thead className={cn("bg-muted/50", className)} {...props} />
    ),
    tbody: ({ className, ...props }: React.ComponentProps<"tbody">) => (
      <tbody className={cn("divide-y", className)} {...props} />
    ),
    tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
      <tr className={cn("", className)} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<"th">) => (
      <th
        className={cn(
          "px-4 py-2 text-left align-middle font-medium",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.ComponentProps<"td">) => (
      <td className={cn("px-4 py-2 align-middle", className)} {...props} />
    ),
    hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
      <hr className="mt-14" {...props} />
    ),
    Steps: (props: React.HTMLAttributes<HTMLDivElement>) => (
      <div
        className="steps mt-5 ml-4 space-y-7 border-l pl-8 [counter-reset:step] md:ml-4"
        {...props}
      />
    ),
    Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn(
          "step relative mt-8 scroll-m-20 text-base font-medium tracking-tight first:mt-4",
          className
        )}
        {...props}
      />
    ),
    Callout: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLDivElement>) => (
      <div
        className={cn(
          "mt-5 rounded-xl bg-muted/30 p-4 text-sm leading-relaxed [&>p]:m-0",
          className
        )}
        {...props}
      />
    ),
    ComponentPreview: (
      props: React.ComponentProps<typeof ComponentPreview>
    ) => (
      <ComponentPreview
        {...props}
        className={cn("mt-6 first:mt-0", props.className)}
      />
    ),
    AiInstall: (props: React.ComponentProps<typeof AiInstall>) => (
      <AiInstall {...props} className={cn("mt-6", props.className)} />
    ),
    PresetPreview: (props: React.ComponentProps<typeof PresetPreview>) => (
      <PresetPreview
        {...props}
        className={cn("mt-6 first:mt-0", props.className)}
      />
    ),
    ComponentPreviewCode: (
      props: React.ComponentProps<typeof ComponentPreviewCode>
    ) => (
      <ComponentPreviewCode
        {...props}
        className={cn("mt-6 first:mt-0", props.className)}
      />
    ),
    CodeBlockFromFile,
    CodeBlockCommand,
    DocsHeader,
    CodeTabs: (props: React.ComponentProps<typeof CodeTabs>) => (
      <CodeTabs {...props} className="mt-6" />
    ),
    TabsList: (props: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        variant="line"
        className="justify-start gap-4 px-0"
        {...props}
      />
    ),
    TabsTrigger,
    TabsContent: (props: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent className="mt-4" {...props} />
    ),
  }
}
