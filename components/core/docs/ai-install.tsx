import { Sparkles } from "lucide-react"

import { CopyButton } from "@/components/core/copy-button"
import { getExistingProjectPrompt, getInstallPrompt } from "@/lib/llms"
import { cn } from "@/lib/utils"

const variants = {
  new: {
    title: "Install with AI",
    description:
      "Paste this into Claude Code, Cursor, Codex or your agent of choice. It reads the docs, checks your project and sets up the design system for you.",
    prompt: getInstallPrompt,
  },
  existing: {
    title: "Add to your app with AI",
    description:
      "Paste this into Claude Code, Cursor, Codex or your agent of choice. It studies your app and shows you a plan before changing anything.",
    prompt: getExistingProjectPrompt,
  },
} as const

function AiInstall({
  variant = "new",
  className,
}: {
  variant?: keyof typeof variants
  className?: string
}) {
  const { title, description, prompt: getPrompt } = variants[variant]
  const prompt = getPrompt()

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl bg-muted/30 p-5 ring-1 ring-border/60",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 font-medium">
            <Sparkles className="size-4 text-muted-foreground" />
            {title}
          </p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <CopyButton
          content={prompt}
          label="Copy prompt"
          variant="default"
          className="shrink-0"
        />
      </div>
      <pre className="relative max-h-32 overflow-hidden rounded-lg bg-background mask-b-from-40% p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap text-muted-foreground ring-1 ring-border/60">
        {prompt}
      </pre>
    </div>
  )
}

export { AiInstall }
