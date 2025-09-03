import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { ASCIIWaveShaderMaterial } from "@/modules/threejs/shaders/ascii_wave"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"

import { Suspense, useEffect, useImperativeHandle, useRef, type RefObject } from "react"
import { PlaneGeometry, Uniform } from "three"

/**
 * ASCII Background Component
 * Displays a background with ASCII art using Three.js and a custom shader.
 * The background is animated and responds to the time elapsed.
 * @returns
 */
export function ASCIIBackground(props: ASCIIWavesProps) {
  return (
    <div className="w-screen h-screen fixed inset-0 -z-10 ">
      <Canvas gl={{ antialias: false }}>
        <Suspense fallback={null}>
          <ASCIIWaves {...props} />
        </Suspense>
      </Canvas>
    </div>
  )
}
interface ASCIIWavesProps {
  material?: RefObject<ASCIIWaveShaderMaterial | null> // Material Ref
  patternSrc: string
  spriteSrc: string
  speedRef: RefObject<number>
}

function ASCIIWaves({ material: outerMaterial, patternSrc, spriteSrc, speedRef }: ASCIIWavesProps) {
  // Handle Shaders References
  const mat = useRef(new ASCIIWaveShaderMaterial({}))
  useImperativeHandle(outerMaterial, () => mat.current, [mat])

  useTexture(patternSrc, (texture) => mat.current.setTexture(texture))
  useTexture(spriteSrc, (texture) => {
    const spriteAmount = texture.image.width / texture.image.height
    // Make sure it is a square sprite
    if (spriteAmount % 1 !== 0) throw new Error("Sprite texture is not a square sequence.")
    mat.current.uniforms.u_SpriteCount = new Uniform(spriteAmount)
    mat.current.setSpriteTexture(texture)
  })

  // Reference variables
  const geometry = useRef<PlaneGeometry>(new PlaneGeometry(10, 10, 100, 100))
  useEffect(() => randomizeAttributes(geometry.current, "a_Random"), [geometry.current])

  // State
  const { height, width, aspect } = useThree(({ viewport: { width, aspect, height } }) => ({ width, aspect, height }))

  useEffect(() => mat.current.setResolution(width, height), [height, width])
  useFrame((_, delta) => {
    mat.current.uniforms.u_Time.value += delta * speedRef.current
  })

  return <points scale={[Math.max(aspect, 1.6), 1, 1]} geometry={geometry.current} material={mat.current} />
}
