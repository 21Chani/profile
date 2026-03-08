import { useMemo } from "react"

const CHARS = ".·:;|{}()<>=/\\~+-_[]$#@!?*^%&0123456789abcdef"
const COL_SPACING = 20
const BRIGHTNESSES = ["normal", "bright", "dim"] as const

type Brightness = (typeof BRIGHTNESSES)[number]

interface MatrixColumn {
  id: number
  left: number
  brightness: Brightness
  duration: number
  delay: number
  chars: string[]
}

const brightnessColor: Record<Brightness, string> = {
  normal: "text-white/[0.045]",
  bright: "text-white/[0.09]",
  dim: "text-white/[0.02]",
}

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

function generateColumns(count: number): MatrixColumn[] {
  return Array.from({ length: count }, (_, i) => {
    const duration = 25 + Math.random() * 35
    return {
      id: i,
      left: (i / count) * 100 + (Math.random() - 0.5) * 4,
      brightness: BRIGHTNESSES[Math.floor(Math.random() * 3)],
      duration,
      delay: -(Math.random() * duration),
      chars: Array.from({ length: 8 + Math.floor(Math.random() * 13) }, randomChar),
    }
  })
}

export function MatrixRain() {
  const columns = useMemo(() => {
    // SSR-safe: default to a reasonable count, but use window width if available
    const width = typeof window !== "undefined" ? window.innerWidth : 1440
    return generateColumns(Math.floor(width / COL_SPACING))
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden max-md:hidden"
      style={{
        maskImage: "radial-gradient(ellipse 85% 75% at 55% 50%, black 25%, transparent 72%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 85% at 50% 45%, black 25%, transparent 72%)",
      }}
      aria-hidden="true"
    >
      {columns.map((col) => (
        <div
          key={col.id}
          className={`absolute top-0 flex flex-col font-mono text-xs leading-5.5 select-none pointer-events-none animate-matrix-fall will-change-transform ${brightnessColor[col.brightness]}`}
          style={{
            left: `${col.left}%`,
            animationDuration: `${col.duration}s`,
            animationDelay: `${col.delay}s`,
          }}
        >
          {col.chars.map((char, j) => (
            <span key={j} className="block text-center w-3.5">
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
