import { useEffect, useRef } from "react"
import { getCanvasChannels, canvasColor } from "@/modules/global/lib/theme-colors"

interface Node {
  id: string
  xf: number
  yf: number
  label: string
  r: number
  type: "source" | "pool" | "token" | "dest"
}

const nodes: Node[] = [
  { id: "CHZ", xf: 0.08, yf: 0.45, label: "CHZ", r: 18, type: "source" },
  { id: "POOL_A", xf: 0.28, yf: 0.25, label: "POOL A", r: 12, type: "pool" },
  { id: "POOL_B", xf: 0.28, yf: 0.50, label: "POOL B", r: 12, type: "pool" },
  { id: "POOL_C", xf: 0.28, yf: 0.75, label: "POOL C", r: 12, type: "pool" },
  { id: "PEPPER", xf: 0.48, yf: 0.30, label: "PEPPER", r: 14, type: "token" },
  { id: "FAN", xf: 0.48, yf: 0.65, label: "FAN", r: 14, type: "token" },
  { id: "POOL_D", xf: 0.68, yf: 0.35, label: "POOL D", r: 12, type: "pool" },
  { id: "POOL_E", xf: 0.68, yf: 0.55, label: "POOL E", r: 12, type: "pool" },
  { id: "USDT", xf: 0.90, yf: 0.45, label: "USDT", r: 18, type: "dest" },
]

// [from_index, to_index, weight]
const edges: [number, number, number][] = [
  [0, 1, 0.6],
  [0, 2, 1.0],
  [0, 3, 0.4],
  [1, 4, 0.6],
  [2, 4, 0.8],
  [2, 5, 0.7],
  [3, 5, 0.4],
  [4, 6, 0.9],
  [4, 7, 0.3],
  [5, 7, 0.6],
  [6, 8, 0.9],
  [7, 8, 0.5],
]

const bestRoute = [0, 2, 4, 6, 8]

const tickerText = [
  "CHZ/USDT 0.0871 \u25b2", "PEPPER/CHZ 0.0012 \u25bc", "FAN/USDT 0.342 \u25b2",
  "BAR/CHZ 4.21 \u25b2", "JUV/USDT 1.87 \u25bc", "PSG/CHZ 6.04 \u25b2",
  "ACM/USDT 2.14 \u25bc", "ATM/CHZ 3.76 \u25b2", "GAL/USDT 1.52 \u25b2",
  "CHZ/USDT 0.0871 \u25b2", "PEPPER/CHZ 0.0012 \u25bc", "FAN/USDT 0.342 \u25b2",
].join("   \u2502   ")

const hexChars = "0123456789abcdef"
const blockHashes: string[] = []
for (let bh = 0; bh < 20; bh++) {
  let hash = "0x"
  for (let hc = 0; hc < 8; hc++) hash += hexChars[Math.floor(Math.sin(bh * 13.7 + hc * 3.1) * 8 + 8)]
  blockHashes.push("#" + (48200000 + bh * 137) + " " + hash)
}
const blockText = blockHashes.join("    ")

function getNodePos(node: Node, w: number, h: number) {
  return { x: node.xf * w, y: node.yf * h }
}

