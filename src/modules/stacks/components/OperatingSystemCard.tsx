import { Card } from "@/modules/global/components/Card"
import { EncryptedText } from "@/modules/global/components/EncryptedText"
import { ProgressCountBar } from "@/modules/global/components/ProgressCountBar"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { ParticlesMorph } from "@/modules/threejs/components/ParticlesMorph"
import { useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef, useState } from "react"
import { BsFillLightningFill } from "react-icons/bs"
import { RiTimeFill } from "react-icons/ri"
import type { Mesh } from "three"

const OS_NAMES = ["Fedora", "Ubuntu", "Windows 11", "Arch Linux"]

/**
 * Operating System Card Component.
 *
 * This cards displays a 3D model a given list of operating systems.
 * They transitionate between each other when clicked or by timer.
 *
 * How transition works:
 * Instead of making use of a hook such as `useTimer`
 * The animation is made by using css animation and listening to the `onAnimationEnd` event
 * This way we can avoid the use extra renders and make the animation smoother
 */
export function OperatingSystemCard() {
  const isTransitioning = useRef(false)
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null)
  const intersection = useIntersectionObserverState(cardRef, { threshold: 0.5 })

  // Load models
  const fedora = useGLTF("/models/fedora.glb")
  const ubuntu = useGLTF("/models/ubuntu.glb")
  const arch = useGLTF("/models/arch.glb")
  const windows = useGLTF("/models/windows.glb")

  // Extract Meshes
  const fedoraGeometry = (fedora.scene.children[0] as Mesh).geometry
  const ubuntuGeometry = (ubuntu.scene.children[0] as Mesh).geometry
  const archGeometry = (arch.scene.children[0] as Mesh).geometry
  const windowsGeometry = (windows.scene.children[0] as Mesh).geometry

  // Remove index to avoid duplicated vertices
  fedoraGeometry.setIndex(null)
  ubuntuGeometry.setIndex(null)
  archGeometry.setIndex(null)
  windowsGeometry.setIndex(null)

  // Disallow switch to different target when transitioning
  const [activeOS, setActiveOS] = useState(0)

  const OSGeometries = [fedoraGeometry, ubuntuGeometry, windowsGeometry, archGeometry]
  const normalizedIndex = activeOS % OSGeometries.length

  const osName = OS_NAMES[normalizedIndex]

  return (
    <Card ref={setCardRef} className="size-full flex-wrap border-none ">
      <ProgressCountBar
        activeIndex={normalizedIndex}
        onCompleteCycle={setActiveOS}
        itemCount={OSGeometries.length}
        aria-hidden={!intersection.isVisible}
        className="absolute top-0 left-0 w-full h-full"
        onSelectItem={(index) => !isTransitioning.current && setActiveOS(index)}
      />

      <div className="absolute w-2/4 h-full inset-0 bg-gradient-to-r from-background from-30% to-background/0 z-[999]"></div>
      <Card
        // hidden
        variant={"glassy"}
        className="!absolute gap-2 bg-back/50 backdrop- border- shado-[6px_6px_0px_0px_#2227] border-border-primary z-40 border-dashed rounded-2xl bottom-2 right-2 flex items-end justify-end flex-col p-2"
      >
        <div className="flex flex-col justify-end items-end">
          <p className="text-foreground-alt font-jaro font-bold text-center">Name</p>
          <h1 className="text-2xl leading-5 uppercase">
            <EncryptedText className="text-gradient-highlight" text={osName} iterations={20} />
          </h1>
        </div>
        <div className="flex flex-col justify-end items-end">
          <div className="flex gap-2 w-40 items-center">
            <BsFillLightningFill className="size-4 min-w-4 fill-white" />
            <div className="h-2 w-full rounded-full bg-gray-100"></div>
            <div className="h-2 w-full rounded-full bg-gray-200"></div>
            <div className="h-2 w-full rounded-full bg-gray-300"></div>
            <div className="h-2 w-full rounded-full bg-gray-400"></div>
            <div className="h-2 w-full rounded-full bg-gray-500"></div>
          </div>
        </div>
        <div className="flex flex-col justify-end items-end">
          <div className="flex gap-2 w-40 items-center">
            <RiTimeFill className="size-4 min-w-4 fill-white" />
            <div className="h-2 w-full rounded-full bg-gray-100"></div>
            <div className="h-2 w-full rounded-full bg-gray-200"></div>
            <div className="h-2 w-full rounded-full bg-gray-300"></div>
            <div className="h-2 w-full rounded-full bg-gray-400"></div>
            <div className="h-2 w-full rounded-full bg-gray-500"></div>
          </div>
        </div>
      </Card>

      <Canvas>
        <ParticlesMorph
          onTransitionStart={() => (isTransitioning.current = true)}
          onTransitionEnd={() => (isTransitioning.current = false)}
          active={normalizedIndex}
          buffers={OSGeometries}
          {...intersection}
          randomAnimation
        />
      </Canvas>
    </Card>
  )
}
