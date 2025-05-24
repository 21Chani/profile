import { Card } from "@/modules/global/components/Card"
import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import { PlaneGeometry } from "three"

import { ProgressCountBar } from "@/modules/global/components/ProgressCountBar"
import { StatInfo } from "@/modules/global/components/StatInfo"
import { AsciiTransition } from "@/modules/threejs/components/AsciiTransition"
import { BiLogoMongodb, BiLogoPostgresql } from "react-icons/bi"
import { BsFillLightningFill } from "react-icons/bs"
import { DiMysql, DiRedis } from "react-icons/di"
import { RiTimeFill } from "react-icons/ri"

const DB_STATS = [
  { name: "Postgres", skill: 5, time: 5, icon: BiLogoPostgresql, src: "/assets/database/psql.png" },
  { name: "Redis", skill: 5, time: 4, icon: DiRedis, src: "/assets/database/redis.png" },
  { name: "MongoDB", skill: 3, time: 3, icon: BiLogoMongodb, src: "/assets/database/mongodb.png" },
  { name: "MySQL", skill: 4, time: 3, icon: DiMysql, src: "/assets/database/mysql.png" },
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
export function DatabasesCard() {
  const [activeLang, setActiveLang] = useState(0)
  const normalizedIndex = activeLang % DB_STATS.length

  const lang = DB_STATS[normalizedIndex]

  return (
    <Card variant={"glassy"} className="size-full flex-wrap max-md:flex-col ">
      <ProgressCountBar
        activeIndex={normalizedIndex}
        onCompleteCycle={setActiveLang}
        itemCount={DB_STATS.length}
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
        {DB_STATS.map(({ icon: Icon }, index) => (
          <button
            role="option"
            className="cursor-pointer"
            key={`db_legened_icon_${index}`}
            onClick={() => setActiveLang(index)}
          >
            <Icon
              aria-selected={normalizedIndex == index}
              className="size-7 aria-selected:text-white duration-300 ease-out transition text-gray-900"
            />
          </button>
        ))}
      </div>

      <Suspense fallback={<h1>LOADING</h1>}>
        <Canvas>
          <AsciiTransition
            activeIndex={normalizedIndex}
            geometry={planeGeometry}
            images={DB_STATS.map((lang) => lang.src)}
          />
        </Canvas>
      </Suspense>
    </Card>
  )
}

const planeGeometry = new PlaneGeometry(5, 5, 30, 30)
planeGeometry.setIndex(null)
randomizeAttributes(planeGeometry)
