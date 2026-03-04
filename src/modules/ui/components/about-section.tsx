import { View } from "@react-three/drei"

import { HudCard } from "../../global/components/hud-card"
import { SectionLabel } from "../../global/components/section-label"
import { useCardTilt } from "../../global/hooks/use-card-tilt"

import type { AsciiMaterialType } from "@/modules/threejs/shaders/ascii"
import { gsap } from "gsap"
import { useEffect, useState } from "react"
import * as THREE from "three"
import { AsciiImage } from "../../threejs/components/AsciiImage"
import { TerminalCard } from "./terminal-card"

const terminalLines = [
  { key: "alias", value: "Chani" },
  { key: "location", value: "Brazil" },
  { key: "exp", value: "5+ years" },
  { key: "focus", value: "Web3 · Frontend" },
] as const

const planeGeometry = new THREE.PlaneGeometry(2, 2, 50, 50)

export function AboutSection() {
  const { wrapperRef, cardRef, coordinates, onMouseMove, onMouseLeave } = useCardTilt()
  const [matRef, setMatRef] = useState<AsciiMaterialType | null>()

  useEffect(() => {
    if (!matRef) return

    gsap.to(matRef.uniforms.u_Progress, { ease: "power4.out", duration: 1.2, value: 1 })
  }, [matRef])

  return (
    <div className="grid grid-cols-[420px_1fr] gap-18 items-center max-[860px]:grid-cols-1 max-[860px]:max-w-105 max-[860px]:gap-12">
      {/* Left: HUD Card */}
      <div ref={wrapperRef} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{ perspective: "1200px" }}>
        <div
          ref={cardRef}
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.08s ease-out",
          }}
        >
          <HudCard title="CHANI.IMG" footerLabel="ASCII RENDER" coordinates={coordinates}>
            <View className="absolute inset-0 -z-10" id="container">
              <AsciiImage
                defaultProgress={0}
                materialRef={setMatRef}
                spriteSrc="/sprites/numeric.png"
                shapeSrc="/assets/profile.png"
                geometry={planeGeometry}
                size={0.05}
              />
            </View>
          </HudCard>
        </div>
      </div>

      {/* Right: About text */}
      <div className="max-w-120">
        <SectionLabel label="INIT SEQUENCE" className="mb-4" />

        <h1 className="font-display text-3xl text-terminal-white leading-[1.05] mb-1.5 relative max-[860px]:text-2xl">
          diogo
          <br />
          mendonça
          <span
            className="absolute top-0 left-0 w-full h-full text-terminal-white opacity-0 animate-glitch pointer-events-none [clip-path:inset(15%_0_65%_0)] [animation-delay:0.1s]"
            aria-hidden="true"
          >
            diogo
            <br />
            mendonça
          </span>
          <span
            className="absolute top-0 left-0 w-full h-full text-terminal-white opacity-0 animate-glitch pointer-events-none [clip-path:inset(65%_0_10%_0)] [animation-delay:0.25s]"
            aria-hidden="true"
          >
            diogo
            <br />
            mendonça
          </span>
        </h1>

        <div className="text-xs text-terminal-text-dim tracking-[6px] mb-8 font-light">SR. FRONTEND ENGINEER</div>

        <p className="text-terminal-text-dim text-[12.5px] leading-8 mb-9 [&>em]:text-terminal-text [&>em]:not-italic [&>em]:border-b [&>em]:border-dashed [&>em]:border-terminal-border-bright">
          Senior Frontend Engineer with <em>5+ years</em> of experience, specializing in <em>TypeScript</em> and{" "}
          <em>React</em>. Known for leveraging hyperfocus and a relentless drive to deliver{" "}
          <em>elegant, high-performance</em> solutions.
        </p>

        <TerminalCard title="~/about">
          {terminalLines.map(({ key, value }) => (
            <div key={key} className="flex py-0.75">
              <span className="text-terminal-text-muted mr-2 select-none">▸</span>
              <span className="text-terminal-text-muted inline-block w-[100px]">{key}</span>
              <span className="text-terminal-text">{value}</span>
            </div>
          ))}
        </TerminalCard>
      </div>
    </div>
  )
}
