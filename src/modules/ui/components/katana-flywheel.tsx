import { useEffect, useRef } from "react"
import { getCanvasChannels, canvasColor } from "@/modules/global/lib/theme-colors"

const FLYWHEEL_LABELS = ["BRIDGE", "VAULT", "YIELD", "CoL", "LIQUIDITY", "EXECUTION"]
const FLYWHEEL_SYMBOLS = ["⇌", "◈", "▲", "◉", "≋", "⚡"]

const KATANA_SVG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii00NDUgLTE4MC41IDEwMCAxMDAiPjxnPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC40IiBkPSJNLTM1MS44NzMtMTc0LjUyOWMtMC4wNTMtMC4xOC0wLjIwMy0wLjMxNS0wLjM4Ny0wLjM1Yy0wLjE4NS0wLjAzNS0wLjM3MywwLjAzNy0wLjQ4OCwwLjE4NWMtMC4yOTMsMC4zNzctMzAuMDU0LDM4LjMwMy02MS40OCw2NC40NjhsLTAuMTE3LTAuMTQxYy0wLjA4NC0wLjEwMi0wLjIwNy0wLjE2Ny0wLjMzOC0wLjE3OWMtMC4xMzItMC4wMTMtMC4yNjQsMC4wMjgtMC4zNjYsMC4xMTNsLTEuMjc2LDEuMDU5bC0xLjU3OS0xLjkwNGMtMC4xNzYtMC4yMTItMC40OTEtMC4yNDItMC43MDQtMC4wNjZsLTAuOTY4LDAuODAxYy0wLjEwMywwLjA4NC0wLjE2NywwLjIwNi0wLjE3OSwwLjMzOGMtMC4wMDEsMC4wMTEtMC4wMDEsMC4wMjItMC4wMDIsMC4wMzNjLTAuMDAzLDAuMTIxLDAuMDM4LDAuMjM5LDAuMTE1LDAuMzMzbDEuNTAyLDEuODEyYy00LjYzNiw0LjU0OC0xNi40MjQsMTQuNDEyLTIwLjIyOCwxNy4xNzljLTAuMTI3LDAuMDkzLTAuMjAyLDAuMjM4LTAuMjA2LDAuMzkxYy0wLjAwMSwwLjA0OSwwLjAwNCwwLjA5OCwwLjAxOCwwLjE0NmMwLjAxNywwLjA2MiwwLjQyNSwxLjUxNywxLjM5NiwyLjU1N2MxLjMzNCwxLjQyOSwyLjExLDEuNjEzLDIuMjUyLDEuNjM1YzAuMTQxLDAuMDIyLDAuMjg0LTAuMDE2LDAuMzk0LTAuMTA1YzAuOTEzLTAuNzQyLDIuMDU2LTEuNjc2LDMuMzM2LTIuNzIzYzUuODExLTQuNzQ5LDE0LjQ1MS0xMS44MSwxNy4zOTktMTMuODE4bDEuNTA5LDEuODJjMC4xNzcsMC4yMTIsMC40OTEsMC4yNDIsMC43MDQsMC4wNjVsMC45NjYtMC44YzAuMTAzLTAuMDg0LDAuMTY3LTAuMjA2LDAuMTc5LTAuMzM4YzAuMDE0LTAuMTMzLTAuMDI4LTAuMjY0LTAuMTEzLTAuMzY2bC0xLjU3OS0xLjkwNGwxLjI3Ny0xLjA1OGMwLjEwMi0wLjA4NSwwLjE2Ny0wLjIwNiwwLjE3OS0wLjMzOGMwLjAxMS0wLjEwOC0wLjAyMS0wLjIwOC0wLjA3NS0wLjI5N2MyNy42MDEtMjIuOTYzLDQ5LjUwNS00OS44MjEsNTcuNjY1LTYwLjMzNmwwLjMxOS0wLjQxMWMwLjgyNC0xLjA1NCwxLjI2Ni0yLjQ1NywxLjMxMy00LjE2OUMtMzUxLjM3OC0xNzIuODMxLTM1MS44NTMtMTc0LjQ2LTM1MS44NzMtMTc0LjUyOXogTS00MzUuNjkzLTg5LjAwMmwtMC4xNy0xLjQyNGwxLjM2MSwwLjQ1NGwwLjE2OSwxLjQyNEwtNDM1LjY5My04OS4wMDJ6IE0tNDMzLjY2OC05MC42ODRsLTAuMTgxLTEuNTJsMS40NSwwLjQ4NGwwLjE4MiwxLjUxOUwtNDMzLjY2OC05MC42ODR6IE0tNDMxLjU3Ni05Mi40NTFsLTAuMTk5LTEuNjc1bDEuNiwwLjUzM2wwLjIsMS42NzVMLTQzMS41NzYtOTIuNDUxeiBNLTQyOS40MzEtOTQuMjkzTC00MjkuNjM1LTk2bDEuNjMxLDAuNTQzbDAuMjA0LDEuNzA3TC00MjkuNDMxLTk0LjI5M3ogTS00MjcuMjI2LTk2LjA2M2wtMC4xOTQtMS42MjhsMS41NTYsMC41MThsMC4xOTQsMS42MjlMLTQyNy4yMjYtOTYuMDYzeiBNLTQyNS4xNTUtOTcuNzM0bC0wLjIwOC0xLjc1MWwxLjY3MywwLjU1N2wwLjIwOSwxLjc1MUwtNDI1LjE1NS05Ny43MzR6IE0tNDIyLjkwMi05OS41OWwtMC4yMTctMS44MTVsMS43MzQsMC41NzhsMC4yMTcsMS44MTVMLTQyMi45MDItOTkuNTl6IE0tNDIwLjYzLTEwMS4zNjlsLTAuMjI1LTEuODc4bDEuNzk1LDAuNTk3bDAuMjI1LDEuODgxTC00MjAuNjMtMTAxLjM2OXogTS00MTguNDA5LTEwMy40MjVsLTAuMjI2LTEuOTA1bDEuODIsMC42MDVsMC4yMjgsMS45MDdMLTQxOC40MDktMTAzLjQyNXogTS00MTEuODE2LTEwMS45NjhsLTEuNDIzLTEuNzE1YzAtMC4wMDEsMC0wLjAwMy0wLjAwMS0wLjAwNGwtMy43NzktNC41NTdjLTAuMDA4LTAuMDA5LTAuMDIxLTAuMDA3LTAuMDI5LTAuMDE2Yy0wLjAxMS0wLjAxNy0wLjAxNS0wLjAzNS0wLjAyNy0wLjA1MWwtMS40NzctMS43ODJsMC4xOTctMC4xNjRsMS41MjksMS44NDRjMC4wMDgsMC4wMSwwLjAyMSwwLjAxNSwwLjAyOSwwLjAyNGMwLDAsMCwwLDAsMC4wMDFsMC4wMDIsMC4wMDNjMC4wMDcsMC4wMTEsMC4wMSwwLjAyMywwLjAxOSwwLjAzM2MwLjAwOCwwLjAwOSwwLjAxOSwwLjAxMywwLjAyNywwLjAyMmwzLjUzNCw0LjI2M2MwLjAwNywwLjAxLDAuMDA5LDAuMDIxLDAuMDE3LDAuMDMxYzAsMC4wMDEsMC4wMDEsMC4wMDEsMC4wMDIsMC4wMDJjMCwwLDAsMC4wMDEsMC4wMDEsMC4wMDJsMS41NzUsMS44OTlMLTQxMS44MTYtMTAxLjk2OHogTS00MTMuMDUtMTA0LjgwN2wtMi45NC0zLjU0NmwxLjE5NC0wLjk5MWwwLjExNSwwLjEzOWMwLjAwMSwwLjAwMiwwLjAwMiwwLjAwNCwwLjAwMywwLjAwNmwyLjQ2MSwyLjk2N2wwLjM2MSwwLjQzNkwtNDEzLjA1LTEwNC44MDd6IE0tMzUzLjUzMi0xNjcuMzQ0bC0wLjMyMSwwLjQxNGMtOC4xMzksMTAuNDg3LTI5Ljk4MSwzNy4yNzQtNTcuNSw2MC4xNzJsLTAuMDA5LTAuMDExbC0yLjIyNi0yLjY4NWMyOC45Mi0yNC4wNzcsNTYuNDIyLTU4LjA3OSw2MC45NzUtNjMuNzk4YzAuMTA2LDAuNjA4LDAuMjA3LDEuNDM4LDAuMTgzLDIuMzI3Qy0zNTIuNDcxLTE2OS40MzEtMzUyLjg0Mi0xNjguMjI3LTM1My41MzItMTY3LjM0NHoiLz48cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjAuMyIgZD0iTS0zNTUuNDA0LTE2OC43MjVjLTEwLjI5NywxMy4xOTEtMzMuOTM0LDM5LjgwNy01Ni44NDgsNTkuMDY1Yy0wLjA2OCwwLjA1OC0wLjEwNCwwLjEzOS0wLjEwNywwLjIyMmMtMC4wMDIsMC4wNzEsMC4wMjEsMC4xNDMsMC4wNywwLjIwMWMwLjEwNiwwLjEyNywwLjI5NiwwLjE0NCwwLjQyMywwLjAzN2MyMi45NDktMTkuMjg4LDQ2LjYyMi00NS45NDQsNTYuOTM1LTU5LjE1NWMwLjEwMi0wLjEyOSwwLjA3OS0wLjMxOC0wLjA1Mi0wLjQyMUMtMzU1LjExMy0xNjguODc4LTM1NS4zMDItMTY4Ljg1NS0zNTUuNDA0LTE2OC43MjV6Ii8+PC9nPjwvc3ZnPg=="

