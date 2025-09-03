import { ASCIIWaveShaderMaterial } from "@/modules/threejs/shaders/ascii_wave"
import { ScrollSmoother } from "gsap/ScrollSmoother"

import { useEffect, useRef } from "react"
import { clamp, lerp } from "three/src/math/MathUtils.js"

export function usebackgroundInteraction(disabled?: boolean) {
  const currentWaveLength = useRef(ASCIIWaveShaderMaterial.DEFAULT_WAVE_LENGTH)
  const currentWaveSpread = useRef(ASCIIWaveShaderMaterial.DEFAULT_WAVE_SPREAD)
  const waveRef = useRef<ASCIIWaveShaderMaterial>(null)
  const speedRef = useRef(1)

  useEffect(() => {
    if (disabled) return
    const trigger = ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      speed: 0.7,

      onUpdate(self) {
        const velocity = self.getVelocity()

        const targetWaveLength = clamp(
          Math.abs(velocity) / 2000,
          ASCIIWaveShaderMaterial.DEFAULT_WAVE_LENGTH,
          ASCIIWaveShaderMaterial.DEFAULT_WAVE_LENGTH * 3
        )

        const targetWaveSpread = clamp(
          Math.abs(velocity) / 200,
          ASCIIWaveShaderMaterial.DEFAULT_WAVE_SPREAD,
          ASCIIWaveShaderMaterial.DEFAULT_WAVE_SPREAD * 2
        )
        const ease = 0.001

        // Smoothly approach target values
        currentWaveLength.current = lerp(currentWaveLength.current, targetWaveLength, ease)
        currentWaveSpread.current = lerp(currentWaveSpread.current, targetWaveSpread, ease)

        speedRef.current = 1 + velocity / 50
        if (waveRef.current) {
          waveRef.current.uniforms.u_WaveLength.value = currentWaveLength.current
          waveRef.current.uniforms.u_WaveSpread.value = currentWaveSpread.current
        }
      },
    })
    return trigger.kill
  }, [disabled])

  return {
    waveRef,
    speedRef,
  }
}
