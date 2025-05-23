import { Card } from "@/modules/global/components/Card"
import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { ASCIIShaderMaterial } from "@/modules/threejs/shaders/ascii"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense } from "react"
import { BiChevronRight } from "react-icons/bi"
import { Clock, PlaneGeometry } from "three"

export function ProfileCard() {
  return (
    <div className="max-md:w-full">
      <Card variant={"glassy"} className="  aspect-video w-[550px] justify-center max-md:w-full ">
        <p className="text-gray-300 text-xl absolute right-5 top-5">+</p>
        <p className="text-white text-2xl absolute right-2 top-2">+</p>
        <p className="w-0.5 h-12 rounded-full bg-gray-800 absolute bottom-6 left-2" />
        <p className="w-0.5 h-12 rounded-full bg-gray-700 absolute bottom-20 left-2" />
        <div className="absolute left-4 top-4 flex flex-col gap-1">
          <p className="text-gray-400 font-thin  ">{`{{  Chani. }}`}</p>
          <div className="flex">
            <BiChevronRight className=" size-6 scale-x-75 stroke-2 stroke-gray-300" />
            <p className="text-white">21 years</p>
          </div>
          <div className="flex">
            <BiChevronRight className=" size-6 scale-x-75 stroke-2 stroke-gray-300" />
            <p className="text-white">Loading...</p>
          </div>
        </div>

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
