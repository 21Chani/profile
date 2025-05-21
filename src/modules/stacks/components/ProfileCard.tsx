import { Card } from "@/modules/global/components/Card"
import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { ASCIIShaderMaterial } from "@/modules/threejs/shaders/ascii"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense } from "react"
import { Clock, PlaneGeometry } from "three"

export function ProfileCard() {
  return (
    <div className="max-md:w-full">
      <Card className=" bg-gradient-to-br from-background-alt/20 backdrop-blur-[2px] from-30% border-2 border-border-primary to-black/20 border-dashed aspect-video w-[550px] justify-center max-md:w-full rounded-3xl ">
        <div className="absolute w-[90%] bottom-0 aspect-[687/530] z-40 ">
          <Suspense fallback="LOADING">
            <Canvas className="">
              <GlichedImage />
            </Canvas>
          </Suspense>
        </div>
      </Card>
    </div>
  )
}

const clock = new Clock()
const shaderMaterial = new ASCIIShaderMaterial({ transparent: true, depthWrite: false })

// Plane geometry dimensions
const imageWidth = 687,
  imageHeight = 530,
  aspect = imageWidth / imageHeight,
  planeWidth = 10,
  planeHeight = planeWidth / aspect

// Particles geometry
const particlesGeometry = new PlaneGeometry(planeWidth, planeHeight, 60, 60)
particlesGeometry.setIndex(null) // Disable index to avoid duplicated vertices

// Add `a_Random` attribute to the geometry with random values from 0 to 1
randomizeAttributes(particlesGeometry, "a_Random")

function GlichedImage() {
  // Load necessary textures
  useTexture("/assets/profile.png", (txt) => shaderMaterial.setTexture(txt))
  useTexture("/sprites/numeric.png", (texture) => shaderMaterial.setSpriteSheet(texture))

  // Time updater
  useFrame(() => {
    const time = clock.getElapsedTime()
    shaderMaterial.uniforms.u_Time.value = time
  })

  return <points position={[0, 0, 0]} rotation={[0, 0, 0]} geometry={particlesGeometry} material={shaderMaterial} />
}
