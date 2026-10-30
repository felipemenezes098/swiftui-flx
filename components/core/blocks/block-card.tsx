"use client"

import { CodeIcon } from "lucide-react"

import { CopyButton } from "@/components/core/copy-button"
import { BlockPrompt } from "@/components/core/blocks/block-prompt"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const actionClassName =
  "h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"

interface BlockCardProps {
  name: string
  media: React.ReactNode
  code: React.ReactNode
  prompt: string
}

export function BlockCard({
  name,
  media,
  code,
  prompt,
}: Readonly<BlockCardProps>) {
  return (
    <div className="flex flex-col gap-2">
      {media}
      <div className="flex items-center justify-between gap-2 pl-1">
        <span className="truncate text-sm">{name}</span>
        <div className="flex items-center gap-0.5">
          <CopyButton
            content={prompt}
            label="Prompt"
            iconClassName="size-3"
            variant="ghost"
            size="sm"
            className={actionClassName}
          />
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label={`View ${name} code`}
                  className={actionClassName}
                >
                  <CodeIcon className="size-3" />
                  Code
                </Button>
              }
            />
            <DialogContent className="max-h-[95vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
              </DialogHeader>
              <div className="flex max-w-full min-w-0 flex-col gap-3">
                <BlockPrompt prompt={prompt} />
                {code}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