export function KayenSwapRoute({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({ tracerProgress: 0, tickerOffset: 0, blockOffset: 0, frame: 0 })

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

      // ── Edges ──
      for (let e = 0; e < edges.length; e++) {
        const fromNode = nodes[edges[e][0]]
        const toNode = nodes[edges[e][1]]
        const weight = edges[e][2]
        const from = getNodePos(fromNode, w, h)
        const to = getNodePos(toNode, w, h)
        const alpha = 0.02 + weight * 0.03

        ctx.beginPath()
        ctx.strokeStyle = canvasColor(ch, alpha)
        ctx.lineWidth = 1

        const cpX = (from.x + to.x) / 2
        const cpY = (from.y + to.y) / 2 - (to.x - from.x) * 0.05
        ctx.moveTo(from.x, from.y)
        ctx.quadraticCurveTo(cpX, cpY, to.x, to.y)
        ctx.stroke()

        // Arrow at midpoint
        const midT = 0.55
        const mx = (1 - midT) * (1 - midT) * from.x + 2 * (1 - midT) * midT * cpX + midT * midT * to.x
        const my = (1 - midT) * (1 - midT) * from.y + 2 * (1 - midT) * midT * cpY + midT * midT * to.y
        const angle = Math.atan2(to.y - from.y, to.x - from.x)

        ctx.beginPath()
        ctx.fillStyle = canvasColor(ch, alpha * 0.8)
        ctx.moveTo(mx + Math.cos(angle) * 4, my + Math.sin(angle) * 4)
        ctx.lineTo(mx + Math.cos(angle + 2.5) * 3, my + Math.sin(angle + 2.5) * 3)
        ctx.lineTo(mx + Math.cos(angle - 2.5) * 3, my + Math.sin(angle - 2.5) * 3)
        ctx.closePath()
        ctx.fill()
      }

      // ── Nodes ──
      for (let n = 0; n < nodes.length; n++) {
        const node = nodes[n]
        const pos = getNodePos(node, w, h)

        if (node.type === "source" || node.type === "dest") {
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, node.r, 0, Math.PI * 2)
          ctx.strokeStyle = canvasColor(ch, 0.06)
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = canvasColor(ch, 0.015)
          ctx.fill()

          ctx.font = '9px "JetBrains Mono", monospace'
          ctx.fillStyle = canvasColor(ch, 0.07)
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(node.label, pos.x, pos.y)
        } else if (node.type === "token") {
          ctx.beginPath()
          ctx.arc(pos.x, pos.y, node.r, 0, Math.PI * 2)
          ctx.strokeStyle = canvasColor(ch, 0.05)
          ctx.lineWidth = 1
          ctx.stroke()
          ctx.fillStyle = canvasColor(ch, 0.01)
          ctx.fill()

          ctx.font = '7px "JetBrains Mono", monospace'
          ctx.fillStyle = canvasColor(ch, 0.055)
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText(node.label, pos.x, pos.y)
        } else {
          ctx.save()
          ctx.translate(pos.x, pos.y)
          ctx.rotate(Math.PI / 4)
          ctx.strokeStyle = canvasColor(ch, 0.04)
          ctx.lineWidth = 1
          ctx.strokeRect(-node.r * 0.6, -node.r * 0.6, node.r * 1.2, node.r * 1.2)
          ctx.fillStyle = canvasColor(ch, 0.008)
          ctx.fillRect(-node.r * 0.6, -node.r * 0.6, node.r * 1.2, node.r * 1.2)
          ctx.restore()

          ctx.font = '6px "JetBrains Mono", monospace'
          ctx.fillStyle = canvasColor(ch, 0.035)
          ctx.textAlign = "center"
          ctx.textBaseline = "top"
          ctx.fillText(node.label, pos.x, pos.y + node.r + 4)
        }
      }

      // ── Animated tracer ──
      state.tracerProgress += 0.003
      const totalSegments = bestRoute.length - 1
      const fullProgress = state.tracerProgress % 1
      const segFloat = fullProgress * totalSegments
      const seg = Math.floor(segFloat)
      const segT = segFloat - seg

      if (seg < totalSegments) {
        const fromN = nodes[bestRoute[seg]]
        const toN = nodes[bestRoute[seg + 1]]
        const fp = getNodePos(fromN, w, h)
        const tp = getNodePos(toN, w, h)

        const cpX = (fp.x + tp.x) / 2
        const cpY = (fp.y + tp.y) / 2 - (tp.x - fp.x) * 0.05

        const tX = (1 - segT) * (1 - segT) * fp.x + 2 * (1 - segT) * segT * cpX + segT * segT * tp.x
        const tY = (1 - segT) * (1 - segT) * fp.y + 2 * (1 - segT) * segT * cpY + segT * segT * tp.y

        // Glow
        ctx.beginPath()
        ctx.arc(tX, tY, 8, 0, Math.PI * 2)
        const glow = ctx.createRadialGradient(tX, tY, 0, tX, tY, 8)
        glow.addColorStop(0, canvasColor(ch, 0.06))
        glow.addColorStop(1, canvasColor(ch, 0))
        ctx.fillStyle = glow
        ctx.fill()

        // Dot
        ctx.beginPath()
        ctx.arc(tX, tY, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = canvasColor(ch, 0.14)
        ctx.fill()
      }

      // ── Token pair ticker (top) ──
      state.tickerOffset -= 0.3
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, 0, w, h * 0.08)
      ctx.clip()

      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.fillStyle = canvasColor(ch, 0.04)
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      const tickerY = h * 0.04
      const tickerW = ctx.measureText(tickerText).width
      const tx1 = state.tickerOffset % (tickerW + 100)
      ctx.fillText(tickerText, tx1, tickerY)
      ctx.fillText(tickerText, tx1 + tickerW + 100, tickerY)

      ctx.strokeStyle = canvasColor(ch, 0.02)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(w * 0.05, h * 0.075)
      ctx.lineTo(w * 0.95, h * 0.075)
      ctx.stroke()
      ctx.restore()

      // ── Block hashes (bottom) ──
      state.blockOffset -= 0.2
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, h * 0.93, w, h * 0.07)
      ctx.clip()

      ctx.font = '7px "JetBrains Mono", monospace'
      ctx.fillStyle = canvasColor(ch, 0.03)
      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      const blockY = h * 0.965
      const blockW = ctx.measureText(blockText).width
      const bx1 = state.blockOffset % (blockW + 80)
      ctx.fillText(blockText, bx1, blockY)
      ctx.fillText(blockText, bx1 + blockW + 80, blockY)

      ctx.strokeStyle = canvasColor(ch, 0.02)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(w * 0.05, h * 0.93)
      ctx.lineTo(w * 0.95, h * 0.93)
      ctx.stroke()
      ctx.restore()

      // ── Labels ──
      ctx.font = '7px "JetBrains Mono", monospace'
      ctx.fillStyle = canvasColor(ch, 0.04)
      ctx.textAlign = "left"
      ctx.textBaseline = "top"
      ctx.fillText("ROUTE: CHZ \u2192 POOL B \u2192 PEPPER \u2192 POOL D \u2192 USDT", w * 0.08, h * 0.10)

      ctx.textAlign = "right"
      ctx.fillText("HOPS: 4  \u00b7  BEST PRICE", w * 0.92, h * 0.10)

      // Aggregator label
      const blink = Math.sin(state.frame * 0.04) > 0
      ctx.textAlign = "left"
      ctx.textBaseline = "bottom"
      ctx.fillStyle = canvasColor(ch, 0.035)
      ctx.fillText("KAYEN AGGREGATOR", w * 0.08, h * 0.90)

      if (blink) {
        ctx.beginPath()
        ctx.arc(w * 0.08 - 6, h * 0.90 - 4, 2, 0, Math.PI * 2)
        ctx.fillStyle = canvasColor(ch, 0.07)
        ctx.fill()
      }

      ctx.textAlign = "right"
      ctx.fillStyle = canvasColor(ch, 0.03)
      ctx.fillText("CHILIZ CHAIN", w * 0.92, h * 0.90)

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
          maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      />
    </div>
  )
}
