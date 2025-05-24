import { Card } from "@/modules/global/components/Card"
import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { GrJs } from "react-icons/gr"
import { PlaneGeometry } from "three"

import { ProgressCountBar } from "@/modules/global/components/ProgressCountBar"
import { StatInfo } from "@/modules/global/components/StatInfo"
import { AsciiTransition } from "@/modules/threejs/components/AsciiTransition"
import { BiLogoGoLang, BiLogoTypescript } from "react-icons/bi"
import { BsFillLightningFill } from "react-icons/bs"
import { FaHtml5, FaJava } from "react-icons/fa"
import { RiTimeFill } from "react-icons/ri"
import { TbBrandCpp, TbBrandCSharp } from "react-icons/tb"

const LANG_STATS = [
  { name: "Javascript", skill: 5, time: 5, icon: GrJs, src: "/assets/lang/js.png" },
  { name: "HTML", skill: 5, time: 4, icon: FaHtml5, src: "/assets/lang/html.png" },
  { name: "Typescript", skill: 5, time: 4, icon: BiLogoTypescript, src: "/assets/lang/ts.png" },
  { name: "Golang", skill: 4, time: 3, icon: BiLogoGoLang, src: "/assets/lang/golang.png" },
  { name: "C#", skill: 4, time: 3, icon: TbBrandCpp, src: "/assets/lang/csharp.png" },
  { name: "C++", skill: 4, time: 3, icon: TbBrandCSharp, src: "/assets/lang/cpp.png" },
  { name: "Java", skill: 4, time: 3, icon: FaJava, src: "/assets/lang/java.png" },
] as const

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
export function ProgrammingLangsCard() {
  const [activeLang, setActiveLang] = useState(0)
  const normalizedIndex = activeLang % LANG_STATS.length

  const lang = LANG_STATS[normalizedIndex]

  return (
    <Card variant={"glassy"} className="size-full flex-wrap max-md:flex-col ">
      <ProgressCountBar
        activeIndex={normalizedIndex}
        onCompleteCycle={setActiveLang}
        itemCount={LANG_STATS.length}
        className="absolute z-[40] top-0 right-0 w-fit h-full"
        onSelectItem={(index) => setActiveLang(index)}
      />

      <StatInfo
        direction={"rl"}
        text={lang.name}
        iterations={lang.name.length * 2}
        className="top-4 right-10 absolute z-40"
        bars={[
          { level: lang.skill, icon: <BsFillLightningFill className="size-5 text-gray-500" /> },
          { level: lang.time, icon: <RiTimeFill className="size-5 text-gray-500" /> },
        ]}
      />

      <div className="flex absolute left-4 top-4 gap-3 z-40 ">
        {LANG_STATS.map(({ icon: Icon }, index) => (
          <button
            className="cursor-pointer"
            role="option"
            key={`os_legened_icon_${index}`}
            onClick={() => setActiveLang(index)}
          >
            <Icon
              aria-selected={normalizedIndex == index}
              className="size-7 aria-selected:text-white duration-300 ease-out transition text-gray-500"
            />
          </button>
        ))}
      </div>

      <Suspense fallback={<h1>LOADING</h1>}>
        <Canvas>
          <AsciiTransition
            activeIndex={normalizedIndex}
            geometry={planeGeometry}
            images={LANG_STATS.map((lang) => lang.src)}
          />
        </Canvas>
      </Suspense>
    </Card>
  )
}

const planeGeometry = new PlaneGeometry(7, 7, 40, 40)
planeGeometry.setIndex(null)
randomizeAttributes(planeGeometry)
