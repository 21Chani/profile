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
export function AsciiTransition({
  images,
  geometry,
  activeIndex,
  onTransitionEnd,
  onTransitionStart,
}: AsciiTransitionProps) {
  const shaders = useRef(new ASCIITransitionShaderMaterial())
  useTexture("/sprites/numeric.png", (t) => shaders.current.setSpriteSheet(t))

  const textures = useLoader(TextureLoader, images)

  const previousIndex = usePrevious(activeIndex)
  useEffect(() => {
    shaders.current.setTexture(textures[0])
    shaders.current.setTextureTarget(textures[1])
  }, [])

  const tween = useRef(
    gsap
      .timeline({ paused: true, onComplete: onTransitionEnd, onRepeat: onTransitionStart })
      .to(shaders.current.uniforms.u_Progress, {
        value: 1,
        duration: 0.4,
        ease: "power4.in",
        onComplete: () => {
          shaders.current.setTexture(shaders.current.uniforms.u_TextureTarget!.value)
          //   randomizeAttributes(geometry)
        },
      })
      .to(shaders.current.uniforms.u_Progress, {
        value: 0,
        duration: 0.4,
        ease: "power4.out",
        onComplete() {},
      })
  )

  useEffect(() => {
    if (activeIndex === undefined) return
    if (previousIndex === activeIndex) return

    shaders.current.setTextureTarget(textures[activeIndex])

    tween.current.restart()
  }, [activeIndex])

  return <points geometry={geometry} material={shaders.current} />
}
