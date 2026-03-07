import { useFrame } from "@react-three/fiber"
import { useEffect, useMemo } from "react"
import { CanvasTexture, NearestFilter } from "three"
import { MatrixRainRenderer, type MatrixRainConfig } from "../lib/matrix-rain-renderer"

export function useMatrixTexture(config?: Partial<MatrixRainConfig>) {
  const { renderer, texture } = useMemo(() => {
    const renderer = new MatrixRainRenderer(config)
    const texture = new CanvasTexture(renderer.canvas)
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    texture.generateMipmaps = false
    return { renderer, texture }
  }, [config])

  useEffect(() => {
    return () => {
      renderer.dispose()
      texture.dispose()
    }
  }, [renderer, texture])

  useFrame((t, delta) => {
    renderer.update(delta * 0.3)
    texture.needsUpdate = true
  })

  return texture
}
