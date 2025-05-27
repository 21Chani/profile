import { useState } from "react"
import { useIntersectionObserver } from "./useIntersectionObserver"

export function useIntersectionObserverState(
  element: Parameters<typeof useIntersectionObserver>[0],
  { onAppear, onLeave, ...options }: Parameters<typeof useIntersectionObserver>[1] = {}
) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAppearing, setIsAppearing] = useState(false)
  const [isDisappearing, setIsDisappearing] = useState(false)

  useIntersectionObserver(element, {
    onAppear: (element, options) => {
      setIsVisible(true)
      setIsAppearing(true)
      setIsDisappearing(false)
      onAppear?.(element, options)
    },
    onLeave: (element, options) => {
      setIsVisible(false)
      setIsAppearing(false)
      setIsDisappearing(true)
      onLeave?.(element, options)
    },
    ...options,
  })

  return { isVisible, isAppearing, isDisappearing }
}
