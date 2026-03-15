import { useState, useEffect } from "react"
import { type CanvasChannels, getCanvasChannels } from "../lib/theme-colors"

export function useCanvasChannels(): CanvasChannels {
  const [ch, setCh] = useState(() => {
    if (typeof window === "undefined") return { h: 0, s: 0, l: 100, boost: 1 }
    return getCanvasChannels()
  })

  useEffect(() => {
    function onThemeChange() {
      setCh(getCanvasChannels())
    }
    document.addEventListener("themechange", onThemeChange)
    return () => document.removeEventListener("themechange", onThemeChange)
  }, [])

  return ch
}
