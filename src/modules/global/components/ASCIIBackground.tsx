import { ASCIIShaderMaterial } from "@/modules/shaders/ascii"
import { randomizeAttributes } from "@/modules/shaders/lib/randomizeAttributes"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense } from "react"
import { Clock, PlaneGeometry } from "three"

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

const asciiMaterial = new ASCIIShaderMaterial({ transparent: true, depthWrite: false })
const clock = new Clock()
const geometry = new PlaneGeometry(10, 10, 128, 128)
geometry.setIndex(null)

randomizeAttributes(geometry, "a_Random")

function ASCIIWaves() {
  useTexture("/assets/waves.png", (txt) => asciiMaterial.setTexture(txt))
  useTexture("/sprites/numeric.png", (txt) => {
    asciiMaterial.setBitTexture(txt)
    // asciiMaterial.uniforms.u_BitTexture = new Uniform(txt)
    // console.log("HU?")
  })

  useFrame(() => {
    asciiMaterial.uniforms.u_Time.value = clock.getElapsedTime()
  })

  return <points geometry={geometry} material={asciiMaterial} />
}
