import { Card } from "@/modules/global/components/Card"
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

  // Extract Meshes
  const fedoraGeometry = (fedora.scene.children[0] as Mesh).geometry
  const ubuntuGeometry = (ubuntu.scene.children[0] as Mesh).geometry
  const archGeometry = (arch.scene.children[0] as Mesh).geometry

  // Remove index to avoid duplicated vertices
  fedoraGeometry.setIndex(null)
  ubuntuGeometry.setIndex(null)
  archGeometry.setIndex(null)

  // Disallow switch to different target when transitioning
  const [activeOS, setActiveOS] = useState(1)

  const OSGeometries = [fedoraGeometry, ubuntuGeometry, archGeometry]
  const normalizedIndex = activeOS % OSGeometries.length

  return (
    <Card ref={setCardRef} className="size-full flex-wrap border-none ">
      <div className="flex flex-col absolute z-[9999] left-0 gap-1 h-full p-3">
        {OSGeometries.map((_, index) => (
          <button
            role="option"
            key={`operating_system_selector_${index}`}
            aria-hidden={!intersection.isVisible}
            className="w-1.5 h-full bg-foreground-alt/30 aria-hidden:opacity-0 transition-all ease-out duration-1000 from-orange-200 cursor-pointer relative to-orange-900 rounded-2xl overflow-hidden"
            onClick={() => !isTransitioning.current && setActiveOS(index)}
          >
            <div
              data-active={index === normalizedIndex && intersection.isVisible}
              className="w-full absolute data-[active=false]:scale-0 top-0 data-[active=true]:animate-expand-from-top-to-bottom-4000 h-full bg-gradient-to-b from-orange-200 to-orange-900 rounded-full"
              onAnimationEnd={() => setActiveOS(index + 1)}
            />
          </button>
        ))}
      </div>

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
