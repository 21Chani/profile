import { useAsciiImage } from "@/modules/global/hooks/use-ascii-image"
import { useCanvasChannels } from "@/modules/global/hooks/use-canvas-channels"
import type { CharsetName, ColorMode } from "@/modules/global/lib/ascii-convert"
import { DARK_THRESHOLD, getAsciiChar, getAsciiColor } from "@/modules/global/lib/ascii-convert"

interface AsciiRendererProps {
  src: string
  cols?: number
  fontSize?: number
  charset?: CharsetName
  colorMode?: ColorMode
  contrast?: number
  inverse?: boolean
  className?: string
}

export function AsciiRenderer({
  src,
  cols = 120,
  fontSize = 5,
  charset = "standard",
  colorMode = "color",
  contrast = 1,
  inverse = false,
  className,
}: AsciiRendererProps) {
  const { data } = useAsciiImage({ src, cols, charset })
  const channels = useCanvasChannels()

  if (!data) return null

  return (
    <div className={className}>
      <pre className="font-mono leading-[1.05] tracking-[0.3px] m-0 bg-transparent" style={{ fontSize }}>
        {data.map((row, y) => (
          <div key={y} style={{ height: fontSize * 1.05 }}>
            {row.map((cell, x) =>
              cell.lum < DARK_THRESHOLD && !inverse ? (
                " "
              ) : (
                <span key={x} style={{ color: getAsciiColor(cell, colorMode, channels, contrast, inverse) }}>
                  {getAsciiChar(cell, charset, contrast, inverse)}
                </span>
              ),
            )}
          </div>
        ))}
      </pre>
    </div>
  )
}
