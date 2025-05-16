import { Card } from "@/modules/global/components/Card"
import { ItemInfo } from "@/modules/global/components/ItemInfo"
import { NavLink } from "@/modules/global/components/NavLink"
import { Paragraph } from "@/modules/global/components/Paragraph"
import { OperatingSystemCard } from "@/modules/stacks/components/OperatingSystemCard"
import { createFileRoute } from "@tanstack/react-router"
import { Suspense } from "react"
import { FaDatabase, FaDesktop, FaTerminal, FaTools } from "react-icons/fa"
import { SlEnergy } from "react-icons/sl"
import { twMerge } from "tailwind-merge"

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <div className=" bg-background h-screen min-h-screen">
      <section className="gradient-bg relative flex min-h-screen w-full snap-start flex-col overflow-hidden  ">
        <div className="relative flex w-full flex-col">
          <nav className="flex flex-1 justify-between p-4 ">
            <h6 className="font-jaro  uppercase">- &emsp; A coding guy.</h6>

            <div className="flex flex-col">
              <NavLink>Home</NavLink>
              <NavLink>About me</NavLink>
              <NavLink>Projects</NavLink>
              <NavLink>Social</NavLink>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-1 items-center gap-14 px-2 font-jaro max-xl:flex-col lg:px-20">
          {/* DESCRIPTION */}
          <Summary />
          <ProfileView />
        </div>
      </section>
      <section className="relative mx-auto mt-24 flex w-full snap-start overflow-hidden">
        <div className="relative grid w-full grid-cols-[var(--grid-border)_repeat(3,minmax(0,_1fr))_var(--grid-border)] [--grid-border:10px] lg:[--grid-border:150px] xl:[--grid-border:250px]">
          {/* Opacity effect */}
          <div className="absolute bottom-0 left-0 h-full w-60 bg-gradient-to-r from-background to-background/0"></div>
          <div className="absolute bottom-0 right-0 h-full w-60 bg-gradient-to-l from-background to-background/0"></div>
          <div className="absolute top-0 h-60 w-full bg-gradient-to-b from-background to-background/0"></div>
          <div className="absolute bottom-0 h-60 w-full bg-gradient-to-t from-background to-background/0"></div>
          {/* Grid */}
          <FullRowSeparator className="aspect-video" />
          <FullRowSeparator className="h-14" />

          {/* Operating Systems Row */}
          <div className="size-full h-full border border-border-primary "></div>
          <div className="row-span-2 flex size-full h-full flex-col items-end justify-end border border-border-primary p-4">
            <FaDesktop />
            <h1 className=" text-end text-3xl font-bold">
              Operating <br /> Systems
            </h1>
            <Paragraph className="text-end text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="col-span-2 row-span-2 aspect-video size-full h-full min-h-[440px] border border-border-primary ">
            <Suspense fallback={<h1>LOADING</h1>}>
              <OperatingSystemCard />
            </Suspense>
          </div>
          <div className="size-full h-full border border-border-primary"></div>
          <div className="size-full h-full border border-border-primary"></div>

          <div className="size-full h-full border border-border-primary"></div>

          <FullRowSeparator className="h-14" />

          {/* Languages Row */}
          <div className="size-full h-full border border-border-primary "></div>
          <div className="col-span-2 row-span-2 aspect-video size-full h-full border border-border-primary ">
            <Card className="size-full flex-wrap border-none p-8">
              <div className="m-auto grid h-fit w-2/4 grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8"></div>
            </Card>
          </div>

          <div className="row-span-2 flex size-full h-full flex-col border border-border-primary p-4">
            <h1 className="mt-auto text-3xl font-bold">
              <FaTerminal />
              Programming <br /> Languages
            </h1>
            <Paragraph className="text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="size-full h-full border border-border-primary"></div>
          <div className="size-full h-full border border-border-primary"></div>

          <div className="size-full h-full border border-border-primary"></div>
          <FullRowSeparator className="h-14" />

          {/* Database Row */}
          <div className="size-full h-full border border-border-primary "></div>
          <div className="row-span-2 flex size-full h-full flex-col items-end border border-border-primary p-4">
            <h1 className="mt-auto inline-flex items-center gap-2 text-3xl font-bold">
              Database
              <FaDatabase />
            </h1>
            <Paragraph className="text-end text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="col-span-2 row-span-2 aspect-video size-full h-full border border-border-primary ">
            <Card className="size-full flex-wrap border-none p-8">
              <div className="m-auto grid h-fit w-2/4 grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8"></div>
            </Card>
          </div>
          <div className="size-full h-full border border-border-primary"></div>
          <div className="size-full h-full border border-border-primary"></div>

          <div className="size-full h-full border border-border-primary"></div>
          <FullRowSeparator className="h-14" />

          {/* Skills Row */}
          <div className="size-full h-full border border-border-primary "></div>
          <div className="col-span-2 row-span-2 aspect-video size-full h-full border border-border-primary ">
            <Card className="size-full flex-wrap border-none p-8">
              <div className="m-auto grid h-fit w-2/4 grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8"></div>
            </Card>
          </div>

          <div className="row-span-2 flex size-full h-full flex-col border border-border-primary p-4">
            <h1 className="mt-auto inline-flex items-center gap-2 text-3xl font-bold">
              <SlEnergy />
              Skills
            </h1>
            <Paragraph className="text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="size-full h-full border border-border-primary"></div>
          <div className="size-full h-full border border-border-primary"></div>

          <div className="size-full h-full border border-border-primary"></div>

          <div className="size-full border border-border-primary"></div>
          <div className=" row-span-2 flex size-full flex-col items-end border border-border-primary ">
            <h1 className="inline-flex items-center gap-2 p-4 text-3xl font-bold">
              <FaTools className="" />
              Tools
            </h1>
            <Paragraph className="text-end text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="col-span-2 row-span-2 aspect-video size-full border border-border-primary before:content-empty">
            <Card className="size-full flex-wrap border-none p-8">
              <div className="m-auto grid h-fit w-2/4 grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8"></div>
            </Card>
          </div>

          <div className="size-full border border-border-primary"></div>
          <div className="size-full border border-border-primary"></div>
          <div className="size-full border border-border-primary"></div>
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
        <div className="z-10 size-4 rounded border-2 border-orange-500" />
        <div className="z-10 size-4 rounded border-2 border-orange-400" />
        <div className="z-10 size-4 rounded border-2 border-orange-300" />
      </div>

      {/* Summary */}
      <div className="text-foreground ">
        {/* Title */}
        <span className="mx-auto uppercase ">
          <h1 className="text-xl font-bold md:text-4xl  xl:text-5xl xl:leading-[42px]">{"Hey there, I'm Chani!"}</h1>
          <h1 className="text-xl font-bold md:text-4xl  xl:text-5xl xl:leading-[42px]">
            A{" "}
            <span className="bg-gradient-to-br from-orange-100 to-orange-400 bg-clip-text text-transparent">
              full stack <br className="max-xl:hidden" /> software
            </span>{" "}
            engineer
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

