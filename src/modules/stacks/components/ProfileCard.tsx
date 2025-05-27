import { Card } from "@/modules/global/components/Card"
import { useIntersectionObserver } from "@/modules/global/hooks/useIntersectionObserver"
import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { ASCIIShaderMaterial } from "@/modules/threejs/shaders/ascii"
import { useTexture } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import gsap from "gsap"
import { Suspense, useRef, useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import { Clock, PlaneGeometry, Points } from "three"

// #########################################
// ------------- Threejs state -------------
// #########################################
const clock = new Clock()
const shaderMaterial = new ASCIIShaderMaterial({ transparent: true, depthWrite: false })

// Particles geometry
const planeGeometry = new PlaneGeometry(10, 10, 60, 60)
planeGeometry.setIndex(null) // Disable index to avoid duplicated vertices

// Add `a_Random` attribute to the geometry with random values from 0 to 1
randomizeAttributes(planeGeometry, "a_Random")

// Controller for `u_Progress` uniform on shader material
const imageAppearTween = gsap.to(shaderMaterial.uniforms.u_Progress, {
  ease: "power4.out",
  duration: 1.2,
  paused: true,
  value: 1,
})

// ########################################
// ----------- React Components -----------
// ########################################
export function ProfileCard() {
  // ############################
  // Component States
  const [divRef, setDivRef] = useState<HTMLDivElement | null>(null)
  useIntersectionObserver(divRef, {
    threshold: 0.5,
    onAppear: () => imageAppearTween.restart(),
    onLeave: () => imageAppearTween.reverse(),
  })

  return (
    <div ref={setDivRef} className="max-md:w-full">
      <Card variant={"glassy"} className="aspect-video w-[550px] justify-center max-md:w-full ">
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
              <AsciiImage />
            </Canvas>
          </Suspense>
        </div>
      </Card>
    </div>
  )
}

function AsciiImage() {
  // Reference variables.
  const points = useRef<Points>(null)

  // Load necessary textures.
  useTexture("/assets/profile.png", (txt) => {
    // Update the mesh scale on Y to match the aspect ratio of the image.
    const { width, height } = txt.image
    const aspectRatio = height / width
    points.current?.scale.setY(aspectRatio)

    // Set the texture to the shader material
    shaderMaterial.setTexture(txt)
  })

  useTexture("/sprites/numeric.png", (texture) => shaderMaterial.setSpriteSheet(texture))

  // Time updater
  useFrame(() => {
    const time = clock.getElapsedTime()
    shaderMaterial.uniforms.u_Time.value = time
  })

  return (
    <points ref={points} position={[0, 0, 0]} rotation={[0, 0, 0]} geometry={planeGeometry} material={shaderMaterial} />
  )
}
