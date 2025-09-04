import { ASCIIBackground } from "@/modules/global/components/ASCIIBackground"
import { Navbar } from "@/modules/global/components/Navbar"
import { SectionDescription } from "@/modules/global/components/layout/SectionDescription"
import { usebackgroundInteraction } from "@/modules/global/hooks/useBackgroundInteraction"
import { AsciiTransitionCard } from "@/modules/stacks/components/AsciiCarouselCard"
import { ProfileCard } from "@/modules/stacks/components/ProfileCard"
import { Summary } from "@/modules/stacks/components/Summary"
import { DATABASE_STATS, OPERATING_SYSTEM_STATS, PROGRAMMING_LANGUAGE_STATS } from "@/modules/stacks/constants/stats"
import { Terminal } from "@/modules/terminal/components/Terminal"
import { TerminalRow } from "@/modules/terminal/components/TerminalRow"
import { createFileRoute } from "@tanstack/react-router"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollSmoother, ScrollTrigger } from "gsap/all"
import { useEffect, useRef, useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import { FaDatabase, FaDesktop, FaTerminal } from "react-icons/fa"
import { RiGithubFill, RiLinkedinBoxFill } from "react-icons/ri"
import { TbMailFilled } from "react-icons/tb"
import { twMerge } from "tailwind-merge"

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother)
export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  const [terminalOpen, setTermOpen] = useState(true)
  const [fadeFinish, setFadeFinish] = useState(false)
  const { waveRef, speedRef } = usebackgroundInteraction(terminalOpen)

  const plRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: "#programming-lang",
      start: "top top",
      end: "+=2000",
      pin: true,
      onUpdate(self) {
        if (!plRef.current) return

        plRef.current.style.setProperty("--progress", `${self.progress}`)
      },
    })
    return trigger.kill
  }, [])

  return (
    <main className={twMerge("relative", terminalOpen ? "overflow-hidden max-h-screen" : "")}>
      <Terminal
        isOpen={terminalOpen}
        onOpenChange={setTermOpen}
        autoExecute={{ command: "wget https://chani.sh", shouldClose: true }}
      />
      <ASCIIBackground
        speedRef={speedRef}
        material={waveRef}
        patternSrc="/assets/waves.png"
        spriteSrc="/sprites/numeric.png"
      />
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <section className="max-w-7xl mx-auto max-lg:max-w-xl relative flex min-h-screen w-full snap-start max-lg:flex-col-reverse items-center justify-center gap-4 overflow-hidden  ">
            <Summary />
            <ProfileCard />
          </section>

          <section id="programming-lang" className="max-w-6xl mx-auto min-h-screen flex items-center">
            <article className="grid grid-cols-2 max-h-[min(100vh,384px)] h-full">
              <AsciiTransitionCard ref={plRef} stats={PROGRAMMING_LANGUAGE_STATS} className="aspect-video" />
              <SectionDescription
                title="Programming Languages"
                icon={FaTerminal}
                description="I began my programming journey at 15 by teaching myself Java to create Minecraft plugins and mods. That early curiosity sparked a deep passion for software development, leading me to explore a wide range of languages over the years — including C, C++, C#, JavaScript, TypeScript, Python, Go, and more."
              />
            </article>
          </section>
          <section className="max-w-6xl mx-auto min-h-screen flex items-center">
            <article className="grid md:grid-cols-2 max-h-[min(100vh,384px)] h-full">
              <SectionDescription
                description="Through my career, I have worked with a variety of operating systems, including Linux, Windows, and macOS."
                title="Operating Systems"
                icon={FaDesktop}
                direction="rl"
              />
              <AsciiTransitionCard stats={OPERATING_SYSTEM_STATS} className="aspect-video" />
            </article>
          </section>

          <section id="programming-lang" className="max-w-6xl mx-auto min-h-screen flex items-center">
            <article className="grid grid-cols-2 max-h-[min(100vh,384px)] h-full">
              <AsciiTransitionCard stats={DATABASE_STATS} className="aspect-video" />
              <SectionDescription
                title="Database"
                icon={FaDatabase}
                description=" My first experience with data persistence came from using .yaml files as a quick solution for storing simple data. Over time, I moved on to more robust databases like PostgreSQL and MongoDB for handling more complex and scalable storage needs."
              />
            </article>
          </section>

          <footer className="w-full bg-background-alt-2 flex p-10 flex-col">
            <div className="flex">
              <BiChevronRight className=" size-12 scale-x-75 stroke-2 stroke-gray-500" />
              <h1 className="text-5xl text-gradient-highlight">Chani._</h1>
            </div>

            <div className="gap-2 flex flex-col">
              <TerminalRow path="/usr/socials" className="mt-6">
                <div className="flex">
                  <BiChevronRight className=" size-6 scale-x-75 stroke-2 stroke-green-500" />
                  <p className="text-gray-600">ls</p>
                </div>
                <a
                  className="text-foreground-alt hover:text-foreground hover:underline transition-colors flex items-center gap-2 "
                  href="mailto: contact@chani.sh"
                  target="_blank"
                >
                  <TbMailFilled className="text-white size-5" />
                  <p>contact@chani.sh</p>
                </a>
                <a
                  className="text-foreground-alt hover:text-foreground hover:underline transition-colors flex items-center gap-2 "
                  href="https://github.com/21Chani"
                  target="_blank"
                >
                  <RiGithubFill className="text-white size-5" />
                  <p>21Chani</p>
                </a>
                <a
                  className="text-foreground-alt hover:text-foreground hover:underline transition-colors flex items-center gap-2 "
                  href="https://www.linkedin.com/in/diogo-mendon%C3%A7a-a50184234/"
                  target="_blank"
                >
                  <RiLinkedinBoxFill className="text-white size-5" />
                  <p>Diogo Mendonça</p>
                </a>
              </TerminalRow>
            </div>
          </footer>
        </div>
        {!fadeFinish && (
          <div
            data-hidden={!terminalOpen}
            onTransitionEnd={() => setFadeFinish(true)}
            className="absolute inset-0 data-[hidden=true]:opacity-0 opacity-100 duration-[1.2s] ease-out transition-all h-screen bg-black backdrop-blur-2xl w-full z-40"
          />
        )}
      </div>
    </main>
  )
}
