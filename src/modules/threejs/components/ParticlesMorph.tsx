import { usePrevious } from "@/modules/global/hoos/usePrevious"
import { easeInOutCubic } from "@/modules/global/lib/easeInOut"
import { useEqualizeVertices } from "@/modules/shaders/hooks/useEqualizeVertices"
import { useRandomizeAttributes } from "@/modules/shaders/hooks/useRandomizeAttributes"
import { MovingParticlesShader } from "@/modules/shaders/particles"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Clock, type Mesh } from "three"

const clock = new Clock()

interface ParticlesMorphProps {
  meshes: Mesh[]
  active: number
  randomAnimation?: boolean
  onTransitionStart?: () => void
  onTransitionEnd?: () => void
}

/**
 * Particles Morph Component
 *
 * It performs a morphing effect on particles using a shader between two meshes.
 * @param current - The current mesh to be morphed.
 * @param target - The target mesh to morph into.
 */
export function ParticlesMorph({
  meshes,
  active,
  randomAnimation,
  onTransitionEnd,
  onTransitionStart,
}: ParticlesMorphProps) {
  // Ref States
  const previousActive = usePrevious(active)
  const shouldTransition = useRef(false)
  const progress = useRef(0)

  // Shader Ref individual for each instance
  const particlesShader = useRef(new MovingParticlesShader())

  if (active > meshes.length - 1) throw new Error("active index is out of bounds")
  const virtualGeometry = useRef(meshes[active].geometry.clone())

  // This is necessary to make sure all meshes will share the same vertex count
  // So that they can transition between each other
  useRandomizeAttributes({ geometry: virtualGeometry.current, enabled: randomAnimation })
  useEqualizeVertices({ meshes })

  /**
   * Listen to active changes effect
   * Detect when the active mesh changes and set the target geometry
   */
  useEffect(() => {
    if (active === previousActive || shouldTransition.current) return

    // Define the new target geometry
    virtualGeometry.current.setAttribute("a_Target", meshes[active].geometry.attributes.position)

    // Set the transition state
    progress.current = 0
    onTransitionStart?.()
    shouldTransition.current = true
    particlesShader.current.uniforms.u_Progress.value = 0
  }, [active, previousActive])

  function updateTransition(delta: number) {
    if (!shouldTransition.current) return
    progress.current += delta * 1.2

    // Transition is done
    if (progress.current >= 1) {
      onTransitionEnd?.()
      // Reasign the geometry to the new target and new position
      virtualGeometry.current.setAttribute("position", meshes[active].geometry.attributes.position)
      virtualGeometry.current.setAttribute("a_Target", meshes[active].geometry.attributes.position)

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

    if (randomAnimation) particlesShader.current.uniforms.u_Time.value = clock.getElapsedTime()
  })

  return (
    <points
      material={particlesShader.current}
      rotation={[Math.PI / 2, 0, 0]}
      geometry={virtualGeometry.current}
      position={[0, -0, 3.5]}
    >
      {" "}
    </points>
  )
}
