import { ASCIIBackground } from "@/modules/global/components/ASCIIBackground"
import { Card } from "@/modules/global/components/Card"
import { EncryptedText } from "@/modules/global/components/EncryptedText"
import { Navbar } from "@/modules/global/components/Navbar"
import { Paragraph } from "@/modules/global/components/Paragraph"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { DatabasesCard } from "@/modules/stacks/components/DatabasesCard"
import { OperatingSystemCard } from "@/modules/stacks/components/OperatingSystemCard"
import { ProfileCard } from "@/modules/stacks/components/ProfileCard"
import { ProgrammingLangsCard } from "@/modules/stacks/components/ProgrammingLangsCard"
import { Summary } from "@/modules/stacks/components/Summary"
import { TerminalEvents } from "@/modules/terminal/events"
import { createFileRoute } from "@tanstack/react-router"
import { Suspense, useEffect, useState } from "react"
import { FaDatabase, FaDesktop, FaTerminal } from "react-icons/fa"
import { SlEnergy } from "react-icons/sl"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const [osSection, setOSSection] = useState<HTMLElement | null>(null)
  const osSectionIntersection = useIntersectionObserverState(osSection, { threshold: 0.7 })

  useEffect(() => {
    TerminalEvents.emit("execute", "wget https://chani.sh")
  }, [])

  return (
    <div id="container" className="max-w-7xl h-screen min-h-screen">
      <ASCIIBackground />
      {/* <Terminal /> */}
      <Navbar />

      <section className="gradient-bg relative flex min-h-screen w-full snap-start flex-col overflow-hidden  ">
        <div className="mt-10 flex flex-1 items-center gap-14 px-2 font-jaro max-xl:flex-col lg:px-20">
          <Summary />
          <ProfileCard />
        </div>
      </section>

      <section aria-label="Programming Languages" className=" h-screen  flex items-center">
        <div className="grid grid-cols-3 max-md:grid-cols-1">
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
              I began my programming journey at 15 by teaching myself Java to create Minecraft plugins and mods. That
              early curiosity sparked a deep passion for software development, leading me to explore a wide range of
              languages over the years — including C, C++, C#, JavaScript, TypeScript, Python, Go, and more.
            </Paragraph>
          </div>
        </div>
      </section>

      <section ref={setOSSection} aria-label="Opearing Systems" className=" h-screen  flex items-center">
        <div className="grid grid-cols-3 max-md:grid-cols-1">
          <div className="flex size-full h-full flex-col items-end justify-end p-4">
            <FaDesktop className="size-6 fill-white" />
            <h1 className=" text-end text-3xl font-extrabold uppercase text-gradient-highlight">
              <EncryptedText iterations={20} text={"Operating"} isVisible={osSectionIntersection.isVisible} />
              <br />
              <EncryptedText text="Systems" iterations={18} isVisible={osSectionIntersection.isVisible} />
            </h1>

            <Paragraph className="text-end text-sm">
              Through my career, I have worked with a variety of operating systems, including Linux, Windows, and macOS.
            </Paragraph>
          </div>
          <div className="col-span-2 aspect-video size-full h-full min-h-[440px] ">
            <Suspense fallback={<h1>LOADING</h1>}>
              <OperatingSystemCard intersection={osSectionIntersection} />
            </Suspense>
          </div>
        </div>
      </section>

      <section aria-label="Database" className="grid grid-cols-3 max-md:grid-cols-1">
        <div className="row-span-2 flex size-full h-full flex-col items-end p-4">
          <FaDatabase className="size-5 fill-white mt-auto" />
          <h1 className=" text-3xl font-bold text-gradient-highlight">
            <EncryptedText text="Database" iterations={12} />
          </h1>

          <Paragraph className="text-end text-sm">
            My first experience with data persistence came from using .yaml files as a quick solution for storing simple
            data. Over time, I moved on to more robust databases like PostgreSQL and MongoDB for handling more complex
            and scalable storage needs.
          </Paragraph>
        </div>
        <div className="col-span-2 aspect-video size-full h-full min-h-[440px] ">
          <DatabasesCard />
        </div>
      </section>

      <section aria-label="Skills" className="grid grid-cols-3 max-md:grid-cols-1">
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
      </section>
    </div>
  )
}
