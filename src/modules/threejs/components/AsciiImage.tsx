import { useResizeObserver } from "@/modules/global/hooks/useResizeObserver"
import { mergeRefs } from "@/modules/global/lib/mergeRefs"
import { useTexture, type PointsInstancesProps } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useImperativeHandle, useRef, type Ref, type RefObject } from "react"
import { BufferGeometry, Points } from "three"
import { ASCIIShaderMaterial } from "../shaders/ascii"

interface AsciiImageProps extends Omit<PointsInstancesProps, "material"> {
  /**
   * Sprite image for rendering points
   */
  spriteSrc: string
  /**
   * Image to be drawn by points giving ascii art aspect.
   */
  shapeSrc: string
  /**
   * Container to watch proportions and give right aspect ratio to points.
   * It will watch container resive events so proportions will be always correct.
   */
  container?: string | HTMLElement | null
  /**
   * Geometry to be used.
   */
  geometry: BufferGeometry
  /**
   * Shaders Material Reference
   */
  materialRef?: Ref<ASCIIShaderMaterial> | ((instance: ASCIIShaderMaterial | null) => void)
  /**
   * Object reference
   */
  ref?: RefObject<Points>
  /**
   * Initial appear progress animation
   */
  defaultProgress?: number
  size?: number
}

export function AsciiImage({
  defaultProgress = 1,
  materialRef,
  shapeSrc,
  spriteSrc,
  ref,
  size,
  container,
  ...props
}: AsciiImageProps) {
  const shaderMaterial = useRef(new ASCIIShaderMaterial({ size, progress: defaultProgress }))
  useImperativeHandle(materialRef, () => shaderMaterial.current, [shaderMaterial]) // Expose material ref.

  // Reference variables.
  const points = useRef<Points>(null)

  // Load necessary textures.
  useTexture(spriteSrc, (texture) => shaderMaterial.current.setSpriteSheet(texture))
  useTexture(shapeSrc, (txt) => {
    // Update the mesh scale on Y to match the aspect ratio of the image.
    const { width, height } = txt.image
    const aspectRatio = height / width
    points.current?.scale.setY(aspectRatio)

    // Set the texture to the shader material
    shaderMaterial.current.setTexture(txt)
  })

  useResizeObserver(container ? [container] : [], {
    onResize: (e) => {
      shaderMaterial.current.uniforms.u_Resolution.value.y = e.contentRect.height * window.devicePixelRatio
      shaderMaterial.current.uniforms.u_Resolution.value.x = e.contentRect.width * window.devicePixelRatio
    },
  })

  // Time updater
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    shaderMaterial.current.uniforms.u_Time.value = time
  })

  return (
    <points
      ref={mergeRefs(points, ref)}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      //   geometry={props.geometry}
      material={shaderMaterial.current}
      {...props}
    />
  )
}
