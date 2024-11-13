import Image from "next/image"
import { ItemInfo } from "~/components/ui/ItemInfo"
import { Card } from "~/components/ui/card"
import { Paragraph } from "~/components/ui/paragraph"
import { NavLink } from "../_components/NavLink"

export function HomeSection() {
	return (
		<section className="gradient-bg relative flex w-full snap-start flex-col overflow-hidden  ">
			<div className="relative flex w-full flex-col">
				<nav className="flex flex-1 justify-between p-4">
					<h6 className="font-jaro  uppercase">- &emsp; A coding guy.</h6>

					<div className="flex flex-col">
						<NavLink>Home</NavLink>
						<NavLink>About me</NavLink>
						<NavLink>Projects</NavLink>
						<NavLink>Social</NavLink>
					</div>
				</nav>
			</div>

			<div className="mt-10 flex flex-1 items-center gap-14 px-20 font-jaro">
				{/* DESCRIPTION */}
				<Summary />
				<ProfileView />
			</div>
		</section>
	)
}

function Summary() {
	return (
		<div className=" flex items-start gap-2">
			{/* Details */}
			<div className="mt-2 flex flex-1 flex-col items-center gap-1">
				<div className="z-10 size-4 rounded border-2 border-orange-500" />
				<div className="z-10 size-4 rounded border-2 border-orange-400" />
				<div className="z-10 size-4 rounded border-2 border-orange-300" />
			</div>

			{/* Summary */}
			<div className="text-foreground ">
				{/* Title */}
				<span className="mx-auto uppercase ">
					<h1 className="text-7xl font-bold leading-[60px]">{"Hey there, I'm Chani!"}</h1>
					<h1 className="text-7xl font-bold leading-[60px]">
						A{" "}
						<span className="bg-gradient-to-br from-orange-100 to-orange-400 bg-clip-text text-transparent">
							full stack <br /> software
						</span>{" "}
						engineer
					</h1>
				</span>

				{/* Description */}
				<Paragraph className="mt-4 text-justify ">
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
		<div className="">
			<Card className=" h-[300px] w-[550px]">
				<div className=" relative h-[calc(100%+75px)] w-full">
					<Image
						className="z-40 mx-auto -mt-[79px] w-fit object-contain "
						alt="Picture of the author"
						src={"/assets/profile.png"}
						fill
					/>
				</div>

				{/* Plus Signes */}
				<span className="absolute right-4 top-2 font-jetbrains text-3xl text-orange-400">+</span>
				<span className="absolute right-7 top-1.5 font-jetbrains text-xl text-orange-400">+</span>
				<div className="absolute right-2 top-20 flex flex-col gap-2">
					<span className=" h-12 w-1 bg-white/15 font-jetbrains text-3xl"></span>
					<span className=" h-12 w-1 bg-white/15 font-jetbrains text-3xl"></span>
					<span className=" h-12 w-1 bg-white/15 font-jetbrains text-3xl"></span>
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
