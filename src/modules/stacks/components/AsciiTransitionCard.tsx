import { Card } from "@/modules/global/components/Card"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"

import { ProgressCountBar } from "@/modules/global/components/ProgressCountBar"
import { StatInfo } from "@/modules/global/components/StatInfo"
import { AsciiTransition } from "@/modules/threejs/components/AsciiTransition"
import { BsFillLightningFill } from "react-icons/bs"
import { RiTimeFill } from "react-icons/ri"
import { twMerge } from "tailwind-merge"
import { ASCII_PLANE_GEOMETRY } from "../constants/geometries"
import type { AsciiStats } from "../types"

interface AsciiTransitionCardProps {
  className?: string
  /**
   * Stats of your ascii transition
   */
  stats: Array<AsciiStats>
}

export function AsciiTransitionCard(props: AsciiTransitionCardProps) {
  const [activeAscii, setActiveAscii] = useState(0)
  const normalizedIndex = activeAscii % props.stats.length

  const current = props.stats[normalizedIndex]

  return (
    <Card variant={"glassy"} className={twMerge("size-full flex-wrap max-md:flex-col", props.className)}>
      <ProgressCountBar
        activeIndex={normalizedIndex}
        onCompleteCycle={setActiveAscii}
        itemCount={props.stats.length}
        className="absolute z-[10] top-0 right-0 w-fit h-full"
        onSelectItem={(index) => setActiveAscii(index)}
      />

      <StatInfo
        direction={"rl"}
        text={current.name}
        iterations={current.name.length * 2}
        className="top-4 right-10 absolute z-40"
        bars={[
          { level: current.skill, icon: <BsFillLightningFill className="size-5 text-gray-500" /> },
          { level: current.time, icon: <RiTimeFill className="size-5 text-gray-500" /> },
        ]}
      />

      <div className="flex absolute left-4 bottom-4 gap-3 z-40 ">
        {props.stats.map(({ icon: Icon, name }, index) => (
          <button
            key={`ascii_legened_icon_${index}_${name}`}
            onClick={() => setActiveAscii(index)}
            className="cursor-pointer"
            role="option"
          >
            <Icon
              aria-selected={normalizedIndex == index}
              className="size-7 aria-selected:text-white duration-300 ease-out transition text-gray-500"
            />
          </button>
        ))}
      </div>

      <Suspense fallback={<h1>LOADING</h1>}>
        <Canvas id="ascii-program-langs">
          <AsciiTransition
            watchContainer="#ascii-program-langs"
            activeIndex={normalizedIndex}
            geometry={ASCII_PLANE_GEOMETRY}
            images={props.stats.map((lang) => lang.src)}
          />
        </Canvas>
      </Suspense>
    </Card>
  )
}
