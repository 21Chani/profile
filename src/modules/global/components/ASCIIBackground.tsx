import { ASCIIShaderMaterial } from "@/modules/shaders/ascii"
import { randomizeAttributes } from "@/modules/shaders/lib/randomizeAttributes"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"

import { Suspense, useEffect } from "react"
import { Clock, PlaneGeometry, Uniform, Vector2 } from "three"

/**
 * ASCII Background Component
 * Displays a background with ASCII art using Three.js and a custom shader.
 * The background is animated and responds to the time elapsed.
 * @returns
 */
export function ASCIIBackground() {
  return (
    <div className="w-screen h-screen fixed inset-0 ">
      <Canvas>
        <Suspense fallback={null}>
          <ASCIIWaves />
        </Suspense>
      </Canvas>
    </div>
  )
}

const asciiMaterial = new ASCIIShaderMaterial({
  uniforms: {
    u_Resolution: new Uniform(new Vector2(window.innerWidth, window.innerHeight)),
  },
  transparent: true,
  depthWrite: false,
})
const clock = new Clock()
const geometry = new PlaneGeometry(10, 10, 100, 100)
geometry.setIndex(null)

randomizeAttributes(geometry, "a_Random")

function ASCIIWaves() {
  const { aspect, height, width } = useThree(({ viewport: { width, aspect, height } }) => ({ width, aspect, height }))
  useTexture("/assets/waves.png", (txt) => asciiMaterial.setTexture(txt))
  useTexture("/sprites/numeric.png", (txt) => asciiMaterial.setBitTexture(txt))

  useEffect(() => {
    asciiMaterial.uniforms.u_Resolution.value.set(width, height)
  }, [height, width])

  useFrame(() => {
    asciiMaterial.uniforms.u_Time.value = clock.getElapsedTime()
  })

  return <points scale={[Math.min(aspect, 1), 1, 1]} geometry={geometry} material={asciiMaterial} />
}