function ProfileView() {
  return (
    <div className="max-md:w-full">
      <Card className=" aspect-video w-[550px] justify-center  max-md:w-full ">
        <img
          className=" mx-auto absolute bottom-0 w-[90%] object-contain "
          alt="Picture of the author"
          src={"/assets/profile.png"}
        />

        {/* Plus Signes */}
        <span className="absolute right-4 top-2 font-jetbrains text-3xl text-orange-400">+</span>
        <span className="absolute right-7 top-1.5 font-jetbrains text-xl text-orange-400">+</span>
        <div className="absolute right-2 top-20 flex flex-col gap-2">
          <span className=" h-12 w-1 bg-gradient-to-b to-orange-400 from-orange-900 font-jetbrains text-3xl"></span>
          <span className=" h-12 w-1 bg-gradient-to-b to-orange-200 from-orange-400 font-jetbrains text-3xl"></span>
          <span className=" h-12 w-1 bg-gradient-to-b to-orange-200 from-orange-400 font-jetbrains text-3xl"></span>
        </div>
        <div className="absolute left-2 top-8 flex flex-col gap-1 ">
          <ItemInfo>
            <span>AKA CHANI</span>
          </ItemInfo>
          <ItemInfo>
            <span>20 YEARS</span>
          </ItemInfo>
          <ItemInfo>
            <span>LOADING...</span>
          </ItemInfo>
        </div>
      </Card>

      {/* Bottom Details  */}
      {/* <div className=" mr-8 mt-1 flex w-full gap-1 px-10">
        <div className="flex flex-1 flex-col gap-1 ">
          <div className="mr-auto h-1 w-3/4  bg-gradient-to-br from-gray-100  to-gray-600 to-40%"></div>
        </div>
      </div> */}
    </div>
  )
}
function FullRowSeparator({ rows = 5, className }: { className?: string; rows?: number }) {
  return new Array(rows)
    .fill(0)
    .map((_, i) => <div className={twMerge("size-full h-full border border-border-primary", className)} key={i} />)
}
