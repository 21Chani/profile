import { Card } from "@/modules/global/components/Card"
import { ProgressCountBar } from "@/modules/global/components/ProgressCountBar"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { ParticlesMorph } from "@/modules/threejs/components/ParticlesMorph"
import { useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef, useState } from "react"
import type { Mesh } from "three"

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

  return (
    <Card ref={setCardRef} className="size-full flex-wrap border-none ">
      <ProgressCountBar
        aria-hidden={!intersection.isVisible}
        itemCount={OSGeometries.length}
        activeIndex={normalizedIndex}
        onCompleteCycle={(newIndex) => {
          if (isTransitioning.current) return
          setActiveOS(newIndex)
        }}
        className="absolute top-0 left-0 w-full h-full"
      />

      <Canvas>
        <ParticlesMorph
          onTransitionStart={() => (isTransitioning.current = true)}
          onTransitionEnd={() => (isTransitioning.current = false)}
          buffers={OSGeometries}
          active={normalizedIndex}
          randomAnimation
          {...intersection}
        />
      </Canvas>
    </Card>
  )
}
