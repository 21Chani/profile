import { useEffect, useState } from "react"

import type { AsciiGrid, CharsetName } from "@/modules/global/lib/ascii-convert"
import { imageToAsciiData } from "@/modules/global/lib/ascii-convert"

interface UseAsciiImageOptions {
  src: string
  cols: number
  charset: CharsetName
}

export function useAsciiImage({ src, cols, charset }: UseAsciiImageOptions) {
  const [data, setData] = useState<AsciiGrid | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      setData(imageToAsciiData(img, cols, charset))
      setLoading(false)
    }

    img.src = src

    return () => {
      img.src = ""
    }
  }, [src, cols, charset])

  return { data, loading }
}
