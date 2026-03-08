import { useTexture } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef, type RefObject } from "react"
import type { PlaneGeometry } from "three"
import { useMatrixTexture } from "../hooks/use-matrix-texture"
import { randomizeAttributes } from "../lib/randomize-attributes"
import { ASCIIWaveShaderMaterial } from "../shaders/ascii-wave"

// Ensure extend() side effect runs before the component mounts
void ASCIIWaveShaderMaterial

interface ASCIIWavesProps {
  spriteSrc: string
  speedRef: RefObject<number>
}

export function ASCIIWaves({ spriteSrc, speedRef }: ASCIIWavesProps) {
  const geometry = useRef<PlaneGeometry>(null)
  const mat = useRef<ASCIIWaveShaderMaterial>(null)

  const matrixTexture = useMatrixTexture()

  useTexture<string>(spriteSrc, (texture) => {
    const image = texture.image as HTMLImageElement
    const spriteAmount = image.width / image.height
    if (!mat.current) return
    if (spriteAmount % 1 !== 0) throw new Error("Sprite texture is not a square sequence.")
    mat.current.uniforms.u_SpriteCount.value = spriteAmount
    mat.current.setSpriteTexture(texture)
  })

  // Reference variables
  useEffect(() => {
    setTimeout(() => randomizeAttributes(geometry.current!, "a_Random"), 100)
  }, [geometry])

  // State
  const { height, width, aspect } = useThree(({ viewport: { width, aspect, height } }) => ({ width, aspect, height }))

  useFrame((_, delta) => {
    if (!mat.current) return
    mat.current.setResolution(width, height)
    mat.current.uniforms.u_Texture!.value = matrixTexture
    mat.current.uniforms.u_Time.value += delta * speedRef.current
  })

  return (
    <points scale={[Math.max(aspect, 1.6), 1, 1]}>
      <aSCIIWaveShaderMaterial ref={mat} />
      <planeGeometry ref={geometry} args={[10, 10, 100, 100]} />
    </points>
  )
}
