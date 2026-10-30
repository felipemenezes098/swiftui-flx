import { MacWindow } from "@/components/core/mac-window"

import { AppleLogo } from "./apple-logo"
import { FieldMock } from "./field-mock"

export function SignInWindow() {
  return (
    <MacWindow className="relative max-w-[34rem] shadow-2xl shadow-black/10">
      <div className="absolute inset-0 flex items-center justify-center bg-background">
        <div className="flex w-[13.5rem] flex-col gap-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="flex size-8 items-center justify-center rounded-[calc(var(--radius)*0.8)] bg-primary text-primary-foreground">
              ✦
            </span>
            <p className="text-[15px] font-bold text-foreground">
              Welcome back
            </p>
            <p className="-mt-1.5 text-[10px] text-muted-foreground">
              Sign in to your account to continue.
            </p>
          </div>
          <span className="flex h-7 items-center justify-center gap-1 rounded-[calc(var(--radius)*0.6)] bg-black text-[11px] font-medium text-white dark:bg-white dark:text-black">
            <AppleLogo className="size-3" />
            Sign in with Apple
          </span>
          <div className="flex items-center gap-2 text-[9px] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="flex flex-col gap-2.5">
            <FieldMock label="Email" value="you@example.com" focused />
            <FieldMock
              label="Password"
              value="••••••••"
              trailing="Forgot password?"
            />
          </div>
          <p className="text-center text-[10px] text-muted-foreground">
            Don&apos;t have an account?{" "}
            <span className="font-medium text-foreground">Sign up</span>
          </p>
        </div>
      </div>
    </MacWindow>
  )
}
