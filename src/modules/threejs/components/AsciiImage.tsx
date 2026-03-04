import { useResizeObserver } from "@/modules/global/hooks/useResizeObserver"
import { useTexture, type PointsInstancesProps } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useCallback, useMemo, useRef, useState } from "react"
import { BufferGeometry, PerspectiveCamera } from "three"
import { useRandomizeAttributes } from "../hooks/useRandomizeAttributes"
import { processSpriteSheet } from "../lib/process-sprite-sheet"
import { AsciiMaterial, DEFAULT_PARTICLE_SIZE, type AsciiMaterialType } from "../shaders/ascii"

// Force side-effect import so extend() runs
void AsciiMaterial

interface AsciiImageProps extends Omit<PointsInstancesProps, "material"> {
  spriteSrc: string
  shapeSrc: string
  container?: string | HTMLElement | null
  geometry: BufferGeometry
  materialRef?: (instance: AsciiMaterialType | null) => void
  defaultProgress?: number
  size?: number
}

export function AsciiImage({
  defaultProgress = 1,
  materialRef,
  shapeSrc,
  spriteSrc,
  size,
  // container,
  ...props
}: AsciiImageProps) {
  const matRef = useRef<AsciiMaterialType>(null)

  const setMaterialRef = useCallback(
    (instance: AsciiMaterialType | null) => {
      matRef.current = instance
      materialRef?.(instance)
    },
    [materialRef],
  )

  useRandomizeAttributes({ geometry: props.geometry, enabled: true })

  const spriteTexture = useTexture(spriteSrc)
  const shapeTexture = useTexture(shapeSrc)

  const spriteData = useMemo(() => processSpriteSheet(spriteTexture), [spriteTexture])

  const aspectRatio = useMemo(() => {
    const { width, height } = shapeTexture.image as { width: number; height: number }
    return height / width
  }, [shapeTexture])

  const { camera } = useThree()
  const [containerSize, setContainerSize] = useState({ width: 1, height: 1 })

  useResizeObserver("#container", {
    onResize: (e) => {
      const { width, height } = e.contentRect
      setContainerSize({ width, height })

      if (!matRef.current) return
      matRef.current.uniforms.u_Resolution.value.set(width * window.devicePixelRatio, height * window.devicePixelRatio)
    },
  })

  // Compute viewport in world units from the View's container size + camera
  const viewViewport = useMemo(() => {
    const cam = camera as PerspectiveCamera
    const distance = cam.position.z
    const visibleHeight = 2 * Math.tan((cam.fov * Math.PI) / 360) * distance
    const viewAspect = containerSize.width / containerSize.height
    const visibleWidth = visibleHeight * viewAspect
    return { width: visibleWidth, height: visibleHeight }
  }, [camera, containerSize])

  // Scale to fit View width (geometry is 2 units wide: -1 to 1)
  const scaleX = viewViewport.width / 2
  const scaleY = aspectRatio * scaleX

  // Anchor at bottom: bottom edge of scaled geometry at View bottom
  const posY = -viewViewport.height / 2 + scaleY

  useFrame((state) => {
    if (!matRef.current) return
    matRef.current.uniforms.u_Time.value = state.clock.getElapsedTime()
  })

  return (
    <points scale={[scaleX, scaleY, 1]} position={[0, posY, 0]} {...props}>
      <asciiMaterial
        ref={setMaterialRef}
        transparent
        depthWrite={false}
        u_Progress={defaultProgress}
        u_Size={size ?? DEFAULT_PARTICLE_SIZE}
        u_SpriteSheet={spriteData.texture}
        u_SpriteCount={spriteData.spriteCount}
        u_Texture={shapeTexture}
        // u_Resolution={new Vector2(836, 1114.65625)}
      />
    </points>
  )
}
