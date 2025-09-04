import { mergeRefs } from "@/modules/global/lib/mergeRefs"
import { ASCII_PLANE_GEOMETRY } from "@/modules/stacks/constants/geometries"
import type { AsciiStats } from "@/modules/stacks/types"
import { useMemo, useRef, type Ref } from "react"
import { Vector3, type Group } from "three"
import { AsciiImage } from "./AsciiImage"

interface AsciiImageCarouselGroupProps {
  /**
   * Positions with calculated position in group.
   */
  stats: AsciiStats[]
  /**
   * Radius of carousel
   */
  radius?: number

  ref?: Ref<Group>
  container: string
}

export function AsciiImageCarouselGroup({ ref, container, radius = 15, stats }: AsciiImageCarouselGroupProps) {
  const groupsRef = useRef<Group>(null)

  const positions = useMemo(() => {
    const angleStep = (2 * Math.PI) / stats.length // 3 points => 120° apart
    const initialOffset = Math.PI * 2.5
    return stats.map((stat, i) => {
      const angle = i * angleStep + initialOffset
      const x = Math.cos(angle) * radius
      const y = 0
      const z = Math.sin(angle) * radius
      return { ...stat, pos: new Vector3(x, y, z) }
    })
  }, [stats, radius])

  return (
    <group ref={mergeRefs(groupsRef, ref)} position={[0, 0, -18]}>
      {positions.map((stat, i) => (
        <AsciiImage
          container={container}
          shapeSrc={stat.src}
          spriteSrc="/sprites/numeric.png"
          key={i}
          position={stat.pos.toArray()}
          rotation={[0, Math.atan2(stat.pos.x, stat.pos.z), 0]} // Face outward
          geometry={ASCII_PLANE_GEOMETRY}
          frustumCulled={true}
          size={0.15}
        />
      ))}
    </group>
  )
}
