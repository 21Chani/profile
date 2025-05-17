import { Card } from "@/modules/global/components/Card"
import { EncryptedText } from "@/modules/global/components/EncryptedText"
import { ItemInfo } from "@/modules/global/components/ItemInfo"
import { NavLink } from "@/modules/global/components/NavLink"
import { Paragraph } from "@/modules/global/components/Paragraph"
import { OperatingSystemCard } from "@/modules/stacks/components/OperatingSystemCard"
import { createFileRoute } from "@tanstack/react-router"
import { Suspense, useRef } from "react"
import { FaDatabase, FaDesktop, FaTerminal, FaTools } from "react-icons/fa"
import { SlEnergy } from "react-icons/sl"
import { twMerge } from "tailwind-merge"
import { MeshStandardMaterial } from "three"

const material = new MeshStandardMaterial({
  color: "#fff",
  // emissive: "#fff",
  // roughness: 0.5,
  // metalness: 0.5,
})
export const Route = createFileRoute("/")({ component: App })

function App() {
  const ref = useRef<HTMLHeadingElement>(null)

  return (
    <div className=" bg-background h-screen min-h-screen">
      {/* <div className="absolute w-full h-full z-[40] p-10  flex  ">
        <Canvas>
          <OrbitControls />
          <pointLight position={[10, -10, -10]} intensity={20} /> 
          <mesh material={material}>
            <sphereGeometry />
          </mesh>
        </Canvas> 
      </div> */}

      {/* oi */}
      <section className="gradient-bg relative flex min-h-screen w-full snap-start flex-col overflow-hidden  ">
        <div className="relative flex w-full flex-col">
          <nav className="flex flex-1 justify-between p-4 ">
            <h6 className="font-jaro text-foreground uppercase">- &emsp; A coding guy.</h6>

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
          <div className="size-full h-full borde border-imary "></div>
          <div className="row-span-2 flex size-full h-full flex-col items-end justify-end borde border-imary p-4">
            <FaDesktop />
            <h1 className=" text-end text-3xl font-extrabold uppercase text-gradient-highlight">
              Operating <br /> Systems
            </h1>
            <Paragraph className="text-end text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="col-span-2 row-span-2 aspect-video size-full h-full min-h-[440px] borde border-imary ">
            <Suspense fallback={<h1>LOADING</h1>}>
              <OperatingSystemCard />
            </Suspense>
          </div>
          <div className="size-full h-full borde border-imary"></div>
          <div className="size-full h-full borde border-imary"></div>

          <div className="size-full h-full borde border-imary"></div>

          <FullRowSeparator className="h-14" />

          {/* Languages Row */}
          <div className="size-full h-full borde border-imary "></div>
          <div className="col-span-2 row-span-2 aspect-video size-full h-full borde border-imary ">
            <Card className="size-full flex-wrap border-none p-8">
              <div className="m-auto grid h-fit w-2/4 grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8"></div>
            </Card>
          </div>

          <div className="row-span-2 flex size-full h-full flex-col borde border-imary p-4">
            <h1 className="mt-auto text-3xl font-bold">
              <FaTerminal />
              Programming <br /> Languages
            </h1>
            <Paragraph className="text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="size-full h-full borde border-imary"></div>
          <div className="size-full h-full borde border-imary"></div>

          <div className="size-full h-full borde border-imary"></div>
          <FullRowSeparator className="h-14" />

          {/* Database Row */}
          <div className="size-full h-full borde border-imary "></div>
          <div className="row-span-2 flex size-full h-full flex-col items-end borde border-imary p-4">
            <h1 className="mt-auto inline-flex items-center gap-2 text-3xl font-bold">
              Database
              <FaDatabase />
            </h1>
            <Paragraph className="text-end text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="col-span-2 row-span-2 aspect-video size-full h-full borde border-imary ">
            <Card className="size-full flex-wrap border-none p-8">
              <div className="m-auto grid h-fit w-2/4 grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8"></div>
            </Card>
          </div>
          <div className="size-full h-full borde border-imary"></div>
          <div className="size-full h-full borde border-imary"></div>

          <div className="size-full h-full borde border-imary"></div>
          <FullRowSeparator className="h-14" />

          {/* Skills Row */}
          <div className="size-full h-full borde border-imary "></div>
          <div className="col-span-2 row-span-2 aspect-video size-full h-full borde border-imary ">
            <Card className="size-full flex-wrap border-none p-8">
              <div className="m-auto grid h-fit w-2/4 grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8"></div>
            </Card>
          </div>

          <div className="row-span-2 flex size-full h-full flex-col borde border-imary p-4">
            <h1 className="mt-auto inline-flex items-center gap-2 text-3xl font-bold">
              <SlEnergy />
              Skills
            </h1>
            <Paragraph className="text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="size-full h-full borde border-imary"></div>
          <div className="size-full h-full borde border-imary"></div>

          <div className="size-full h-full borde border-imary"></div>

          <div className="size-full borde border-imary"></div>
          <div className=" row-span-2 flex size-full flex-col items-end borde border-imary ">
            <h1 className="inline-flex items-center gap-2 p-4 text-3xl font-bold">
              <FaTools className="" />
              Tools
            </h1>
            <Paragraph className="text-end text-sm">
              Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem
              sit porro officiis sed dolor voluptate.
            </Paragraph>
          </div>
          <div className="col-span-2 row-span-2 aspect-video size-full borde border-imary before:content-empty">
            <Card className="size-full flex-wrap border-none p-8">
              <div className="m-auto grid h-fit w-2/4 grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8"></div>
            </Card>
          </div>

          <div className="size-full borde border-imary"></div>
          <div className="size-full borde border-imary"></div>
          <div className="size-full borde border-imary"></div>
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
function ProfileView() {
  return (
    <div className="max-md:w-full">
      <Card className=" bg-gradient-to-br from-background-alt/20 from-30% border border-border-primary to-black aspect-video w-[550px] justify-center rounded-none shadow-[6px_6px_0px_0px_#666] max-md:w-full  ">
        <img
          className=" mx-auto absolute bottom-0 w-[90%] object-contain "
          alt="Picture of the author"
          src={"/assets/profile.png"}
        />

        {/* Plus Signes */}
        <span className="absolute right-4 top-2 font-jetbrains text-3xl text-gray-400">+</span>
        <span className="absolute right-7 top-1.5 font-jetbrains text-xl text-gray-400">+</span>
        <div className="absolute right-2 top-20 flex flex-col gap-2">
          <span className=" h-12 w-1 bg-gradient-to-b to-gray-400 from-gray-900 font-jetbrains text-3xl"></span>
          <span className=" h-12 w-1 bg-gradient-to-b to-gray-200 from-gray-400 font-jetbrains text-3xl"></span>
          <span className=" h-12 w-1 bg-gradient-to-b to-gray-200 from-gray-400 font-jetbrains text-3xl"></span>
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
    .map((_, i) => <div className={twMerge("size-full h-full borde border-imary", className)} key={i} />)
}

function CodeBlocks() {
  return (
    <>
      <div className=" flex flex-col gap-2">
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-96 h-2 bg-gray-400 rounded-full"></div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>{" "}
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-96 h-2 bg-gray-400 rounded-full"></div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-96 h-2 bg-gray-400 rounded-full"></div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>{" "}
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>{" "}
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>{" "}
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-96 h-2 bg-gray-400 rounded-full"></div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>{" "}
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>{" "}
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>{" "}
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-96 h-2 bg-gray-400 rounded-full"></div>
      </div>
      <div className=" flex flex-col gap-2">
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>{" "}
        <div className="w-72 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-20 h-2 bg-gray-400 rounded-full"></div>
        <div className="w-62 h-2 bg-gray-400 rounded-full"></div>
      </div>
    </>
  )
}
