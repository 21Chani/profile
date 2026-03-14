import { useState, useEffect, useCallback } from "react"

export type Theme = "dark" | "light"

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme")
  if (stored === "dark" || stored === "light") return stored
  return "dark"
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem("theme", theme)
    document.dispatchEvent(new CustomEvent("themechange"))
  }, [theme])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const toggleTheme = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), [])

  return { theme, setTheme, toggleTheme } as const
}
