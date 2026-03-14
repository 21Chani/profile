import { useEffect, useRef } from "react"
import { type CanvasChannels, getCanvasChannels, canvasColor } from "@/modules/global/lib/theme-colors"

interface Vault {
  xf: number
  yf: number
  lockDays: number
  elapsed: number
  amount: string
  label: string
  tier: "silver" | "gold" | "diamond"
}

const TIER_ALPHA: Record<Vault["tier"], number> = { silver: 0.035, gold: 0.045, diamond: 0.06 }
const BAR_WIDTH = 48
const BAR_HEIGHT = 4
const PROGRESS_PER_FRAME = 0.000008

function createVaults(): Vault[] {
  return [
    { xf: 0.12, yf: 0.28, lockDays: 90, elapsed: 0.72, amount: "12.4K", label: "90D VAULT", tier: "gold" },
    { xf: 0.38, yf: 0.2, lockDays: 30, elapsed: 0.45, amount: "3.2K", label: "30D VAULT", tier: "silver" },
    { xf: 0.65, yf: 0.32, lockDays: 60, elapsed: 0.88, amount: "8.7K", label: "60D VAULT", tier: "gold" },
    { xf: 0.88, yf: 0.22, lockDays: 180, elapsed: 0.31, amount: "45.1K", label: "180D VAULT", tier: "diamond" },
    { xf: 0.22, yf: 0.62, lockDays: 60, elapsed: 0.95, amount: "5.6K", label: "60D VAULT", tier: "silver" },
    { xf: 0.52, yf: 0.7, lockDays: 30, elapsed: 0.12, amount: "1.8K", label: "30D VAULT", tier: "silver" },
    { xf: 0.78, yf: 0.65, lockDays: 90, elapsed: 0.56, amount: "22.0K", label: "90D VAULT", tier: "gold" },
    { xf: 0.08, yf: 0.78, lockDays: 180, elapsed: 0.08, amount: "67.3K", label: "180D VAULT", tier: "diamond" },
    { xf: 0.92, yf: 0.8, lockDays: 30, elapsed: 0.67, amount: "2.1K", label: "30D VAULT", tier: "silver" },
  ]
}

function drawLock(ctx: CanvasRenderingContext2D, x: number, y: number, alpha: number, ch: CanvasChannels) {
  const s = 6
  // Shackle
  ctx.beginPath()
  ctx.arc(x, y - s * 0.6, s * 0.5, Math.PI, 0, false)
  ctx.strokeStyle = canvasColor(ch, alpha)
  ctx.lineWidth = 1
  ctx.stroke()
  // Body
  ctx.strokeRect(x - s * 0.6, y - s * 0.1, s * 1.2, s * 0.9)
  // Keyhole
  ctx.beginPath()
  ctx.arc(x, y + s * 0.2, 1, 0, Math.PI * 2)
  ctx.fillStyle = canvasColor(ch, alpha * 0.8)
  ctx.fill()
}

