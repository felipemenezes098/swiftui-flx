import * as React from "react"

export function useFitScale<T extends HTMLElement>(width: number, max = 1) {
  const ref = React.useRef<T>(null)
  const [scale, setScale] = React.useState<number | null>(null)

  React.useLayoutEffect(() => {
    const node = ref.current
    if (!node) return
    const update = () => setScale(Math.min(max, node.clientWidth / width))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [width, max])

  return { ref, scale }
}