const TRACER_INIT = [
  { angle: 0, speed: 0.008 },
  { angle: Math.PI, speed: 0.006 },
  { angle: Math.PI / 2, speed: 0.01 },
]

const KAT_CFG = { alpha: 0.06, scale: 0.85, rotate: 1.6, x: 0.35, y: 0.75 }

export function KatanaFlywheel({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    frame: 0,
    tracers: TRACER_INIT.map((t) => ({ ...t })),
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const dpr = window.devicePixelRatio || 1
    let w = 0
    let h = 0
    let rafId = 0

    const katanaImg = new Image()
    katanaImg.src = KATANA_SVG_SRC

    const state = stateRef.current
    let ch = getCanvasChannels()
    function onThemeChange() {
      ch = getCanvasChannels()
    }
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

      const cx = w * 0.5
      const cy = h * 0.5
      const radius = Math.min(w, h) * 0.22

      // ── Katana SVGs ──
      const pulse = Math.sin(state.frame * 0.015) * 0.003
      const katSize = Math.max(w, h) * KAT_CFG.scale

      ctx.save()
      ctx.globalAlpha = KAT_CFG.alpha + pulse
      ctx.translate(w * KAT_CFG.x, h * KAT_CFG.y)
      ctx.rotate(KAT_CFG.rotate)
      ctx.drawImage(katanaImg, -katSize / 2, -katSize / 2, katSize, katSize)
      ctx.restore()

      ctx.save()
      ctx.globalAlpha = KAT_CFG.alpha + pulse
      ctx.translate(w * (1 - KAT_CFG.x), h * (1 - KAT_CFG.y))
      ctx.rotate(KAT_CFG.rotate + Math.PI)
      ctx.drawImage(katanaImg, -katSize / 2, -katSize / 2, katSize, katSize)
      ctx.restore()

      ctx.globalAlpha = 1

      // ── Flywheel ring ──
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = canvasColor(ch, 0.02)
      ctx.lineWidth = 1
      ctx.stroke()

      // Inner ring
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.55, 0, Math.PI * 2)
      ctx.strokeStyle = canvasColor(ch, 0.015)
      ctx.stroke()

      // Dashed middle ring
      ctx.setLineDash([4, 6])
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.78, 0, Math.PI * 2)
      ctx.strokeStyle = canvasColor(ch, 0.012)
      ctx.stroke()
      ctx.setLineDash([])

      // ── Center K logo ──
      const kLogoSize = 128
      const kScale = kLogoSize / 256
      ctx.save()
      ctx.translate(cx - kLogoSize / 2, cy - kLogoSize / 2)
      ctx.scale(kScale, kScale)
      const kPath = new Path2D(
        "M172.124 127.683L209.661 1H159.616L109.576 89.5122V1H59.531L22 127.683H52.0248L22 229.027H109.576V165.911L184.644 255L235 178.358L134.91 127.683H172.124Z",
      )
      ctx.fillStyle = canvasColor(ch, 0.025)
      ctx.fill(kPath)
      ctx.strokeStyle = canvasColor(ch, 0.055)
      ctx.lineWidth = 3 / kScale
      ctx.stroke(kPath)
      ctx.restore()

      // ── Flywheel nodes ──
      for (let i = 0; i < FLYWHEEL_LABELS.length; i++) {
        const angle = ((Math.PI * 2) / FLYWHEEL_LABELS.length) * i - Math.PI / 2
        const nx = cx + Math.cos(angle) * radius
        const ny = cy + Math.sin(angle) * radius

        // Arc segment to next node
        const nextAngle = ((Math.PI * 2) / FLYWHEEL_LABELS.length) * ((i + 1) % FLYWHEEL_LABELS.length) - Math.PI / 2
        const startA = angle + 0.15
        let endA = nextAngle - 0.15
        if (endA < startA) endA += Math.PI * 2

        ctx.beginPath()
        ctx.arc(cx, cy, radius, startA, endA)
        ctx.strokeStyle = canvasColor(ch, 0.025)
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Arrow head
        const arrowX = cx + Math.cos(endA) * radius
        const arrowY = cy + Math.sin(endA) * radius
        const tangentA = endA + Math.PI / 2

        ctx.beginPath()
        ctx.moveTo(arrowX, arrowY)
        ctx.lineTo(arrowX - Math.cos(tangentA - 0.4) * 6, arrowY - Math.sin(tangentA - 0.4) * 6)
        ctx.moveTo(arrowX, arrowY)
        ctx.lineTo(arrowX - Math.cos(tangentA + 0.4) * 6, arrowY - Math.sin(tangentA + 0.4) * 6)
        ctx.strokeStyle = canvasColor(ch, 0.03)
        ctx.lineWidth = 1
        ctx.stroke()

        // Node circle
        ctx.beginPath()
        ctx.arc(nx, ny, 14, 0, Math.PI * 2)
        ctx.strokeStyle = canvasColor(ch, 0.04)
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.fillStyle = canvasColor(ch, 0.012)
        ctx.fill()

        // Symbol
        ctx.font = '10px "JetBrains Mono", monospace'
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillStyle = canvasColor(ch, 0.06)
        ctx.fillText(FLYWHEEL_SYMBOLS[i], nx, ny)

        // Label
        const lx = nx + Math.cos(angle) * 28
        const ly = ny + Math.sin(angle) * 28
        ctx.font = '7px "JetBrains Mono", monospace'
        ctx.fillStyle = canvasColor(ch, 0.045)
        ctx.fillText(FLYWHEEL_LABELS[i], lx, ly)
      }

      // ── Tracers ──
      for (const tr of state.tracers) {
        tr.angle += tr.speed
        const trX = cx + Math.cos(tr.angle) * radius
        const trY = cy + Math.sin(tr.angle) * radius

        // Glow
        const grd = ctx.createRadialGradient(trX, trY, 0, trX, trY, 14)
        grd.addColorStop(0, canvasColor(ch, 0.06))
        grd.addColorStop(1, canvasColor(ch, 0))
        ctx.beginPath()
        ctx.arc(trX, trY, 14, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        // Trail
        for (let tt = 1; tt <= 5; tt++) {
          const trailA = tr.angle - tr.speed * tt * 3
          const ttx = cx + Math.cos(trailA) * radius
          const tty = cy + Math.sin(trailA) * radius
          ctx.beginPath()
          ctx.arc(ttx, tty, 1.5 - tt * 0.2, 0, Math.PI * 2)
          ctx.fillStyle = canvasColor(ch, 0.04 - tt * 0.007)
          ctx.fill()
        }

        // Dot
        ctx.beginPath()
        ctx.arc(trX, trY, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = canvasColor(ch, 0.1)
        ctx.fill()
      }

      // ── Top stats ──
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
      ctx.fillText("FLYWHEEL", w * 0.05, topY)

      ctx.fillStyle = canvasColor(ch, 0.03)
      ctx.fillText("│", w * 0.18, topY)

      const tvl = (240 + Math.sin(state.frame * 0.004) * 3.5).toFixed(1)
      ctx.fillText("TVL: $" + tvl + "M", w * 0.2, topY)

      ctx.fillText("│", w * 0.36, topY)

      const vkat = (82.4 + Math.sin(state.frame * 0.006) * 1.2).toFixed(1)
      ctx.fillText("vKAT staked: " + vkat + "%", w * 0.38, topY)

      ctx.fillText("│", w * 0.58, topY)

      const yld = (12.8 + Math.sin(state.frame * 0.007) * 0.8).toFixed(1)
      ctx.fillText("yield: " + yld + "%", w * 0.6, topY)

      const blink = Math.sin(state.frame * 0.04) > 0
      ctx.textAlign = "right"
      if (blink) {
        ctx.beginPath()
        ctx.arc(w * 0.95 + 6, topY, 2, 0, Math.PI * 2)
        ctx.fillStyle = canvasColor(ch, 0.07)
        ctx.fill()
      }
      ctx.fillStyle = canvasColor(ch, 0.035)
      ctx.fillText("● LIVE", w * 0.95, topY)

      // ── Bottom stats ──
      ctx.strokeStyle = canvasColor(ch, 0.025)
      ctx.beginPath()
      ctx.moveTo(w * 0.04, h * 0.935)
      ctx.lineTo(w * 0.96, h * 0.935)
      ctx.stroke()

      const botY = h * 0.965
      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.textAlign = "left"
      ctx.fillStyle = canvasColor(ch, 0.04)

      const fees = (18.4 + Math.sin(state.frame * 0.003) * 0.6).toFixed(1)
      ctx.fillText("seq fees: $" + fees + "K", w * 0.05, botY)

      ctx.fillStyle = canvasColor(ch, 0.03)
      ctx.fillText("│", w * 0.22, botY)
      ctx.fillText("CoL → 100%", w * 0.24, botY)

      ctx.fillText("│", w * 0.38, botY)

      const vaults = Math.floor(6 + Math.sin(state.frame * 0.005) * 0.5)
      ctx.fillText("active vaults: " + vaults, w * 0.4, botY)

      ctx.fillText("│", w * 0.56, botY)

      const rev = (3.0 + state.frame * 0.0000015).toFixed(2)
      ctx.fillText("bridge rev: $" + rev + "M", w * 0.58, botY)

      ctx.textAlign = "right"
      ctx.fillStyle = canvasColor(ch, 0.035)
      ctx.fillText("KATANA  ·  DeFi", w * 0.95, botY)

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
