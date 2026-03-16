import { View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Analytics } from "@vercel/analytics/react"
import { gsap } from "gsap"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

import "./app.css"

import type { AsciiMaterialType } from "@/modules/threejs/shaders/ascii"
import { AsciiRenderer } from "./modules/global/components/ascii-renderer"
import { Em } from "./modules/global/components/em"
import { GlitchText } from "./modules/global/components/glitch-text"
import { HudCard } from "./modules/global/components/hud-card"
import { MatrixRain } from "./modules/global/components/matrix-rain"
import { Navbar } from "./modules/global/components/navbar"
import { SectionLabel } from "./modules/global/components/section-label"
import { SectionShell } from "./modules/global/components/section-shell"
import { useTheme } from "./modules/global/hooks/use-theme"
import { AsciiImage } from "./modules/threejs/components/ascii-image"
import { CommandLine } from "./modules/ui/components/command-line"
import { ConcaveStake } from "./modules/ui/components/concave-stake"
import { ContactLink } from "./modules/ui/components/contact-link"
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
  const isLightTheme = useTheme().theme === "light"

  const [matRef, setMatRef] = useState<AsciiMaterialType | null>()

  useEffect(() => {
    if (!matRef) return
    gsap.to(matRef.uniforms.u_Progress, { ease: "power4.out", duration: 1.2, value: 1 })
  }, [matRef])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    // Wait for React to finish rendering before scrolling
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" })
    })
  }, [])

  return (
    <div ref={containerRef} className="relative pt-28">
      <Analytics />
      <Navbar />

      <SectionShell
        id="about"
        innerClassName="grid grid-cols-[420px_1fr] gap-18 items-center max-[860px]:grid-cols-1 max-[860px]:gap-12"
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

          <div className="text-xs text-terminal-text-dim tracking-[6px] mb-8 font-light">SR. FULL-STACK ENGINEER</div>
          <p className="text-terminal-text-dim text-[12.5px] mb-9">
            Hey, I'm Diogo — most people call me <Em>Chani</Em>. Full-stack dev from Brazil, been building for the web
            for 5+ years. Lately I've been all in on <Em>web3</Em> — DeFi protocols, DEX aggregators, token launches,
            that kind of thing.
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
      <SectionShell className="my-16 md:my-30" id="stacks" background={<HexDump />}>
        <SectionLabel label="TECH STACKS" />
        <div className="columns-2 gap-2 max-[860px]:columns-1">
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
      <SectionLabel id="work" label="EXPERIENCE" className="max-w-270 mx-auto px-5 md:px-10" />
      <SectionShell
        className="overflow-hidden py-16 md:py-30"
        innerClassName="flex flex-col md:flex-row gap-4"
        background={<FjoBondingCurve className="max-h[90%]" />}
      >
        {/* Fjord Foundry */}
        <div className="relative z-1">
          <GlitchText as="h2" className="text-2xl md:text-[38px] text-terminal-white leading-[1.1] mb-2">
            fjord foundry
          </GlitchText>
          <div className="text-xs text-terminal-text-muted tracking-[4px] mb-9">SR. WEB3 FULL-STACK DEVELOPER</div>
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
          className="hidden md:block"
          prompt={<CommandLine command="wget" args={["-X", "https://fjordfoundry.com"]} />}
          title="Ghostty"
        >
          <AsciiRenderer
            className="w-fit px-3"
            fontSize={8}
            cols={100}
            colorMode="mono"
            inverse={isLightTheme}
            contrast={1.3}
            src="/assets/fjord.webp"
          />
        </TerminalCard>
      </SectionShell>

      {/* Divider */}
      <div className="mx-auto max-w-270 h-px bg-linear-to-r from-transparent via-terminal-border-mid to-transparent" />

      {/* Kayen */}
      <SectionShell
        className="overflow-hidden py-16 md:py-30"
        innerClassName="flex flex-col md:flex-row"
        background={<KayenSwapRoute />}
      >
        <div className="relative z-1">
          <GlitchText as="h2" className="text-2xl md:text-[38px] text-terminal-white leading-[1.1] mb-2">
            kayen
          </GlitchText>
          <div className="text-xs text-terminal-text-muted tracking-[4px] mb-9">SR. WEB3 FULL-STACK DEVELOPER</div>
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
          className="hidden md:block"
          prompt={<CommandLine command="wget" args={["-X", "https://app.kayen.org"]} />}
          title="Ghostty"
        >
          <AsciiRenderer
            className="w-fit px-3"
            fontSize={8}
            cols={100}
            colorMode="mono"
            contrast={1.2}
            inverse={isLightTheme}
            src="/assets/kayen.png"
          />
        </TerminalCard>
      </SectionShell>

      {/* Divider */}
      <div className="mx-auto max-w-270 h-px bg-linear-to-r from-transparent via-terminal-border-mid to-transparent" />

      <SectionShell
        className="overflow-hidden py-16 md:py-30"
        innerClassName="flex flex-col md:flex-row"
        background={<DiabloTradeGrid />}
      >
        <div className="relative z-1">
          <GlitchText as="h2" className="text-2xl md:text-[38px] text-terminal-white leading-[1.1] mb-2">
            diablo trade
          </GlitchText>
          <div className="text-xs text-terminal-text-muted tracking-[4px] mb-9">FULL-STACK DEVELOPER</div>
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
          className="hidden md:block"
          prompt={<CommandLine command="wget" args={["-X", "https://diablo.trade"]} />}
          title="Ghostty"
        >
          <AsciiRenderer
            className="w-fit px-3 mt-10"
            fontSize={7.2}
            // contrast={1.3}
            cols={100}
            colorMode="mono"
            inverse={isLightTheme}
            src="/assets/sanctuary_cleaned.webp"
          />
        </TerminalCard>
      </SectionShell>

      {/* Divider */}
      <div className="mx-auto max-w-270 h-px bg-linear-to-r from-transparent via-terminal-border-mid to-transparent" />

      <SectionShell
        className="overflow-hidden py-16 md:py-30"
        innerClassName="flex flex-col md:flex-row"
        background={<ConcaveStake />}
      >
        <div className="relative z-1">
          <GlitchText as="h2" className="text-2xl md:text-[38px] text-terminal-white leading-[1.1] mb-2">
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
          className="hidden md:block"
          prompt={<CommandLine command="wget" args={["-X", "https://app.concave.lol"]} />}
          title="Ghostty"
        >
          <AsciiRenderer
            className="w-fit px-3 mt-10"
            fontSize={7.2}
            cols={100}
            colorMode="mono"
            contrast={1.8}
            inverse={isLightTheme}
            src="/assets/concave.png"
          />
        </TerminalCard>
      </SectionShell>

      {/* Divider */}
      <div className="mx-auto max-w-270 h-px bg-linear-to-r from-transparent via-terminal-border-mid to-transparent" />

      {/* Contact */}
      <SectionShell
        id="contact"
        className="py-16 md:py-30 min-h-screen items-center flex"
        innerClassName="grid grid-cols-2 gap-18 items-start max-[860px]:grid-cols-1 max-[860px]:gap-12"
      >
        <div>
          <SectionLabel label="CONTACT" className="mb-8" />
          <GlitchText as="h2" className="text-[36px] text-terminal-white leading-[1.1] mb-5 max-[860px]:text-[28px]">
            let's
            <br />
            build
          </GlitchText>
          <p className="text-[12.5px] text-terminal-text-dim leading-8">
            Always happy to connect over <Em>interesting</Em> projects and <Em>ideas</Em>.
          </p>
        </div>

        <nav className="flex flex-col gap-0.5" aria-label="Contact links">
          <ContactLink label="EMAIL" value="contact@chani.sh" href="mailto:contact@chani.sh" />
          <ContactLink label="GITHUB" value="github.com/21Chani" href="https://github.com/21Chani" external />
          <ContactLink label="WEB" value="chani.sh" href="https://chani.sh" />
        </nav>
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
