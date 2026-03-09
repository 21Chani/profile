export type CharsetName = "standard" | "blocks" | "minimal"
export type ColorMode = "color" | "mono" | "matrix"

export interface AsciiCell {
  char: string
  r: number
  g: number
  b: number
  lum: number
}

export type AsciiGrid = AsciiCell[][]

export const CHARSETS: Record<CharsetName, string> = {
  standard: " .'~^,:;Il!i><+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  blocks: " ░▒▓█",
  minimal: " .-:=+*#%@",
}

export const DARK_THRESHOLD = 0.015

export function imageToAsciiData(
  img: HTMLImageElement,
  cols: number,
  charset: CharsetName,
): AsciiGrid {
  const chars = CHARSETS[charset]
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")!
  const aspect = img.naturalHeight / img.naturalWidth
  const rows = Math.floor(cols * aspect * 0.5)

  canvas.width = cols
  canvas.height = rows
  ctx.drawImage(img, 0, 0, cols, rows)

  const { data } = ctx.getImageData(0, 0, cols, rows)
  const result: AsciiGrid = []

  for (let y = 0; y < rows; y++) {
    const row: AsciiCell[] = []
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
      const ci = Math.floor(lum * (chars.length - 1))
      const mx = Math.max(r, g, b)
      const mn = Math.min(r, g, b)
      const sat = mx > 0 ? (mx - mn) / mx : 0
      const boost = sat > 0.1 ? 1.3 : 1

      row.push({
        char: chars[ci],
        r: Math.min(255, Math.floor(r * boost)),
        g: Math.min(255, Math.floor(g * boost)),
        b: Math.min(255, Math.floor(b * boost)),
        lum,
      })
    }
    result.push(row)
  }

  return result
}

export function getAsciiColor(cell: AsciiCell, mode: ColorMode): string {
  if (mode === "mono") {
    const v = Math.floor(cell.lum * 255)
    return `rgb(${v},${v},${v})`
  }
  if (mode === "matrix") {
    return `rgb(0,${Math.floor(40 + cell.lum * 215)},0)`
  }
  return `rgb(${cell.r},${cell.g},${cell.b})`
}
