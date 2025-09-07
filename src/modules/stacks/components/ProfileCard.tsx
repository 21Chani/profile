import { Card } from "@/modules/global/components/Card"
import { useIntersectionObserver } from "@/modules/global/hooks/useIntersectionObserver"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { AsciiImage } from "@/modules/threejs/components/AsciiImage"
import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { ASCIIShaderMaterial } from "@/modules/threejs/shaders/ascii"
import { Canvas } from "@react-three/fiber"

import gsap from "gsap"
import { Suspense, useMemo, useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import { PlaneGeometry } from "three"

// #########################################
// ------------- Threejs state -------------
// #########################################
// Particles geometry
const planeGeometry = new PlaneGeometry(10, 10, 60, 60)
planeGeometry.setIndex(null)

// Add `a_Random` attribute to the geometry with random values from 0 to 1
randomizeAttributes(planeGeometry, "a_Random")

// Controller for `u_Progress` uniform on shader material

// ########################################
// ----------- React Components -----------
// ########################################
export function ProfileCard() {
  const [matRef, setMatRef] = useState<ASCIIShaderMaterial | null>()
  const imageAppearTween = useMemo(() => {
    if (!matRef) return
    return gsap.to(matRef.uniforms.u_Progress, { ease: "power4.out", duration: 1.2, paused: true, value: 1 })
  }, [matRef])

  // ############################
  // Component States
  useIntersectionObserver(["#profile-wrapper"], {
    threshold: 0.5,
    onAppear: () => imageAppearTween?.restart(),
    onLeave: () => imageAppearTween?.reverse(),
  })

  const intersection = useIntersectionObserverState([`#profile-wrapper`], {})
  return (
    <div id="profile-wrapper" className="max-md:w-full">
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

        <div className="absolute w-[90%] bottom-0 aspect-[687/530] z-40 " id="canvas-wrapper">
          <Suspense fallback="LOADING">
            <Canvas frameloop={intersection.isVisible ? "always" : "never"} gl={{ antialias: false }}>
              <AsciiImage
                defaultProgress={0}
                materialRef={setMatRef}
                spriteSrc="/sprites/numeric.png"
                shapeSrc="/assets/profile.png"
                geometry={planeGeometry}
                container="#profile-wrapper"
              />
            </Canvas>
          </Suspense>
        </div>
      </Card>
    </div>
  )
}
