import * as React from "react"

function subscribe() {
  return () => {}
}

export function useHydrated() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  )
}
