import { View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"

import "./App.css"
import { Navbar } from "./modules/global/components/navbar"
import { SectionLabel } from "./modules/global/components/section-label"
import { ASCIIWaves } from "./modules/threejs/components/ascii-waves"
import { AboutSection } from "./modules/ui/components/about-section"
import { StackRow } from "./modules/ui/components/stack-row"
import { TerminalCard } from "./modules/ui/components/terminal-card"
import { STACK_DATA } from "./modules/ui/lib/stack-data"

function App() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const speedRef = useRef(1)

  return (
    <div ref={containerRef} className="relative">
      <Navbar />

      <div className="w-screen h-screen fixed inset-0 -z-10">
        <Canvas>
          <ASCIIWaves spriteSrc="/sprites/numeric.png" speedRef={speedRef} />
        </Canvas>
      </div>
      {/* Page wrapper */}
      <div className="page">
        <section className="min-h-screen flex items-center justify-center px-5 pt-20 pb-10 md:px-10" id="about">
          <div className="max-w-270 w-full ">
            <AboutSection />
          </div>
        </section>

        {/* Stacks */}
        <section className="py-30 px-10 max-w-270 mx-auto" id="stacks">
          <SectionLabel label="TECH STACKS" />
          <div className="columns-2 gap-2  max-[860px]:grid-cols-1">
            {STACK_DATA.map((category) => (
              <TerminalCard
                className="mb-2"
                key={category.path}
                title={category.path}
                scanLine
                cornerBrackets
                prompt={
                  <>
                    <span className="text-terminal-text-dim">$</span>
                    <span className="text-terminal-text ml-1.5">ls</span>
                    <span className="text-terminal-text-muted ml-1.5">-1</span>
                  </>
                }
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
        </section>
      </div>

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
