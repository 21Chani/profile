export interface MatrixRainConfig {
  width: number
  height: number
  colWidth: number
  blockHeight: number
  gap: number
  fade: number
  spawnChance: number
  greyMin: number
  greyMax: number
}

const DEFAULTS: MatrixRainConfig = {
  width: 256,
  height: 256,
  colWidth: 14,
  blockHeight: 6,
  gap: 12,
  fade: 0.04,
  spawnChance: 0.008,
  greyMin: 100,
  greyMax: 200,
}

interface Drop {
  x: number
  y: number
  speed: number
  length: number
  grey: number
}

export class MatrixRainRenderer {
  readonly canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private config: MatrixRainConfig
  private drops: Drop[] = []
  private totalCols: number

  constructor(config?: Partial<MatrixRainConfig>) {
    this.config = { ...DEFAULTS, ...config }
    const { width, height, colWidth } = this.config

    this.canvas = document.createElement("canvas")
    this.canvas.width = width
    this.canvas.height = height
    this.ctx = this.canvas.getContext("2d")!
    this.totalCols = Math.ceil(width / colWidth)

    // Black background
    this.ctx.fillStyle = "#000"
    this.ctx.fillRect(0, 0, width, height)

    // Scatter initial drops and draw them immediately
    for (let c = 0; c < this.totalCols; c++) {
      if (Math.random() < 0.25) {
        const d = this.spawnDrop(c)
        d.y = Math.random() * height
        this.drops.push(d)
      }
    }
    this.update(1 / 60)
  }

  private spawnDrop(col: number): Drop {
    const { colWidth, height, greyMin, greyMax } = this.config
    return {
      x: col * colWidth + Math.floor(colWidth * 0.4),
      y: -(Math.random() * height * 0.3),
      speed: 0.5 + Math.random() * 1.5,
      length: 3 + Math.floor(Math.random() * 6),
      grey: greyMin + Math.floor(Math.random() * (greyMax - greyMin)),
    }
  }

  update(dt: number): void {
    const { width, height, fade, spawnChance, blockHeight, gap } = this.config
    const ctx = this.ctx

    // Normalize dt to ~60fps steps like the mockup
    const steps = Math.min(dt / (1 / 60), 3)

    // Fade trail
    ctx.fillStyle = `rgba(0, 0, 0, ${fade * steps})`
    ctx.fillRect(0, 0, width, height)

    // Spawn new drops
    for (let c = 0; c < this.totalCols; c++) {
      if (Math.random() < spawnChance * steps) {
        this.drops.push(this.spawnDrop(c))
      }
    }

    // Draw and advance
    const step = blockHeight + gap
    const alive: Drop[] = []

    for (const d of this.drops) {
      d.y += d.speed * steps

      for (let j = 0; j < d.length; j++) {
        const by = d.y - j * step
        if (by < -blockHeight || by > height + blockHeight) continue

        // Head brightest, tail fades
        const t = j / d.length
        const alpha = 1 - t * 0.8
        ctx.fillStyle = `rgba(${d.grey},${d.grey},${d.grey},${alpha})`
        ctx.fillRect(d.x, by, 6, blockHeight)
      }

      // Keep if tail still on screen
      const tailY = d.y - d.length * step
      if (tailY < height + 50) alive.push(d)
    }

    this.drops = alive
  }

  dispose(): void {
    this.drops = []
    this.canvas.width = 0
    this.canvas.height = 0
  }
}
