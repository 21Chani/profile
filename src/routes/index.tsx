import { Card } from "@/modules/global/components/Card"
import { EncryptedText } from "@/modules/global/components/EncryptedText"
import { NavLink } from "@/modules/global/components/NavLink"
import { Paragraph } from "@/modules/global/components/Paragraph"
import { useIntersectionObserverState } from "@/modules/global/hooks/useIntersectionObserverState"
import { OperatingSystemCard } from "@/modules/stacks/components/OperatingSystemCard"
import { ProfileCard } from "@/modules/stacks/components/ProfileCard"
import { createFileRoute } from "@tanstack/react-router"
import { Suspense, useState } from "react"
import { FaDatabase, FaDesktop, FaTerminal } from "react-icons/fa"
import { SlEnergy } from "react-icons/sl"

export const Route = createFileRoute("/")({ component: App })

function App() {
  const [osSection, setOSSection] = useState<HTMLElement | null>(null)

  const osSectionIntersection = useIntersectionObserverState(osSection, { threshold: 0.7 })

  return (
    <div className=" bg-background max-w-7xl relative h-screen min-h-screen">
      <section className="gradient-bg relative flex min-h-screen w-full snap-start flex-col overflow-hidden  ">
        <div className="relative flex w-full flex-col">
          <nav className="flex flex-1 justify-between p-4 ">
            <h6 className="font-extrabold text-foreground uppercase">
              <EncryptedText text="- A coding guy." iterations={16} />
            </h6>

            <div className="flex flex-col">
              <NavLink>Home</NavLink>
              <NavLink>About me</NavLink>
              <NavLink>Projects</NavLink>
              <NavLink>Social</NavLink>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-1 items-center gap-14 px-2 font-jaro max-xl:flex-col lg:px-20">
          <Summary />
          <ProfileCard />
        </div>
      </section>

      <section ref={setOSSection} aria-label="Opearing Systems" className="grid grid-cols-3">
        <div className="flex size-full h-full flex-col items-end justify-end borde border-imary p-4">
          <FaDesktop />
          <h1 className=" text-end text-3xl font-extrabold uppercase text-gradient-highlight">
            <EncryptedText iterations={20} text={"Operating"} isVisible={osSectionIntersection.isVisible} />
            <br />
            <EncryptedText text="Systems" iterations={18} isVisible={osSectionIntersection.isVisible} />
          </h1>

          <Paragraph className="text-end text-sm">
            Through my career, I have worked with a variety of operating systems, including Linux, Windows, and macOS.
          </Paragraph>
        </div>
        <div className="col-span-2 aspect-video size-full h-full min-h-[440px] borde border-imary ">
          <Suspense fallback={<h1>LOADING</h1>}>
            <OperatingSystemCard intersection={osSectionIntersection} />
          </Suspense>
        </div>
      </section>

      <section aria-label="Programming Languages" className="grid grid-cols-3">
        <div className="col-span-2 aspect-video size-full h-full min-h-[440px] borde border-imary ">
          <Card className="size-full flex-wrap border-none p-8">
            <div className="m-auto h-fit w-2/4 gap-8"></div>
          </Card>
        </div>
        <div className="row-span-2 flex size-full h-full flex-col borde border-imary p-4">
          <h1 className="mt-auto text-3xl font-bold">
            <FaTerminal />
            Programming <br /> Languages
          </h1>
          <Paragraph className="text-sm">
            Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem sit
            porro officiis sed dolor voluptate.
          </Paragraph>
        </div>
      </section>

      <section aria-label="Database" className="grid grid-cols-3">
        <div className="row-span-2 flex size-full h-full flex-col items-end borde border-imary p-4">
          <h1 className="mt-auto inline-flex items-center gap-2 text-3xl font-bold">
            Database
            <FaDatabase />
          </h1>
          <Paragraph className="text-end text-sm">
            Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem sit
            porro officiis sed dolor voluptate.
          </Paragraph>
        </div>
        <div className="col-span-2 aspect-video size-full h-full min-h-[440px] borde border-imary ">
          <Card className="size-full flex-wrap border-none p-8">
            <div className="m-auto h-fit w-2/4 gap-8"></div>
          </Card>
        </div>
      </section>

      <section aria-label="Skills" className="grid grid-cols-3">
        <div className="col-span-2 aspect-video size-full h-full min-h-[440px] borde border-imary ">
          <Card className="size-full flex-wrap border-none p-8">
            <div className="m-auto h-fit w-2/4 gap-8"></div>
          </Card>
        </div>
        <div className="row-span-2 flex size-full h-full flex-col borde border-imary p-4">
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

function Summary() {
  return (
    <div className=" flex items-start gap-2 max-md:flex-col ">
      {/* Details */}
      <div className="mt-2 flex flex-1 flex-col items-center gap-1 max-md:flex-row">
        <div className="z-10 size-4 rounded border-2 border-gray-500" />
        <div className="z-10 size-4 rounded border-2 border-gray-400" />
        <div className="z-10 size-4 rounded border-2 border-gray-300" />
      </div>

      {/* Summary */}
      <div className="text-foreground ">
        {/* Title */}
        <span className="mx-auto uppercase ">
          <h1 className="text-xl font-bold md:text-4xl text-foreground-alt xl:text-5xl xl:leading-[42px]">
            <EncryptedText animate text="I'm Chani" iterations={12} />
          </h1>
          <h1 className="text-xl font-bold md:text-4xl text-foreground-alt xl:text-5xl xl:leading-[42px]">
            <EncryptedText animate text="A" iterations={1} />
            &nbsp;
            <EncryptedText animate className="text-gradient-highlight" text="full stack" iterations={12} />
            <br className="ma-xl:hidden" />
            <EncryptedText animate className="text-gradient-highlight" text="software" iterations={12} />
            &nbsp;
            <EncryptedText animate text="engineer" iterations={12} />
            {/* engineer */}
          </h1>
        </span>

        {/* Description */}
        <Paragraph className="mt-4 text-justify text-xs md:text-sm">
          My real name is Diogo, but you can call me Chani. I am a passionate technology enthusiast from Brazil who
          loves to learn new things and solve problems. I do know a lot of everything in this programming world, from
          hardware to software, but I have focused the past 3 years to dedicate into the web3 ecosystem, where I have
          been working with blockchain technologies, smart contracts, and decentralized applications.
        </Paragraph>
        <div className="mt-2 h-[1px] w-52 bg-white/20"></div>
      </div>
    </div>
  )
}
