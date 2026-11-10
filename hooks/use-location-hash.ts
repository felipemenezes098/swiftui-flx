import { useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

function getSnapshot() {
  return window.location.hash.slice(1)
}

function getServerSnapshot() {
  return ""
}

export function useLocationHash() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
