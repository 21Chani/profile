import { Card } from "@/modules/global/components/Card"
import { ProgressCountBar } from "@/modules/global/components/ProgressCountBar"
import { StatInfo } from "@/modules/global/components/StatInfo"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { AsciiTransition } from "@/modules/threejs/components/AsciiTransition"
import { Canvas } from "@react-three/fiber"
import { useState } from "react"
import { BsFillLightningFill } from "react-icons/bs"
import { FaApple } from "react-icons/fa"
import { GrArchlinux, GrFedora, GrUbuntu, GrWindows } from "react-icons/gr"
import { RiTimeFill } from "react-icons/ri"
import { ASCII_PLANE_GEOMETRY } from "../constants/geometries"

const OS_STATS = [
  { name: "Arch Linux", skill: 5, time: 5, icon: GrArchlinux, src: "/assets/os/arch.png" },
  { name: "Ubuntu", skill: 5, time: 4, icon: GrUbuntu, src: "/assets/os/ubuntu.png" },
  { name: "Windows", skill: 3, time: 2, icon: GrWindows, src: "/assets/os/windows.png" },
  { name: "Fedora", skill: 3, time: 2, icon: GrFedora, src: "/assets/os/fedora.png" },
  { name: "Macos", skill: 5, time: 5, icon: FaApple, src: "/assets/os/macos.png" },
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
  // Disallow switch to different target when transitioning
  const [activeOS, setActiveOS] = useState(0)

  const normalizedIndex = activeOS % OS_STATS.length

  const osStat = OS_STATS[normalizedIndex]

  return (
    <Card variant={"glassy"} className="size-full flex-wrap max-md:flex-col ">
      <ProgressCountBar
        activeIndex={normalizedIndex}
        onCompleteCycle={setActiveOS}
        itemCount={OS_STATS.length}
        aria-hidden={!intersection.isVisible}
        className="absolute z-[40] top-0 left-0 w-fit h-full"
        onSelectItem={(index) => setActiveOS(index)}
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
        <AsciiTransition
          activeIndex={normalizedIndex}
          images={OS_STATS.map((os) => os.src)}
          geometry={ASCII_PLANE_GEOMETRY}
        />
      </Canvas>
    </Card>
  )
}
