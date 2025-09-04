import { Card } from "@/modules/global/components/Card"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useId, useRef, useState, type ComponentPropsWithRef } from "react"

import { StatInfo } from "@/modules/global/components/StatInfo"
import { TimelineBar } from "@/modules/global/components/TimelineBar"
import { useDebounce } from "@/modules/global/hooks/useDebounce"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { mergeRefs } from "@/modules/global/lib/mergeRefs"
import { AsciiImageCarouselGroup } from "@/modules/threejs/components/AsciiImageCarouselGroup"
import { BsFillLightningFill } from "react-icons/bs"
import { RiTimeFill } from "react-icons/ri"
import { twMerge } from "tailwind-merge"
import { Group } from "three"
import type { AsciiStats } from "../types"

interface AsciiTransitionCardProps {
  className?: string
  /**
   * Stats of your ascii transition
   */
  stats: Array<AsciiStats>
}

export function AsciiTransitionCard({
  className,
  stats,
  ...props
}: AsciiTransitionCardProps & ComponentPropsWithRef<"div">) {
  const [activeAscii, setActiveAscii] = useState(0)
  const id = useId()
  const finalId = props.id ?? id

  // const normalizedIndex = activeAscii % stats.length
  const debouncedAscii = useDebounce(activeAscii, 400)

  const current = stats[debouncedAscii]
  const divRef = useRef<HTMLDivElement>(null)

  const groupsRef = useRef<Group>(null)
  useEffect(() => {
    const el = divRef.current
    if (!el) return
    const observer = new MutationObserver(() => {
      const p = parseFloat(getComputedStyle(el).getPropertyValue("--progress")) || 0
      setActiveAscii(Math.min(parseInt(`${p * stats.length}`), stats.length - 1))
      if (groupsRef.current) {
        // Full rotation = 2π radians
        const maxProgress = (1 / stats.length) * (stats.length - 1)
        // 360deg rotation.
        groupsRef.current.rotation.y = Math.min(p, maxProgress) * Math.PI * 2
      }
    })

    observer.observe(el, { attributes: true, attributeFilter: ["style"] })
    return () => observer.disconnect()
  }, [])

  const intersection = useIntersectionObserverState([`#${finalId}`], {})

  return (
    <Card
      style={{ "--progress": 0 } as React.CSSProperties}
      variant={"glassy"}
      className={twMerge("size-full flex-wrap max-md:flex-col", className)}
      {...props}
      ref={mergeRefs(divRef, props.ref)}
      id={finalId}
    >
      <TimelineBar
        sectionsAmount={stats.length}
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
        {stats.map(({ icon: Icon, name }, index) => (
          <button
            key={`ascii_legened_icon_${index}_${name}`}
            onClick={() => setActiveAscii(index)}
            className="cursor-pointer"
            role="option"
          >
            <Icon
              aria-selected={debouncedAscii == index}
              className="size-7 aria-selected:text-white duration-300 ease-out transition text-gray-500"
            />
          </button>
        ))}
      </div>

      <Suspense fallback={<></>}>
        <Canvas
          frameloop={intersection.isVisible ? "always" : "never"}
          id="ascii-program-langs"
          camera={{ far: 12 }}
          gl={{ powerPreference: "low-power" }}
        >
          <AsciiImageCarouselGroup stats={stats} container={`#${finalId}`} ref={groupsRef} />
        </Canvas>
      </Suspense>
    </Card>
  )
}
