import { Card } from "@/modules/global/components/Card"
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
  // Load models
  const fedora = useGLTF("/models/fedora.glb")
  const ubuntu = useGLTF("/models/ubuntu.glb")
  const arch = useGLTF("/models/arch.glb")

  // Extract Meshes
  const fedoraMesh = fedora.scene.children[0] as Mesh
  const ubuntuMesh = ubuntu.scene.children[0] as Mesh
  const archMesh = arch.scene.children[0] as Mesh

  // Remove index to avoid duplicated vertices
  fedoraMesh.geometry.setIndex(null)
  ubuntuMesh.geometry.setIndex(null)
  archMesh.geometry.setIndex(null)

  // Disallow switch to different target when transitioning
  const isTransitioning = useRef(false)
  const [activeOS, setActiveOS] = useState(1)

  const operatingSystemMeshes = [fedoraMesh, ubuntuMesh, archMesh]
  const normalizedIndex = activeOS % operatingSystemMeshes.length

  return (
    <Card className="size-full flex-wrap border-none ">
      <div className="flex flex-col absolute z-[9999] left-0 gap-1 h-full p-3">
        {operatingSystemMeshes.map((os, index) => (
          <button
            key={os.name}
            className="w-1.5 h-full bg-foreground-alt/30 from-orange-200 cursor-pointer relative to-orange-900 rounded-2xl overflow-hidden"
            onClick={() => !isTransitioning.current && setActiveOS(index)}
          >
            <div
              data-active={index === normalizedIndex}
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
          meshes={operatingSystemMeshes}
          active={normalizedIndex}
          randomAnimation
        />
      </Canvas>
    </Card>
  )
}
