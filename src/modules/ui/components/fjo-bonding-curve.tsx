import { useEffect, useRef } from "react"
import { getCanvasChannels, canvasColor } from "@/modules/global/lib/theme-colors"

function curveY(xNorm: number) {
  const decay = Math.exp(-3.2 * xNorm)
  const noise = Math.sin(xNorm * 42) * 0.008 + Math.sin(xNorm * 97) * 0.004
  return decay + noise
}

// Pre-generate volume bar data (deterministic)
const volBars: number[] = []
for (let v = 0; v < 36; v++) {
  const base = Math.exp(-2 * (v / 36)) * 0.8
  const spike = Math.abs(Math.sin(v * 7.3 + 2.1)) * 0.4 + Math.abs(Math.sin(v * 13.7)) * 0.2
  volBars.push(Math.min(1, base + spike * base))
}

export function FjoBondingCurve({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({ tracerT: 0, trail: [] as { x: number; y: number }[], frame: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const dpr = window.devicePixelRatio || 1
    let w = 0
    let h = 0
    let rafId = 0

    const padT = 0.05
    const padB = 0.06
    const tracerSpeed = 0.0012
    const trailMax = 40
    const state = stateRef.current
    let ch = getCanvasChannels()
    function onThemeChange() { ch = getCanvasChannels() }
    document.addEventListener("themechange", onThemeChange)

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + "px"
      canvas!.style.height = h + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw() {
      state.frame++
      ctx.clearRect(0, 0, w, h)

      const chartL = w * 0.04
      const chartR = w * 0.96
      const chartT = h * padT
      const chartB = h * (1 - padB)
      const chartW = chartR - chartL
      const chartH = chartB - chartT

      // Axis lines
      ctx.strokeStyle = canvasColor(ch, 0.04)
      ctx.lineWidth = 1

      ctx.beginPath()
      ctx.moveTo(chartL, chartT - 10)
      ctx.lineTo(chartL, chartB)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(chartL, chartB)
      ctx.lineTo(chartR + 10, chartB)
      ctx.stroke()

      // Y-axis tick marks + price labels
      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillStyle = canvasColor(ch, 0.04)

      const prices = [1.0, 0.75, 0.5, 0.25, 0.0]
      for (let p = 0; p < prices.length; p++) {
        const ty = chartB - prices[p] * chartH
        ctx.beginPath()
        ctx.moveTo(chartL - 4, ty)
        ctx.lineTo(chartL, ty)
        ctx.stroke()
        if (prices[p] > 0 && prices[p] < 1) {
          ctx.setLineDash([2, 6])
          ctx.strokeStyle = canvasColor(ch, 0.02)
          ctx.beginPath()
          ctx.moveTo(chartL + 1, ty)
          ctx.lineTo(chartR, ty)
          ctx.stroke()
          ctx.setLineDash([])
          ctx.strokeStyle = canvasColor(ch, 0.04)
        }
        ctx.fillText(prices[p].toFixed(2), chartL - 8, ty)
      }

      // X-axis time labels
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      const times = ["0h", "24h", "48h", "72h"]
      for (let ti = 0; ti < times.length; ti++) {
        const tx = chartL + (ti / (times.length - 1)) * chartW
        ctx.beginPath()
        ctx.moveTo(tx, chartB)
        ctx.lineTo(tx, chartB + 4)
        ctx.stroke()
        ctx.fillText(times[ti], tx, chartB + 8)
      }

      // Axis labels
      ctx.fillStyle = canvasColor(ch, 0.035)
      ctx.font = '7px "JetBrains Mono", monospace'
      ctx.textAlign = "center"
      ctx.fillText("TIME", chartL + chartW / 2, chartB + 22)

      ctx.save()
      ctx.translate(chartL - 28, chartT + chartH / 2)
      ctx.rotate(-Math.PI / 2)
      ctx.fillText("PRICE", 0, 0)
      ctx.restore()

      // Volume bars
      const barCount = volBars.length
      const barW = (chartW / barCount) * 0.6
      const barGap = chartW / barCount
      const maxBarH = chartH * 0.18

      for (let b = 0; b < barCount; b++) {
        const bx = chartL + b * barGap + barGap * 0.2
        const bh = volBars[b] * maxBarH
        const by = chartB - bh

        const barDist = Math.abs(b / barCount - state.tracerT)
        const barHighlight = barDist < 0.06 ? 0.03 : 0

        ctx.fillStyle = canvasColor(ch, 0.025 + barHighlight)
        ctx.fillRect(bx, by, barW, bh)
      }

      // The curve
      ctx.beginPath()
      ctx.strokeStyle = canvasColor(ch, 0.07)
      ctx.lineWidth = 1.5

      const steps = 200
      for (let i = 0; i <= steps; i++) {
        const xNorm = i / steps
        const px = chartL + xNorm * chartW
        const py = chartB - curveY(xNorm) * chartH
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.stroke()

      // Fill under curve
      ctx.lineTo(chartR, chartB)
      ctx.lineTo(chartL, chartB)
      ctx.closePath()
      const grad = ctx.createLinearGradient(0, chartT, 0, chartB)
      grad.addColorStop(0, canvasColor(ch, 0.02))
      grad.addColorStop(1, canvasColor(ch, 0))
      ctx.fillStyle = grad
      ctx.fill()

      // Dot at curve start
      const startY = chartB - curveY(0) * chartH
      ctx.beginPath()
      ctx.arc(chartL, startY, 2.5, 0, Math.PI * 2)
      ctx.fillStyle = canvasColor(ch, 0.08)
      ctx.fill()

      // Label on curve
      ctx.font = '7px "JetBrains Mono", monospace'
      ctx.fillStyle = canvasColor(ch, 0.05)
      ctx.textAlign = "left"
      ctx.fillText("LBP DECAY", chartL + 12, startY - 10)

      // Animated tracer dot
      state.tracerT += tracerSpeed
      if (state.tracerT > 1) {
        state.tracerT = 0
        state.trail = []
      }

      const dotX = chartL + state.tracerT * chartW
      const dotY = chartB - curveY(state.tracerT) * chartH

      // Trail
      state.trail.push({ x: dotX, y: dotY })
      if (state.trail.length > trailMax) state.trail.shift()

      for (let tr = 0; tr < state.trail.length; tr++) {
        const trAlpha = (tr / state.trail.length) * 0.06
        const trSize = (tr / state.trail.length) * 1.5
        ctx.beginPath()
        ctx.arc(state.trail[tr].x, state.trail[tr].y, trSize, 0, Math.PI * 2)
        ctx.fillStyle = canvasColor(ch, trAlpha)
        ctx.fill()
      }

      // Main dot
      ctx.beginPath()
      ctx.arc(dotX, dotY, 3, 0, Math.PI * 2)
      ctx.fillStyle = canvasColor(ch, 0.12)
      ctx.fill()

      // Glow ring
      ctx.beginPath()
      ctx.arc(dotX, dotY, 6, 0, Math.PI * 2)
      ctx.strokeStyle = canvasColor(ch, 0.04)
      ctx.lineWidth = 1
      ctx.stroke()

      // Crosshair dashes to axes
      ctx.setLineDash([2, 4])
      ctx.strokeStyle = canvasColor(ch, 0.03)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(dotX, dotY)
      ctx.lineTo(chartL, dotY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(dotX, dotY)
      ctx.lineTo(dotX, chartB)
      ctx.stroke()
      ctx.setLineDash([])

      // Live price at Y axis
      const curPrice = curveY(state.tracerT)
      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.textAlign = "right"
      ctx.textBaseline = "middle"
      ctx.fillStyle = canvasColor(ch, 0.07)
      ctx.fillText(curPrice.toFixed(3), chartL - 8, dotY)

      // ETH/TKN pair label
      const lblX = chartR - 8
      const lblY = chartT - 2
      ctx.textAlign = "right"
      ctx.textBaseline = "bottom"

      // Blinking status dot
      const blink = Math.sin(state.frame * 0.05) > 0
      if (blink) {
        ctx.beginPath()
        ctx.arc(lblX + 4, lblY - 5, 2, 0, Math.PI * 2)
        ctx.fillStyle = canvasColor(ch, 0.08)
        ctx.fill()
      }

      ctx.font = '9px "JetBrains Mono", monospace'
      ctx.fillStyle = canvasColor(ch, 0.06)
      ctx.fillText("◆ ETH / TKN", lblX, lblY)

      ctx.font = '7px "JetBrains Mono", monospace'
      ctx.fillStyle = canvasColor(ch, 0.035)
      ctx.fillText("FJORD LBP", lblX, lblY + 12)

      rafId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement!)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
      document.removeEventListener("themechange", onThemeChange)
    }
  }, [])

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, black 15%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 15%, transparent 70%)",
        }}
      />
    </div>
  )
}
