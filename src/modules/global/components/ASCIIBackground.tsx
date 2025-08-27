import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { ASCIIWaveShaderMaterial } from "@/modules/threejs/shaders/ascii_wave"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"

import { Suspense, useEffect, useRef } from "react"
import { Clock, PlaneGeometry, Uniform } from "three"

/**
 * ASCII Background Component
 * Displays a background with ASCII art using Three.js and a custom shader.
 * The background is animated and responds to the time elapsed.
 * @returns
 */
export function ASCIIBackground() {
  return (
    <div className="w-screen h-screen fixed inset-0 -z-10 ">
      <Canvas gl={{ antialias: false }}>
        <Suspense fallback={null}>
          <ASCIIWaves />
        </Suspense>
      </Canvas>
    </div>
  )
}

const asciiMaterial = new ASCIIWaveShaderMaterial({})

function ASCIIWaves() {
  // Load necessary textures
  useTexture("/assets/waves.png", (texture) => asciiMaterial.setTexture(texture))
  useTexture("/sprites/numeric.png", (texture) => {
    const spriteAmount = texture.image.width / texture.image.height
    // Make sure it is a square sprite
    if (spriteAmount % 1 !== 0) throw new Error("Sprite texture is not a square sequence.")
    asciiMaterial.uniforms.u_SpriteCount = new Uniform(spriteAmount)
    asciiMaterial.setSpriteTexture(texture)
  })

  // Reference variables
  const clock = useRef(new Clock())
  const geometry = useRef<PlaneGeometry>(new PlaneGeometry(10, 10, 100, 100))
  useEffect(() => randomizeAttributes(geometry.current, "a_Random"), [geometry.current])

  // State
  const { height, width, aspect } = useThree(({ viewport: { width, aspect, height } }) => ({ width, aspect, height }))

  // Update the resolution of the shader material
  asciiMaterial.setResolution(width, height)
  useEffect(() => asciiMaterial.setResolution(width, height), [height, width])
  useFrame(() => {
    asciiMaterial.uniforms.u_Time.value = clock.current.getElapsedTime()
  })

  return <points scale={[Math.max(aspect, 1.6), 1, 1]} geometry={geometry.current} material={asciiMaterial} />
}
