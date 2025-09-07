import { Card } from "@/modules/global/components/Card"
import { Suspense, useEffect, useId, useRef, useState, type ComponentPropsWithRef } from "react"

import { StatInfo } from "@/modules/global/components/StatInfo"
import { TimelineBar } from "@/modules/global/components/TimelineBar"
import { useDebounce } from "@/modules/global/hooks/useDebounce"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { mergeRefs } from "@/modules/global/lib/mergeRefs"
import { AsciiImageCarouselGroup } from "@/modules/threejs/components/AsciiImageCarouselGroup"
import { Canvas } from "@react-three/fiber"
import { BsFillLightningFill } from "react-icons/bs"
import { RiTimeFill } from "react-icons/ri"
import { twMerge } from "tailwind-merge"
import { Group } from "three"
import type { AsciiStats } from "../types"

interface AsciiCarouselCardProps {
  className?: string
  /**
   * Stats of your ascii transition
   */
  stats: Array<AsciiStats>
}

export function AsciiCarouselCard({
  className,
  stats,
  ...props
}: AsciiCarouselCardProps & ComponentPropsWithRef<"div">) {
  const [activeAscii, setActiveAscii] = useState(0)
  const id = useId()
  const finalId = props.id ?? id

  // const normalizedIndex = activeAscii % stats.length
  const debouncedAscii = useDebounce(activeAscii, 400)

  const current = stats[debouncedAscii]
  const divRef = useRef<HTMLDivElement>(null)

  const groupsRef = useRef<Group>(null)
  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    const el = divRef.current
    if (!el) return
    const observer = new MutationObserver(() => {
      const p = parseFloat(getComputedStyle(el).getPropertyValue("--progress")) || 0
      const currentItem = Math.min(parseInt(`${p * stats.length}`), stats.length - 1)
      setActiveAscii(currentItem)
      if (groupsRef.current) {
        // 360deg rotation.
        // groupsRef.current.rotation.y = (currentItem / stats.length) * Math.PI * 2
        setRotation((currentItem / stats.length) * Math.PI * 2)
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
      data-carousel={true}
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
        className="-top-2 right-4 absolute z-40"
        bars={[
          { level: current.skill, icon: <BsFillLightningFill className="size-4 text-gray-500" /> },
          { level: current.time, icon: <RiTimeFill className="size-4 text-gray-500" /> },
        ]}
      />

      <div className="flex absolute left-4 bottom-2 md:bottom-4 gap-1 md:gap-3 z-40 ">
        {stats.map(({ icon: Icon, name }, index) => (
          <button
            key={`ascii_legened_icon_${index}_${name}`}
            onClick={() => setActiveAscii(index)}
            className="cursor-pointer"
            role="option"
          >
            <Icon
              aria-selected={debouncedAscii == index}
              className="size-7 max-md:size-5 aria-selected:text-white duration-300 ease-out transition text-gray-500"
            />
          </button>
        ))}
      </div>

      <Suspense fallback={<></>}>
        <Canvas
          frameloop={intersection.isVisible ? "always" : "never"}
          id="ascii-program-langs"
          camera={{ far: 14, fov: 65, frustumCulled: true }}
          gl={{ powerPreference: "low-power" }}
        >
          <AsciiImageCarouselGroup rotation={rotation} stats={stats} container={`#${finalId}`} ref={groupsRef} />
        </Canvas>
      </Suspense>
    </Card>
  )
}
