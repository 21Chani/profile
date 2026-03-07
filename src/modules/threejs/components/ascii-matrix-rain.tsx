import { useResizeObserver } from "@/modules/global/hooks/useResizeObserver"
import { useTexture, type PointsInstancesProps } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useCallback, useMemo, useRef, useState } from "react"
import { BufferGeometry, PerspectiveCamera } from "three"
import { useMatrixTexture } from "../hooks/use-matrix-texture"
import { useRandomizeAttributes } from "../hooks/useRandomizeAttributes"
import { type MatrixRainConfig } from "../lib/matrix-rain-renderer"
import { processSpriteSheet } from "../lib/process-sprite-sheet"
import { AsciiMaterial, DEFAULT_PARTICLE_SIZE, type AsciiMaterialType } from "../shaders/ascii"

// Force side-effect import so extend() runs
void AsciiMaterial

interface AsciiMatrixRainProps extends Omit<PointsInstancesProps, "material"> {
  spriteSrc: string
  geometry: BufferGeometry
  matrixConfig?: Partial<MatrixRainConfig>
  materialRef?: (instance: AsciiMaterialType | null) => void
  size?: number
}

export function AsciiMatrixRain({
  spriteSrc,
  matrixConfig,
  materialRef,
  size,
  ...props
}: AsciiMatrixRainProps) {
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
  const spriteData = useMemo(() => processSpriteSheet(spriteTexture), [spriteTexture])

  const matrixTexture = useMatrixTexture(matrixConfig)

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

  const viewViewport = useMemo(() => {
    const cam = camera as PerspectiveCamera
    const distance = cam.position.z
    const visibleHeight = 2 * Math.tan((cam.fov * Math.PI) / 360) * distance
    const viewAspect = containerSize.width / containerSize.height
    const visibleWidth = visibleHeight * viewAspect
    return { width: visibleWidth, height: visibleHeight }
  }, [camera, containerSize])

  // Scale to fill viewport (geometry is 2 units wide: -1 to 1)
  const scaleX = viewViewport.width / 2
  const scaleY = viewViewport.height / 2

  useFrame((state) => {
    if (!matRef.current) return
    matRef.current.uniforms.u_Time.value = state.clock.getElapsedTime()
  })

  return (
    <points scale={[scaleX, scaleY, 1]} {...props}>
      <asciiMaterial
        ref={setMaterialRef}
        transparent
        depthWrite={false}
        u_Progress={1}
        u_Size={size ?? DEFAULT_PARTICLE_SIZE}
        u_SpriteSheet={spriteData.texture}
        u_SpriteCount={spriteData.spriteCount}
        u_Texture={matrixTexture}
      />
    </points>
  )
}