export function ConcaveStake({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({ vaults: createVaults(), frame: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const dpr = window.devicePixelRatio || 1
    let w = 0
    let h = 0
    let rafId = 0
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

      const poolX = w * 0.5
      const poolY = h * 0.47
      const { vaults, frame } = state

      // ── Connecting lines — vaults to central pool ──
      ctx.setLineDash([3, 5])
      for (let c = 0; c < vaults.length; c++) {
        const v = vaults[c]
        ctx.beginPath()
        ctx.strokeStyle = canvasColor(ch, 0.018)
        ctx.lineWidth = 1
        ctx.moveTo(v.xf * w, v.yf * h + 10)
        ctx.lineTo(poolX, poolY)
        ctx.stroke()
      }
      ctx.setLineDash([])

      // ── Central pool node ──
      ctx.beginPath()
      ctx.arc(poolX, poolY, 14, 0, Math.PI * 2)
      ctx.strokeStyle = canvasColor(ch, 0.035)
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = canvasColor(ch, 0.01)
      ctx.fill()

      ctx.font = '6px "JetBrains Mono", monospace'
      ctx.fillStyle = canvasColor(ch, 0.04)
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("POOL", poolX, poolY)

      // ── Vaults ──
      for (let i = 0; i < vaults.length; i++) {
        const v = vaults[i]
        const x = v.xf * w
        const y = v.yf * h
        const alpha = TIER_ALPHA[v.tier]

        // Slowly advance elapsed
        v.elapsed += PROGRESS_PER_FRAME
        if (v.elapsed >= 1) v.elapsed = 0

        // Pulse on near-completion (>90%)
        let pulse = 0
        if (v.elapsed > 0.9) {
          pulse = Math.sin(frame * 0.08) * 0.02
        }
        const activeAlpha = alpha + pulse

        // ── Border box ──
        const boxW = 72
        const boxH = 58
        const boxX = x - boxW / 2
        const boxY = y - 22

        ctx.strokeStyle = canvasColor(ch, activeAlpha * 0.5)
        ctx.lineWidth = 1
        ctx.strokeRect(boxX, boxY, boxW, boxH)

        // Corner ticks
        const tk = 6
        ctx.strokeStyle = canvasColor(ch, activeAlpha * 0.7)
        // TL
        ctx.beginPath()
        ctx.moveTo(boxX, boxY + tk)
        ctx.lineTo(boxX, boxY)
        ctx.lineTo(boxX + tk, boxY)
        ctx.stroke()
        // TR
        ctx.beginPath()
        ctx.moveTo(boxX + boxW - tk, boxY)
        ctx.lineTo(boxX + boxW, boxY)
        ctx.lineTo(boxX + boxW, boxY + tk)
        ctx.stroke()
        // BL
        ctx.beginPath()
        ctx.moveTo(boxX, boxY + boxH - tk)
        ctx.lineTo(boxX, boxY + boxH)
        ctx.lineTo(boxX + tk, boxY + boxH)
        ctx.stroke()
        // BR
        ctx.beginPath()
        ctx.moveTo(boxX + boxW - tk, boxY + boxH)
        ctx.lineTo(boxX + boxW, boxY + boxH)
        ctx.lineTo(boxX + boxW, boxY + boxH - tk)
        ctx.stroke()

        // ── Lock icon with pulse glow ──
        if (v.elapsed > 0.9) {
          const glowAlpha = 0.03 + pulse
          ctx.beginPath()
          ctx.arc(x, y - 16, 10, 0, Math.PI * 2)
          const glow = ctx.createRadialGradient(x, y - 16, 0, x, y - 16, 10)
          glow.addColorStop(0, canvasColor(ch, glowAlpha))
          glow.addColorStop(1, canvasColor(ch, 0))
          ctx.fillStyle = glow
          ctx.fill()
        }
        drawLock(ctx, x, y - 16, activeAlpha * 1.2, ch)

        // ── Vault label ──
        ctx.font = '7px "JetBrains Mono", monospace'
        ctx.textAlign = "center"
        ctx.textBaseline = "top"
        ctx.fillStyle = canvasColor(ch, activeAlpha)
        ctx.fillText(v.label, x, y + 2)

        // ── Amount staked ──
        ctx.font = '9px "JetBrains Mono", monospace'
        ctx.fillStyle = canvasColor(ch, activeAlpha * 1.3)
        ctx.fillText(v.amount + " CNV", x, y + 14)

        // ── Progress bar ──
        const bx = x - BAR_WIDTH / 2
        const by = y + 27

        ctx.strokeStyle = canvasColor(ch, activeAlpha * 0.6)
        ctx.lineWidth = 1
        ctx.strokeRect(bx, by, BAR_WIDTH, BAR_HEIGHT)

        const fillW = BAR_WIDTH * v.elapsed
        ctx.fillStyle = canvasColor(ch, activeAlpha * 0.8)
        ctx.fillRect(bx, by, fillW, BAR_HEIGHT)
      }

      // ── Top — Protocol stats ──
      ctx.strokeStyle = canvasColor(ch, 0.025)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(w * 0.04, h * 0.07)
      ctx.lineTo(w * 0.96, h * 0.07)
      ctx.stroke()

      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.textBaseline = "middle"
      const topY = h * 0.038

      ctx.textAlign = "left"
      ctx.fillStyle = canvasColor(ch, 0.04)
      ctx.fillText("STAKING VAULTS", w * 0.05, topY)

      ctx.fillStyle = canvasColor(ch, 0.03)
      ctx.fillText("\u2502", w * 0.22, topY)

      const tvl = (4.2 + Math.sin(frame * 0.005) * 0.15).toFixed(1)
      ctx.fillText("TVL: $" + tvl + "M", w * 0.24, topY)

      ctx.fillText("\u2502", w * 0.4, topY)

      const apy = (142.8 + Math.sin(frame * 0.008) * 3.2).toFixed(1)
      ctx.fillText("APY: " + apy + "%", w * 0.42, topY)

      const blink = Math.sin(frame * 0.04) > 0
      ctx.textAlign = "right"
      if (blink) {
        ctx.beginPath()
        ctx.arc(w * 0.95 + 6, topY, 2, 0, Math.PI * 2)
        ctx.fillStyle = canvasColor(ch, 0.07)
        ctx.fill()
      }
      ctx.fillStyle = canvasColor(ch, 0.035)
      ctx.fillText("\u25CF ACTIVE", w * 0.95, topY)

      // ── Bottom — Epoch info ──
      ctx.strokeStyle = canvasColor(ch, 0.025)
      ctx.beginPath()
      ctx.moveTo(w * 0.04, h * 0.935)
      ctx.lineTo(w * 0.96, h * 0.935)
      ctx.stroke()

      const botY = h * 0.965
      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.textAlign = "left"
      ctx.fillStyle = canvasColor(ch, 0.04)

      ctx.fillText("epoch: 847", w * 0.05, botY)

      ctx.fillStyle = canvasColor(ch, 0.03)
      ctx.fillText("\u2502", w * 0.18, botY)

      const secs = Math.floor(3600 - ((frame * 0.1) % 3600))
      const mm = Math.floor((secs % 3600) / 60)
      const ss = secs % 60
      ctx.fillText("next rebase: " + mm + "m " + (ss < 10 ? "0" : "") + ss + "s", w * 0.2, botY)

      ctx.fillText("\u2502", w * 0.42, botY)
      ctx.fillText("active locks: 9", w * 0.44, botY)

      ctx.fillText("\u2502", w * 0.6, botY)
      ctx.fillText("total staked: 168.2K CNV", w * 0.62, botY)

      ctx.textAlign = "right"
      ctx.fillStyle = canvasColor(ch, 0.035)
      ctx.fillText("CONCAVE  \u00B7  DeFi", w * 0.95, botY)

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
          maskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      />
    </div>
  )
}
