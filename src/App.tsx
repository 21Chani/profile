import { View } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useRef } from "react"

import "./App.css"
import { Navbar } from "./modules/global/components/navbar"
import { AboutSection } from "./modules/ui/components/about-section"

function App() {
  const containerRef = useRef<HTMLDivElement>(null!)

  return (
    <div ref={containerRef} className="relative">
      <Navbar />

      {/* Page wrapper */}
      <div className="page">
        <section className="min-h-screen flex items-center justify-center px-5 pt-20 pb-10 md:px-10" id="about">
          <div className="max-w-[1080px] w-full">
            <AboutSection />
          </div>
        </section>
        <section
          className="min-h-screen flex items-center justify-center px-5 pt-20 pb-10 md:px-10"
          id="about"
        ></section>
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
