import { useState, useRef, useEffect } from "react"
import { useTheme, type Theme } from "../hooks/use-theme"

const options: { value: Theme; label: string }[] = [
  { value: "dark", label: "DARK" },
  { value: "light", label: "LIGHT" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onMouseDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle theme"
        className="text-terminal-text-dim text-xxs tracking-[2px] px-2.5 py-1.5 border border-transparent transition-all duration-300 hover:text-terminal-text-bright hover:border-terminal-border-mid cursor-pointer md:text-xs md:px-3.5 md:py-1.5"
      >
        ◐
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 min-w-[120px] bg-terminal-bg/95 backdrop-blur-[20px] border border-terminal-border-mid p-1 z-50">
          {options.map(({ value, label }) => {
            const active = theme === value
            return (
              <button
                key={value}
                onClick={() => {
                  setTheme(value)
                  setOpen(false)
                }}
                className={`w-full text-left text-xxs tracking-[2px] px-2.5 py-1.5 border border-transparent transition-all duration-300 cursor-pointer md:text-xs md:px-3.5 md:py-1.5 ${
                  active
                    ? "text-terminal-text-bright"
                    : "text-terminal-text-dim hover:text-terminal-text-bright"
                }`}
              >
                {active ? "■" : "□"} {label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
