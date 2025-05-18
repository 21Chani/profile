import { Card } from "@/modules/global/components/Card"
import { BitShaderMaterial } from "@/modules/shaders/bit"
import { randomizeAttributes } from "@/modules/shaders/lib/randomizeAttributes"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense } from "react"
import { Clock, PlaneGeometry } from "three"

export function ProfileCard() {
  return (
    <div className="max-md:w-full">
      <Card className=" bg-gradient-to-br from-background-alt/20 from-30% border border-border-primary to-black aspect-video w-[550px] justify-center rounded-none shadow-[6px_6px_0px_0px_#666] max-md:w-full  ">
        <div className="absolute w-[90%] bottom-0 aspect-[687/530] ">
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
const shaderMaterial = new BitShaderMaterial({ transparent: true, depthWrite: false })

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
  useTexture("/sprites/numeric.png", (texture) => shaderMaterial.setBitTexture(texture))

  // Time updater
  useFrame(() => {
    const time = clock.getElapsedTime()
    shaderMaterial.uniforms.u_Time.value = time
  })

  return <points position={[0, 0, 0]} geometry={particlesGeometry} material={shaderMaterial} />
}

/* <Card className=" bg-gradient-to-br from-background-alt/20 from-30% border border-border-primary to-black aspect-video w-[550px] justify-center rounded-none shadow-[6px_6px_0px_0px_#666] max-md:w-full  ">
<img
  className=" mx-auto absolute bottom-0 w-[90%] object-contain "
  alt="Picture of the author"
  src={"/assets/profile.png"}
/>

<span className="absolute right-4 top-2 font-cascadia text-3xl text-gray-400">+</span>
<span className="absolute right-7 top-1.5 font-cascadia text-xl text-gray-400">+</span>
<div className="absolute right-2 top-20 flex flex-col gap-2">
  <span className=" h-12 w-1 bg-gradient-to-b to-gray-400 from-gray-900 font-cascadia text-3xl"></span>
  <span className=" h-12 w-1 bg-gradient-to-b to-gray-200 from-gray-400 font-cascadia text-3xl"></span>
  <span className=" h-12 w-1 bg-gradient-to-b to-gray-200 from-gray-400 font-cascadia text-3xl"></span>
</div>
<div className="absolute left-2 top-8 flex flex-col gap-1 ">
  <ItemInfo>
    <span>AKA CHANI</span>
  </ItemInfo>
  <ItemInfo>
    <span>20 YEARS</span>
  </ItemInfo>
  <ItemInfo>
    <span>LOADING...</span>
  </ItemInfo>
</div>
</Card> */
