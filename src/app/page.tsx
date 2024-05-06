import Image from "next/image"
import { RiArrowDownSLine } from "react-icons/ri"

export default async function Home() {
	return (
		<main className="">
			<section className="gradient-bg relative flex h-screen w-full flex-col overflow-hidden pb-32 ">
				<h6 className="font-jaro  uppercase">- &emsp; A coding guy.</h6>
				<div className="flex flex-1 "></div>
				<hr className="mb-20 border-border-primary" />

				<div className="flex items-end  gap-14 px-20 font-jaro">
					{/* DESCRIPTION */}

					<div className=" flex items-start gap-2">
						<div className="mt-2 flex flex-1 flex-col items-center gap-1">
							<div className="bevel-2 z-10 size-4 bevel-color-foreground bevel-offset-[3px]" />
							<div className="bevel-2 z-10 size-4 bevel-color-foreground bevel-offset-[3px]" />
							<div className="bevel-2 z-10 size-4 bevel-color-foreground bevel-offset-[3px]" />
							{/* <div className="-mt-0.5 h-60 w-2 bg-gradient-to-b from-emerald-500  via-emerald-300 to-black "></div> */}
						</div>
						<div className="text-foreground ">
							<span className="mx-auto uppercase ">
								<h1 className="text-7xl font-bold leading-[60px]">{"Hey there, I'm Chani!"}</h1>
								<h1 className="text-7xl font-bold leading-[60px]">
									A{" "}
									<span className="bg-gradient-to-br from-emerald-100 to-emerald-400 bg-clip-text text-transparent">
										full stack <br /> software
									</span>{" "}
									engineer
								</h1>
							</span>
							<p className="mt-4 text-justify font-jetbrains text-foreground-alt">
								My real name is Diogo, but you can call me Chani. I am a passionate technology enthusiast from Brazil
								who loves to learn new things and solve problems. I do know a lot of everything in this programming
								world, from hardware to software, but I have focused the past 3 years to dedicate into the web3
								ecosystem, where I have been working with blockchain technologies, smart contracts, and decentralized
								applications.
							</p>
						</div>
					</div>

					<div className="">
						<div className="bevel-4 relative  z-10 h-[300px] w-[550px] rounded-xl bevel-offset-6 bevel-gradient-to-br bevel-to-emerald-500 bevel-from-emerald-100">
							<div className="relative h-[calc(100%+75px)] w-full ">
								<Image
									className="z-40 mx-auto -mt-[79px] w-fit object-contain   "
									alt="Picture of the author"
									src={"/assets/profile.png"}
									fill
								/>
							</div>
							<span className="absolute right-4 top-2 font-jetbrains text-3xl text-emerald-200">+</span>
							<span className="absolute right-7 top-1.5 font-jetbrains text-xl text-emerald-200">+</span>
						</div>
						<div className=" mr-8 mt-1 flex w-full gap-1 px-10">
							<div className="flex flex-1 flex-col gap-1 ">
								<div className="mr-auto h-1 w-3/4  bg-gradient-to-br from-emerald-100  to-emerald-500 to-40%"></div>
								<div className="ml-5 mr-auto h-1 w-2/4  bg-gradient-to-br from-emerald-100  to-emerald-500 to-40%"></div>
							</div>
							<div className="bevel-2 z-10 h-5 w-10 bevel-color-emerald-500 bevel-offset-[5px]" />
							<div className="bevel-2 z-10 h-5 w-10 bevel-color-emerald-500 bevel-offset-[5px]" />
							<div className="bevel-2 z-10 h-5 w-10 bevel-color-emerald-500 bevel-offset-[5px]" />
						</div>
					</div>
				</div>

				<div className="absolute bottom-0 flex w-full flex-col items-center justify-center ">
					<RiArrowDownSLine className="size-14 animate-fade-down [animation-delay:100ms]" />
					<RiArrowDownSLine className="-mt-10 size-14 animate-fade-down" />
				</div>
			</section>
			<section className="h-screen w-full" />
			<section className="h-screen w-full" />
			<section className="h-screen w-full" />
		</main>
	)
}
