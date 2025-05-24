import { Card } from "@/modules/global/components/Card"
import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { Canvas } from "@react-three/fiber"
import { Suspense, useRef, useState } from "react"
import { GrArchlinux, GrUbuntu } from "react-icons/gr"
import { PlaneGeometry } from "three"

import { ProgressCountBar } from "@/modules/global/components/ProgressCountBar"
import { AsciiTransition } from "@/modules/threejs/components/AsciiTransition"

const LANG_STATS = [
  { name: "Javascript", skill: 5, time: 5, icon: GrArchlinux, src: "/assets/lang/js.png" },
  { name: "HTML", skill: 5, time: 4, icon: GrUbuntu, src: "/assets/lang/html.png" },
  { name: "Typescript", skill: 5, time: 4, icon: GrUbuntu, src: "/assets/lang/ts.png" },
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
  const isTransitioning = useRef(false)

  const [activeLang, setActiveLang] = useState(0)
  const normalizedIndex = activeLang % LANG_STATS.length
  console.log(normalizedIndex)

  return (
    <Card variant={"glassy"} className="size-full flex-wrap max-md:flex-col ">
      <ProgressCountBar
        activeIndex={normalizedIndex}
        onCompleteCycle={setActiveLang}
        itemCount={LANG_STATS.length}
        // aria-hidden={!intersection.isVisible}
        className="absolute z-[40] top-0 left-0 w-fit h-full"
        onSelectItem={(index) => !isTransitioning.current && setActiveLang(index)}
      />
      <Suspense fallback={<h1>LOADING</h1>}>
        <Canvas>
          <AsciiTransition
            activeIndex={normalizedIndex}
            geometry={planeGeometry}
            images={["/assets/lang/ts.png", "/assets/lang/html.png", "/assets/lang/js.png"]}
          />
        </Canvas>
      </Suspense>
    </Card>
  )
}

const planeGeometry = new PlaneGeometry(7, 7, 40, 40)
planeGeometry.setIndex(null)
randomizeAttributes(planeGeometry)
