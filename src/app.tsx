import { View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { gsap } from "gsap"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

import "./app.css"

import type { AsciiMaterialType } from "@/modules/threejs/shaders/ascii"
import { AsciiRenderer } from "./modules/global/components/ascii-renderer"
import { GlitchText } from "./modules/global/components/glitch-text"
import { HudCard } from "./modules/global/components/hud-card"
import { MatrixRain } from "./modules/global/components/matrix-rain"
import { Navbar } from "./modules/global/components/navbar"
import { SectionLabel } from "./modules/global/components/section-label"
import { SectionShell } from "./modules/global/components/section-shell"
import { AsciiImage } from "./modules/threejs/components/ascii-image"
import { CommandLine } from "./modules/ui/components/command-line"
import { ConcaveStake } from "./modules/ui/components/concave-stake"
import { DiabloTradeGrid } from "./modules/ui/components/diablo-trade-grid"
import { FjoBondingCurve } from "./modules/ui/components/fjo-bonding-curve"
import { HexDump } from "./modules/ui/components/hex-dump"
import { KayenSwapRoute } from "./modules/ui/components/kayen-swap-route"
import { MetaRow } from "./modules/ui/components/meta-row"
import { StackRow } from "./modules/ui/components/stack-row"
import { TechTags } from "./modules/ui/components/tech-tags"
import { TerminalCard } from "./modules/ui/components/terminal-card"
import { TerminalEntry } from "./modules/ui/components/terminal-entry"
import { STACK_DATA } from "./modules/ui/lib/stack-data"

const planeGeometry = new THREE.PlaneGeometry(2, 2, 50, 50)

function App() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [matRef, setMatRef] = useState<AsciiMaterialType | null>()

  useEffect(() => {
    if (!matRef) return
    gsap.to(matRef.uniforms.u_Progress, { ease: "power4.out", duration: 1.2, value: 1 })
  }, [matRef])

  return (
    <div ref={containerRef} className="relative pt-28">
      <Navbar />

      <SectionShell
        id="about"
        innerClassName="grid grid-cols-[420px_1fr] gap-18 items-center max-[860px]:grid-cols-1 max-[860px]:max-w-105 max-[860px]:gap-12"
        background={<MatrixRain />}
      >
        <HudCard title="CHANI.IMG" footerLabel="ASCII RENDER">
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

        {/* Right: About text */}
        <div className="w-fit">
          <SectionLabel label="INIT SEQUENCE" className="mb-4" />

          <GlitchText as="h1" className="text-3xl text-terminal-white leading-[1.05] mb-1.5 max-[860px]:text-2xl">
            diogo
            <br />
            mendonça
          </GlitchText>

          <div className="text-xs text-terminal-text-dim tracking-[6px] mb-8 font-light">SR. FRONTEND ENGINEER</div>
          <p className="text-terminal-text-dim text-[12.5px] leading-8 mb-9 [&>em]:text-terminal-text [&>em]:not-italic [&>em]:border-b [&>em]:border-dashed [&>em]:border-terminal-border-bright">
            Senior Frontend Engineer with <em>5+ years</em> of experience, specializing in <em>TypeScript</em> and{" "}
            <em>React</em>. Known for leveraging hyperfocus and a relentless drive to deliver{" "}
            <em>elegant, high-performance</em> solutions.
          </p>

          <TerminalCard title="~/about">
            <TerminalEntry label="alias" value="Chani" />
            <TerminalEntry label="location" value="Brazil" />
            <TerminalEntry label="exp" value="5+ years" />
            <TerminalEntry label="focus" value="Web3 · Frontend" />
          </TerminalCard>
        </div>
      </SectionShell>

      {/* Stacks */}
      <SectionShell className="my-30" id="stacks" background={<HexDump />}>
        <SectionLabel label="TECH STACKS" />
        <div className="columns-2 gap-2  max-[860px]:grid-cols-1">
          {STACK_DATA.map((category) => (
            <TerminalCard
              className="mb-2 rounded-lg"
              key={category.path}
              title={category.path}
              scanLine
              cornerBrackets
              prompt={<CommandLine command="ls" args={["-1"]} />}
              footer={
                <span className="text-[8px] tracking-[1px] text-terminal-text-muted tabular-nums">
                  {category.files.length} files
                </span>
              }
            >
              {category.files.map((file) => (
                <StackRow
                  key={file.name}
                  icon={file.icon}
                  name={file.name}
                  ext={file.ext}
                  proficiency={file.proficiency}
                />
              ))}
            </TerminalCard>
          ))}
        </div>
      </SectionShell>

      {/* Experience */}
      <SectionLabel label="EXPERIENCE" className="max-w-270 mx-auto px-10" />
      <SectionShell
        className="overflow-hidden py-30"
        innerClassName="flex gap-4"
        background={<FjoBondingCurve className="max-h[90%]" />}
      >
        {/* Fjord Foundry */}
        <div className="relative z-1">
          <GlitchText as="h2" className="text-[38px] text-terminal-white leading-[1.1] mb-2">
            fjord foundry
          </GlitchText>
          <div className="text-xs text-terminal-text-muted tracking-[4px] mb-9">FRONTEND DEVELOPER</div>
          <MetaRow
            items={[
              { label: "period", value: "2023 — 2025" },
              { label: "status", value: "COMPLETED" },
            ]}
            className="mb-6"
          />
          <p className="text-[12.5px] text-terminal-text-dim leading-8 mb-6">
            Built the Liquidity Bootstrapping Pool UI and token management dashboards for one of DeFi's leading fair
            launch platforms.
          </p>
          <TechTags tags={["TypeScript", "React", "Next.js", "Tailwind", "Ethers", "Viem", "Wagmi"]} />
        </div>
        <TerminalCard
          fitContent
          prompt={<CommandLine command="wget" args={["-X", "https://fjordfoundry.com"]} />}
          title="Ghostty"
        >
          <AsciiRenderer className="w-fit px-3" fontSize={8} cols={100} colorMode="mono" src="/assets/fjord.webp" />
        </TerminalCard>
      </SectionShell>

      {/* Divider */}
      <div className="mx-auto max-w-270 h-px bg-linear-to-r from-transparent via-terminal-border-mid to-transparent" />

      {/* Kayen */}
      <SectionShell className="overflow-hidden py-30" innerClassName="flex" background={<KayenSwapRoute />}>
        <div className="relative z-1">
          <GlitchText as="h2" className="text-[38px] text-terminal-white leading-[1.1] mb-2">
            kayen
          </GlitchText>
          <MetaRow
            items={[
              { label: "period", value: "2024" },
              { label: "status", value: "COMPLETED" },
            ]}
            className="mb-6"
          />
          <p className="text-[12.5px] text-terminal-text-dim leading-8 mb-6">
            DEX aggregator interfaces and Solana DeFi tooling. Designed fast, responsive trading UIs for high-throughput
            environments.
          </p>
          <TechTags tags={["TypeScript", "React", "Next.js", "Solana", "Metaplex"]} />
        </div>
        <TerminalCard
          fitContent
          prompt={<CommandLine command="wget" args={["-X", "https://app.kayen.org"]} />}
          title="Ghostty"
        >
          <AsciiRenderer
            className="w-fit px-3"
            fontSize={8}
            // charset={"blocks"}
            cols={100}
            colorMode="mono"
            src="/assets/kayen.png"
          ></AsciiRenderer>
        </TerminalCard>
        {/* </div> */}
      </SectionShell>

      {/* Divider */}
      <div className="mx-auto max-w-270 h-px bg-linear-to-r from-transparent via-terminal-border-mid to-transparent" />

      <SectionShell className="overflow-hidden py-30" innerClassName="flex" background={<DiabloTradeGrid />}>
        <div className="relative z-1">
          <GlitchText as="h2" className="text-[38px] text-terminal-white leading-[1.1] mb-2">
            diablo trade
          </GlitchText>
          <div className="text-xs text-terminal-text-muted tracking-[4px] mb-9">FULLSTACK DEVELOPER</div>
          <MetaRow
            items={[
              { label: "period", value: "2023 — 2024" },
              { label: "status", value: "COMPLETED" },
            ]}
            className="mb-6"
          />
          <p className="text-[12.5px] text-terminal-text-dim leading-8 mb-6">
            Game item marketplace with real-time trading features, search indexing, and live WebSocket price feeds.
          </p>
          <TechTags tags={["TypeScript", "React", "Next.js", "tRPC", "Prisma", "PostgreSQL", "WebSockets"]} />
        </div>
        <TerminalCard
          fitContent
          prompt={<CommandLine command="wget" args={["-X", "https://diablo.trade"]} />}
          title="Ghostty"
        >
          <AsciiRenderer
            className="w-fit px-3 mt-10"
            fontSize={7.2}
            cols={100}
            colorMode="mono"
            src="/assets/sanctuary_cleaned.webp"
          />
        </TerminalCard>
      </SectionShell>

      {/* Divider */}
      <div className="mx-auto max-w-270 h-px bg-linear-to-r from-transparent via-terminal-border-mid to-transparent" />

      <SectionShell className="overflow-hidden py-30" innerClassName="flex" background={<ConcaveStake />}>
        <div className="relative z-1">
          <GlitchText as="h2" className="text-[38px] text-terminal-white leading-[1.1] mb-2">
            concave
          </GlitchText>
          <div className="text-xs text-terminal-text-muted tracking-[4px] mb-9">FRONTEND DEVELOPER</div>
          <MetaRow
            items={[
              { label: "period", value: "2021 — 2023" },
              { label: "status", value: "COMPLETED" },
            ]}
            className="mb-6"
          />
          <p className="text-[12.5px] text-terminal-text-dim leading-8 mb-6">
            DeFi protocol dashboards — staking, bonding, and liquidity UIs. Shipped production interfaces handling
            millions in TVL.
          </p>
          <TechTags tags={["TypeScript", "React", "Next.js", "Ethers", "Wagmi", "Jotai"]} />
        </div>
        <TerminalCard
          fitContent
          prompt={<CommandLine command="wget" args={["-X", "https://diablo.trade"]} />}
          title="Ghostty"
        >
          <AsciiRenderer
            className="w-fit px-3 mt-10"
            fontSize={7.2}
            cols={100}
            colorMode="mono"
            src="/assets/concave.png"
          />
        </TerminalCard>
      </SectionShell>

      {/* Single shared Canvas — renders all View portals */}
      <Canvas
        className="fixed! top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 2 }}
        eventSource={containerRef}
      >
        <View.Port />
      </Canvas>
    </div>
  )
}

export default App
