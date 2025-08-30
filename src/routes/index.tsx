import { ASCIIBackground } from "@/modules/global/components/ASCIIBackground"
import { EncryptedText } from "@/modules/global/components/EncryptedText"
import { Navbar } from "@/modules/global/components/Navbar"
import { Paragraph } from "@/modules/global/components/Paragraph"
import { useIntersectionObserver } from "@/modules/global/hooks/useIntersectionObserver"
import { DatabasesCard } from "@/modules/stacks/components/DatabasesCard"
import { OperatingSystemCard } from "@/modules/stacks/components/OperatingSystemCard"
import { ProfileCard } from "@/modules/stacks/components/ProfileCard"
import { ProgrammingLangsCard } from "@/modules/stacks/components/ProgrammingLangsCard"
import { Summary } from "@/modules/stacks/components/Summary"
import { TerminalRow } from "@/modules/terminal/components/TerminalRow"
import { TerminalEvents } from "@/modules/terminal/events"
import { ASCIIWaveShaderMaterial } from "@/modules/threejs/shaders/ascii_wave"
import { createFileRoute } from "@tanstack/react-router"

import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollSmoother, ScrollTrigger } from "gsap/all"
import { Suspense, useEffect, useRef } from "react"
import { BiChevronRight } from "react-icons/bi"
import { FaDatabase, FaDesktop, FaTerminal } from "react-icons/fa"
import { RiGithubFill, RiLinkedinBoxFill } from "react-icons/ri"
import { TbMailFilled } from "react-icons/tb"
import { clamp, lerp } from "three/src/math/MathUtils.js"

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, ScrollSmoother)
export const Route = createFileRoute("/")({
  component: App,
})

function App() {
  useIntersectionObserver(["#programming_languages", "#introduction", "#databases", "#operating-systems"], {
    onAppear: ({ target }) => target.setAttribute("aria-hidden", "false"),
    onLeave: ({ target }, { direction }) => {
      target.setAttribute("data-direction", direction)
      target.setAttribute("aria-hidden", "true")
      // target.classList.add("truet")
    },
    threshold: 0.4,
  })

  useEffect(() => void TerminalEvents.emit("execute", "wget https://chani.sh "), [])

  const waveRef = useRef<ASCIIWaveShaderMaterial>(null)
  const speedRef = useRef(1)
  let currentWaveLength = ASCIIWaveShaderMaterial.DEFAULT_WAVE_LENGTH
  let currentWaveSpread = ASCIIWaveShaderMaterial.DEFAULT_WAVE_SPREAD
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      speed: 0.5,

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
        // Easing factor (0.1 = slow ease, 1 = instant)
        const ease = 0.001

        // Smoothly approach target values
        currentWaveLength = lerp(currentWaveLength, targetWaveLength, ease)
        currentWaveSpread = lerp(currentWaveSpread, targetWaveSpread, ease)

        speedRef.current = 1 + velocity / 50
        if (waveRef.current) {
          waveRef.current.uniforms.u_WaveLength.value = currentWaveLength
          waveRef.current.uniforms.u_WaveSpread.value = currentWaveSpread
        }
      },
    })
  }, [])

  return (
    <main className="relative">
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

          <section aria-label="Programming Languages" className="max-w-7xl mx-auto flex h-screen items-center ">
            <div id="programming_languages" className="group appearable grid grid-cols-3 max-md:grid-cols-1 testing">
              <div className="col-span-2 aspect-video size-full h-full min-h-[440px] ">
                <ProgrammingLangsCard />
              </div>
              <div className="row-span-2 flex size-full h-full flex-col p-4 max-md:-order-1">
                <FaTerminal className="size-6 mt-auto fill-white" />
                <h1 className="text-3xl font-bold uppercase text-gradient-highlight">
                  <EncryptedText text="Programming" iterations={20} /> <br />{" "}
                  <EncryptedText text="Languages" iterations={20} />
                </h1>
                <Paragraph className="text-sm ">
                  I began my programming journey at 15 by teaching myself Java to create Minecraft plugins and mods.
                  That early curiosity sparked a deep passion for software development, leading me to explore a wide
                  range of languages over the years — including C, C++, C#, JavaScript, TypeScript, Python, Go, and
                  more.
                </Paragraph>
              </div>
            </div>
          </section>

          <section aria-label="Opearing Systems" className="max-w-7xl mx-auto flex h-screen items-center">
            <div id="operating-systems" className="group appearable grid grid-cols-3 max-md:grid-cols-1">
              <div className="flex size-full h-full flex-col items-end justify-end p-4">
                <FaDesktop className="size-6 fill-white" />
                <h1 className=" text-end text-3xl font-extrabold uppercase text-gradient-highlight">
                  <EncryptedText iterations={20} text={"Operating"} />
                  <br />
                  <EncryptedText text="Systems" iterations={18} />
                </h1>

                <Paragraph className="text-end text-sm">
                  Through my career, I have worked with a variety of operating systems, including Linux, Windows, and
                  macOS.
                </Paragraph>
              </div>
              <div className="col-span-2 aspect-video size-full h-full min-h-[440px] ">
                <Suspense fallback={<h1>LOADING</h1>}>
                  <OperatingSystemCard />
                </Suspense>
              </div>
            </div>
          </section>

          <section aria-label="Databases" className="max-w-7xl mx-auto flex h-screen items-center">
            <div id="databases" className="grid grid-cols-3 max-md:grid-cols-1 appearable group">
              <div className="col-span-2 aspect-video size-full h-full min-h-[440px] ">
                <DatabasesCard />
              </div>
              <div className="row-span-2 flex size-full h-full flex-col items-start max-md:-order-1 p-4">
                <FaDatabase className="size-5 fill-white mt-auto" />
                <h1 className=" text-3xl font-bold text-gradient-highlight">
                  <EncryptedText text="Database" iterations={12} />
                </h1>

                <Paragraph className="text-start text-sm">
                  My first experience with data persistence came from using .yaml files as a quick solution for storing
                  simple data. Over time, I moved on to more robust databases like PostgreSQL and MongoDB for handling
                  more complex and scalable storage needs.
                </Paragraph>
              </div>
            </div>
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

          {/* <section aria-label="Skills" className="grid grid-cols-3 max-md:grid-cols-1">
        <div className="col-span-2 aspect-video size-full h-full min-h-[440px] ">
        <Card className="size-full flex-wrap border-none p-8">
        <div className="m-auto h-fit w-2/4 gap-8"></div>
        </Card>
        </div>
        <div className="row-span-2 flex size-full h-full flex-col p-4">
        <h1 className="mt-auto inline-flex items-center gap-2 text-3xl font-bold">
        <SlEnergy />
        Skills
        </h1>
        <Paragraph className="text-sm">
        Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem sit
        porro officiis sed dolor voluptate.
        </Paragraph>
        </div>
        </section> */}
        </div>
      </div>
    </main>
  )
}
