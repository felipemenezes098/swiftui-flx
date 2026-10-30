import { Sparkles } from "lucide-react"

import { CopyButton } from "@/components/core/copy-button"

export function BlockPrompt({ prompt }: Readonly<{ prompt: string }>) {
  const summary = prompt.split("\n\n")[0]

  return (
    <div className="flex flex-col gap-1.5 rounded-xl border border-border/60 py-2.5 pr-2 pl-4">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs text-foreground">
          <Sparkles className="size-3 text-muted-foreground" />
          Prompt
        </span>
        <CopyButton
          content={prompt}
          label="Copy prompt"
          iconClassName="size-3"
          variant="ghost"
          size="sm"
          className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
        />
      </div>
      <p className="line-clamp-2 pr-2 text-xs leading-relaxed text-muted-foreground">
        {summary}
      </p>
    </div>
  )
}
