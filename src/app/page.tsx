import Image from "next/image";
import { RiArrowDownSLine } from "react-icons/ri";

// --tw-bevel-gradient-stops
// --tw-bevel-gradient-stops

// --tw-bevel-gradient-from: #d1fae5 var(--tw-bevel-gradient-from-position);
// --tw-bevel-gradient-to: rgb(209 250 229 / 0) var(--tw-bevel-gradient-to-position);
// --tw-bevel-gradient-stops: var(--tw-bevel-gradient-from), var(--tw-bevel-gradient-to)
// --tw-bevel-gradient-to: #10b981 var(--tw-bevel-gradient-to-position)

//  --bevel-gradient-image
// var(--bevel-gradient-image, none)

export default async function Home() {
  return (
    <main className="">
      <section className="relative flex h-screen w-full flex-col overflow-hidden pb-32 ">
        <h6 className="font-jaro  uppercase">- &emsp; A coding guy.</h6>
        <div className="flex flex-1 ">
          <div className="bevel-4 bevel-gradient-to-tr bevel-from-blue-100 bevel-to-blue-500 bevel-offset-14  m-auto size-52 " />
        </div>
        <hr className="border-border-primary mb-20" />

        <div className="font-jaro flex  items-end gap-14 px-20">
          {/* DESCRIPTION */}
          <div className="text-foreground ">
            <span className="mx-auto uppercase">
              <h1 className="text-7xl font-bold">{"Hey there, I'm Chani!"}</h1>
              <h1 className="text-7xl font-bold">
                A{" "}
                <span className="bg-gradient-to-br from-emerald-100 to-emerald-400 bg-clip-text text-transparent">
                  full stack <br /> software
                </span>{" "}
                engineer
              </h1>
            </span>
            <p className="text-foreground-alt font-jetbrains mt-4 text-justify">
              My real name is Diogo, but you can call me Chani. I am a
              passionate technology enthusiast from Brazil who loves to learn
              new things and solve problems. I do know a lot of everything in
              this programming world, from hardware to software, but I have
              focused the past 3 years to dedicate into the web3 ecosystem,
              where I have been working with blockchain technologies, smart
              contracts, and decentralized applications.
            </p>
            <p className="text-foreground-alt font-jetbrains mt-4 text-justify"></p>
          </div>

          <div className="">
            <div className="border-test relative h-[300px]  w-[550px] rounded-xl">
              <div className="relative h-[calc(100%+75px)] w-full ">
                <Image
                  className="z-40 mx-auto -mt-[79px] w-fit object-contain   "
                  alt="Picture of the author"
                  src={"/assets/profile.png"}
                  fill
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center ">
          <RiArrowDownSLine className="animate-fade-down size-14 [animation-delay:100ms]" />
          <RiArrowDownSLine className="animate-fade-down -mt-10 size-14" />
        </div>
      </section>
    </main>
  );
}
