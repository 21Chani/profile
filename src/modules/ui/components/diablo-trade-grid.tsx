import { useEffect, useRef } from "react"

const symbols = ["⚔", "◈", "☆", "♦"]

interface Cell {
  filled: boolean
  symbol: string
  alpha: number
  targetAlpha: number
  timer: number
}

export function DiabloTradeGrid({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({ frame: 0, cells: [] as Cell[], cols: 0, rows: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const dpr = window.devicePixelRatio || 1
    let w = 0
    let h = 0
    let rafId = 0

    const cellSize = 52
    const gap = 3
    const step = cellSize + gap
    const state = stateRef.current

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + "px"
      canvas!.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      state.cols = Math.ceil(w / step) + 2
      state.rows = Math.ceil(h / step) + 2

      state.cells = []
      for (let r = 0; r < state.rows; r++) {
        for (let c = 0; c < state.cols; c++) {
          const filled = Math.random() < 0.08
          state.cells.push({
            filled,
            symbol: symbols[Math.floor(Math.random() * symbols.length)],
            alpha: filled ? 0.04 + Math.random() * 0.03 : 0,
            targetAlpha: filled ? 0.04 + Math.random() * 0.03 : 0,
            timer: 500 + Math.random() * 1500,
          })
        }
      }
    }

    function draw() {
      state.frame++
      ctx.clearRect(0, 0, w, h)

      const { cols, rows, cells, frame } = state
      const offsetX = (w % step) / 2 - step
      const offsetY = (h % step) / 2 - step
      const gridTop = h * 0.1
      const gridBot = h * 0.9

      // Clip grid to middle zone
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, gridTop, w, gridBot - gridTop)
      ctx.clip()

      ctx.font = '16px "JetBrains Mono", monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c
          const cell = cells[idx]
          const x = offsetX + c * step
          const y = offsetY + r * step

          // Cell border
          ctx.strokeStyle = "rgba(255,255,255,0.015)"
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, cellSize, cellSize)

          // Slow timer
          cell.timer--
          if (cell.timer <= 0) {
            if (cell.filled) {
              cell.targetAlpha = 0
              cell.timer = 800 + Math.random() * 2000
            } else if (Math.random() < 0.15) {
              cell.symbol = symbols[Math.floor(Math.random() * symbols.length)]
              cell.targetAlpha = 0.04 + Math.random() * 0.03
              cell.filled = true
              cell.timer = 600 + Math.random() * 1500
            } else {
              cell.timer = 400 + Math.random() * 1000
            }
          }

          // Very slow fade
          if (cell.alpha < cell.targetAlpha) {
            cell.alpha = Math.min(cell.alpha + 0.0008, cell.targetAlpha)
          } else if (cell.alpha > cell.targetAlpha) {
            cell.alpha = Math.max(cell.alpha - 0.0008, cell.targetAlpha)
            if (cell.alpha <= 0.001) {
              cell.filled = false
              cell.alpha = 0
            }
          }

          if (cell.alpha > 0.001) {
            ctx.fillStyle = "rgba(255,255,255," + cell.alpha.toFixed(4) + ")"
            ctx.fillText(cell.symbol, x + cellSize / 2, y + cellSize / 2)
          }
        }
      }

      ctx.restore()

      // ── TOP — WebSocket status bar ──
      ctx.strokeStyle = "rgba(255,255,255,0.025)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(w * 0.04, h * 0.07)
      ctx.lineTo(w * 0.96, h * 0.07)
      ctx.stroke()

      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.textBaseline = "middle"
      const topY = h * 0.038

      const blink = Math.sin(frame * 0.05) > 0
      ctx.textAlign = "left"

      if (blink) {
        ctx.beginPath()
        ctx.arc(w * 0.05, topY, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.08)"
        ctx.fill()
      }

      ctx.fillStyle = "rgba(255,255,255,0.045)"
      ctx.fillText("ws://live", w * 0.06, topY)

      ctx.fillStyle = "rgba(255,255,255,0.035)"
      ctx.fillText("●  CONNECTED", w * 0.14, topY)

      const latency = 11 + Math.floor(Math.sin(frame * 0.02) * 3 + Math.sin(frame * 0.007) * 2)
      ctx.fillText("│", w * 0.3, topY)
      ctx.fillText("latency: " + latency + "ms", w * 0.32, topY)

      ctx.fillText("│", w * 0.48, topY)
      ctx.fillText("uptime: 99.8%", w * 0.5, topY)

      const evts = 42 + Math.floor(Math.sin(frame * 0.013) * 8)
      ctx.textAlign = "right"
      ctx.fillText("events/s: " + evts, w * 0.95, topY)

      // ── BOTTOM — Search index stats ──
      ctx.strokeStyle = "rgba(255,255,255,0.025)"
      ctx.beginPath()
      ctx.moveTo(w * 0.04, h * 0.935)
      ctx.lineTo(w * 0.96, h * 0.935)
      ctx.stroke()

      const botY = h * 0.965
      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.textAlign = "left"
      ctx.fillStyle = "rgba(255,255,255,0.04)"

      ctx.fillText("indexed: 14,247 items", w * 0.05, botY)

      ctx.fillStyle = "rgba(255,255,255,0.03)"
      ctx.fillText("│", w * 0.24, botY)

      const qps = 840 + Math.floor(Math.sin(frame * 0.011) * 30)
      ctx.fillText("queries/s: " + qps, w * 0.26, botY)

      ctx.fillText("│", w * 0.42, botY)
      ctx.fillText("cache: HIT 94.2%", w * 0.44, botY)

      ctx.textAlign = "right"
      ctx.fillStyle = "rgba(255,255,255,0.035)"
      ctx.fillText("MARKETPLACE  ·  LIVE", w * 0.95, botY)

      rafId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement!)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      />
    </div>
  )
}
