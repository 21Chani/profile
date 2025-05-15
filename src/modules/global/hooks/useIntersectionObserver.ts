import { useEffect } from "react"

export function useIntersectionObserver(
  element: HTMLElement | null,
  { onAppear, onLeave, ...options }: { onAppear?: () => void; onLeave?: () => void } & IntersectionObserverInit
) {
  useEffect(() => {
    if (!element) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      if (entry.isIntersecting) onAppear?.()
      else onLeave?.()
    }, options)

    observer.observe(element)

    return () => observer.disconnect()
  }, [element, onAppear, onLeave])
}
