import { Card } from "@/modules/global/components/Card"
import { ProgressCountBar } from "@/modules/global/components/ProgressCountBar"
import { StatInfo } from "@/modules/global/components/StatInfo"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { ParticlesMorphPoints } from "@/modules/threejs/components/ParticlesMorph"
import { useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef, useState } from "react"
import { BsFillLightningFill } from "react-icons/bs"
import { FaApple } from "react-icons/fa"
import { GrArchlinux, GrFedora, GrUbuntu, GrWindows } from "react-icons/gr"
import { RiTimeFill } from "react-icons/ri"
import type { Mesh } from "three"

const OS_STATS = [
  { name: "Arch Linux", skill: 5, time: 5, icon: GrArchlinux },
  { name: "Ubuntu", skill: 5, time: 4, icon: GrUbuntu },
  { name: "Windows", skill: 3, time: 2, icon: GrWindows },
  { name: "Fedora", skill: 3, time: 2, icon: GrFedora },
  { name: "Macos", skill: 5, time: 5, icon: FaApple },
] as const

interface OperatingSystemCardProps {
  intersection: ReturnType<typeof useIntersectionObserverState>
}

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
export function OperatingSystemCard({ intersection }: OperatingSystemCardProps) {
  const isTransitioning = useRef(false)
  // Load models
  const windows = useGLTF("/models/windows.glb")
  const ubuntu = useGLTF("/models/ubuntu.glb")
  const fedora = useGLTF("/models/fedora.glb")
  const macos = useGLTF("/models/macos.glb")
  const arch = useGLTF("/models/arch.glb")

  // Extract Meshes
  const windowsGeometry = (windows.scene.children[0] as Mesh).geometry
  const fedoraGeometry = (fedora.scene.children[0] as Mesh).geometry
  const ubuntuGeometry = (ubuntu.scene.children[0] as Mesh).geometry
  const macosGeometry = (macos.scene.children[0] as Mesh).geometry
  const archGeometry = (arch.scene.children[0] as Mesh).geometry

  // Remove index to avoid duplicated vertices
  windowsGeometry.setIndex(null)
  fedoraGeometry.setIndex(null)
  ubuntuGeometry.setIndex(null)
  macosGeometry.setIndex(null)
  archGeometry.setIndex(null)

  // Disallow switch to different target when transitioning
  const [activeOS, setActiveOS] = useState(0)

  const OSGeometries = [archGeometry, ubuntuGeometry, windowsGeometry, fedoraGeometry, macosGeometry]
  const normalizedIndex = activeOS % OSGeometries.length

  const osStat = OS_STATS[normalizedIndex]

  return (
    <Card variant={"glassy"} className="size-full flex-wrap max-md:flex-col ">
      <ProgressCountBar
        activeIndex={normalizedIndex}
        onCompleteCycle={setActiveOS}
        itemCount={OSGeometries.length}
        aria-hidden={!intersection.isVisible}
        className="absolute z-[40] top-0 left-0 w-fit h-full"
        onSelectItem={(index) => !isTransitioning.current && setActiveOS(index)}
      />
      <div className="w-fit p-4 flex gap-3   absolute bottom-0 nslate-y-full right-0 ">
        <div className="size-4 rounded-full bg-radial bg-gray-800"></div>
        <div className="size-4 rounded-full bg-gray-600 "></div>
        <div className="size-4 rounded-full bg-gray-400"></div>
      </div>

      <div className="flex absolute right-4 top-4 gap-3 z-40 ">
        {OS_STATS.map(({ icon: Icon }, index) => (
          <button
            className="cursor-pointer"
            role="option"
            key={`os_legened_icon_${index}`}
            onClick={() => setActiveOS(index)}
          >
            <Icon
              aria-selected={normalizedIndex == index}
              className="size-5 aria-selected:fill-white duration-300 ease-out transition fill-gray-500"
            />
          </button>
        ))}
      </div>

      <StatInfo
        direction={"lr"}
        text={osStat.name}
        iterations={osStat.name.length * 2}
        className="top-4 left-10 absolute z-40"
        bars={[
          { level: osStat.skill, icon: <BsFillLightningFill className="size-5 fill-gray-500" /> },
          { level: osStat.time, icon: <RiTimeFill className="size-5 fill-gray-500" /> },
        ]}
      />

      <Canvas>
        <ParticlesMorphPoints
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
