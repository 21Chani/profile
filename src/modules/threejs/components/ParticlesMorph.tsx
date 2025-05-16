import { usePrevious } from "@/modules/global/hooks/usePrevious"
import { easeInOutCubic } from "@/modules/global/lib/easeInOut"
import { useEqualizeVertices } from "@/modules/shaders/hooks/useEqualizeVertices"
import { useRandomizeAttributes } from "@/modules/shaders/hooks/useRandomizeAttributes"
import { MovingParticlesShader } from "@/modules/shaders/particles"
import { useFrame } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import { BufferAttribute, BufferGeometry, Clock } from "three"
import { generateSingularity } from "../lib/geometires"

const clock = new Clock()

interface ParticlesMorphProps {
  buffers: BufferGeometry[]
  active: number
  randomAnimation?: boolean
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
  isAppearing?: boolean
  isDisappearing?: boolean
  isVisible?: boolean
}

/**
 * Particles Morph Component
 *
 * It performs a morphing effect on particles using a shader between two meshes.
 * @param current - The current mesh to be morphed.
 * @param target - The target mesh to morph into.
 * @param randomAnimation - If true, makes a random animation for the particles.
 * @param onTransitionStart - Callback function to be called when the transition starts.
 * @param onTransitionEnd - Callback function to be called when the transition ends.
 * @param isAppearing - If true, the particles will appear.
 * @param isDisappearing - If true, the particles will disappear.
 */
export function ParticlesMorph({
  buffers,
  active,
  randomAnimation,
  onTransitionEnd,
  onTransitionStart,
  isAppearing,
  isDisappearing,
  isVisible,
}: ParticlesMorphProps) {
  // Ref States
  const shouldTransition = useRef(false)
  const progress = useRef(0)
  const finalPosition = useRef<BufferAttribute>(undefined)
  const previousActive = usePrevious(active)

  // Shader Ref individual for each instance
  const particlesShader = useRef(new MovingParticlesShader())

  if (active > buffers.length - 1) throw new Error("active index is out of bounds")
  const virtualGeometry = useRef(buffers[active].clone())

  // This is necessary to make sure all meshes will share the same vertex count
  // So that they can transition between each other
  const equalize = useEqualizeVertices({ buffers })
  useRandomizeAttributes({
    geometry: virtualGeometry.current,
    overridePosCount: equalize.highestVertexCount,
    enabled: randomAnimation,
  })

  function initializeTransition({ target, from }: { target: BufferGeometry; from?: BufferGeometry }) {
    // Define the new target geometry
    if (from) virtualGeometry.current.setAttribute("position", from.attributes.position)
    virtualGeometry.current.setAttribute("a_Target", target.attributes.position)

    finalPosition.current = target.attributes.position as BufferAttribute

    // Set the transition state
    progress.current = 0
    onTransitionStart?.()
    shouldTransition.current = true
    particlesShader.current.uniforms.u_Progress.value = 0
  }

  const appearGeometry = useMemo(() => generateSingularity(equalize.highestVertexCount), [equalize.highestVertexCount])

  // Appear and disappear effect.
  useEffect(() => void (isDisappearing && initializeTransition({ target: appearGeometry })), [isDisappearing])
  useEffect(
    () => void (isAppearing && initializeTransition({ target: buffers[active], from: appearGeometry })),
    [isAppearing]
  )

  /**
   * Listen to active changes effect
   * Detect when the active mesh changes and set the target geometry
   */
  useEffect(() => {
    if (active === previousActive || shouldTransition.current) return
    initializeTransition({ target: buffers[active] })
  }, [active, previousActive])

  function updateTransition(delta: number) {
    if (!shouldTransition.current) return
    progress.current += delta * 1.2

    // Transition is done
    if (progress.current >= 1) {
      onTransitionEnd?.()
      // Reasign the geometry to the new target and new position
      if (finalPosition.current) {
        virtualGeometry.current.setAttribute("position", finalPosition.current)
        virtualGeometry.current.setAttribute("a_Target", finalPosition.current)
      }

      // Reset the transition state
      particlesShader.current.uniforms.u_Progress.value = 0
      shouldTransition.current = false
      progress.current = 0
      return
    }

    particlesShader.current.uniforms.u_Progress.value = easeInOutCubic(progress.current)
  }

  useFrame(() => {
    const delta = clock.getDelta()
    updateTransition(delta)

    if (!isVisible) return
    if (randomAnimation) particlesShader.current.uniforms.u_Time.value = clock.getElapsedTime()
  })

  return (
    <points
      material={particlesShader.current}
      rotation={[Math.PI / 2, 0, 0]}
      geometry={virtualGeometry.current}
      position={[0, -0, 3.5]}
    />
  )
}
