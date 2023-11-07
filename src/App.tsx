import {
	RiDiscFill,
	RiExternalLinkLine,
	RiGithubFill,
	RiLinkedinBoxFill,
	RiMessage2Line,
	RiUser2Fill
} from "react-icons/ri";
import { Button } from "./components/interface/Button";
function App() {
	return (
		<div className="relative mx-auto flex  h-screen w-full flex-col overflow-hidden bg-[#0A0C2080]">
			<div className="absolute -left-[48px] -top-[77px] h-80 w-80 rounded bg-[#30B4FF]" />
			<div className="absolute right-0  h-96 w-96 rounded bg-[#00A3FF]" />
			<div className="absolute bottom-0 left-[592px] top-2/4 h-72 w-3/4 rotate-[-25deg] rounded bg-[#3FA4ED]" />
			<div className="absolute flex h-full w-full flex-col bg-[#0A0C20cc] backdrop-blur-[408px]">
				<main className="mx-auto w-full max-w-5xl ">
					<header className="mt-4 h-14 w-full rounded-xl bg-[#05060B60]"></header>

					<h3 className="mt-40 text-2xl font-semibold">Hi! I am chani.</h3>
					<h1 className="text-gradi bg-gradient-to-br from-[#9FCBFE] to-[#8728FF] bg-clip-text text-4xl font-bold text-transparent">
						A passionate technology <br /> enthusiast.
					</h1>
					<p className="text-lg font-semibold text-[#9FCBFE]">
						I’am self-taught full-stack developer from Brazil. Passionate about technology since 15. Eager to innovate and
						learn in the ever-changing tech world.
					</p>

					<div className="my-10 flex h-fit w-full items-center gap-6">
						<div className="h-1 flex-1 bg-[#1F3250]" />
						<RiUser2Fill className="text-[#5478B1]" />
						<span className="font-semibold text-[#5478B1]">Social</span>
						<div className="h-1 flex-1 bg-[#1F3250]" />
					</div>

					<div className="flex items-center gap-4">
						<Button variant={"primary"} size={"sm"} className="w-fit">
							<RiMessage2Line className="h-6 w-6 " />
							Get in touch
						</Button>
						<Button variant={"secondary"} size={"sm"} className="w-fit">
							<RiLinkedinBoxFill className="h-6 w-6 " />
							Linkedin
							<RiExternalLinkLine />
						</Button>
						<Button variant={"secondary"} size={"sm"} className="w-fit">
							<RiGithubFill className="h-6 w-6 " />
							Github
							<RiExternalLinkLine />
						</Button>
						<Button variant={"secondary"} size={"sm"} className="w-fit">
							<RiDiscFill className="h-6 w-6 " />
							Discord
							<RiExternalLinkLine />
						</Button>
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
