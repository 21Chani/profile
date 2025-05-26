import { usePrevious } from "@/modules/global/hooks/usePrevious"
import { useTexture } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { TextureLoader, type BufferGeometry } from "three"
import { ASCIITransitionShaderMaterial } from "../shaders/ascii_transition"

interface AsciiTransitionProps {
  images: string[]
  geometry: BufferGeometry

  activeIndex?: number
  onTransitionEnd?: () => void
  onTransitionStart?: () => void
}
/**
 * ASCII Transition Component
 *
 * Performs a transition between two textures or more using a shader material.
 * The transition is done by collapsing the vertices positions to the center
 * and then setting the target texture to the current one.
 *
 * @param images - Array of image URLs to be used as textures.
 * @param geometry - Geometry to be used for the transition.
 * @param activeIndex - Index of the current image to be displayed.
 * @param onTransitionEnd - Callback function to be called when the transition ends.
 * @param onTransitionStart - Callback function to be called when the transition starts.
 * @returns
 */
export function AsciiTransition({
  images,
  geometry,
  activeIndex,
  onTransitionEnd,
  onTransitionStart,
}: AsciiTransitionProps) {
  // Threejs related hooks
  useTexture("/sprites/numeric.png", (t) => shaders.current.setSpriteSheet(t))
  const textures = useLoader(TextureLoader, images, undefined)

  // Reference variables
  const shaders = useRef(new ASCIITransitionShaderMaterial())
  const previousIndex = usePrevious(activeIndex)
  const tween = useRef(
    gsap
      .timeline({ paused: true, onComplete: onTransitionEnd, onRepeat: onTransitionStart })
      // This will led the transition to the climax.
      // When the value is 1, the vertices positions will be collapsed at center.
      // Then whe set the target texture to the current one
      .to(shaders.current.uniforms.u_Progress, {
        value: 1,
        duration: 0.4,
        ease: "power4.in",
        onComplete: () => {
          // This will set the target texture to the current one
          // Since we are using `ref` to store the shader material
          // It is safe to get the values here when this callback is called, ref is always up to date
          // And no state is necessary to recraft this tween.
          shaders.current.setTexture(shaders.current.uniforms.u_TextureTarget!.value)
        },
      })
      // Reset the progress to 0
      .to(shaders.current.uniforms.u_Progress, { value: 0, duration: 0.4, ease: "power4.out", onComplete() {} })
  )

  // ###################################
  // EFFECTS

  // Initialize the shaders textures
  useEffect(() => {
    shaders.current.setTexture(textures[0])
    shaders.current.setTextureTarget(textures[1])
    // if (textures.length < 2) throw new Error("Please provide at least 2 images to create ascii transition")
  }, [textures])

  /**
   * Use effect responsible for detecting updates on the active index
   * and triggering the transition
   */
  useEffect(() => {
    if (activeIndex === undefined) return
    if (previousIndex === activeIndex) return // It means it is the first render

    // All it is necessary to clean and set before start the transition is just
    // To set what texture is going to be used as the target
    // Take a look on tween timeline to understand what is going on on which moment.
    shaders.current.setTextureTarget(textures[activeIndex])

    // Restart instead of `play` will make sure that the animation will start from the beginning
    tween.current.restart()
  }, [activeIndex])

  return <points geometry={geometry} material={shaders.current} />
}
