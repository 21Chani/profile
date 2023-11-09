import { viewCursorAtom } from "@src/App";
import { useAtomClampValue } from "@src/lib/jotai/clampAtom";
import {
	RiChatNewLine,
	RiDiscordFill,
	RiExternalLinkLine,
	RiGithubFill,
	RiLinkedinBoxFill,
	RiUser2Fill
} from "react-icons/ri";
import { SiWakatime } from "react-icons/si";
import { Button } from "../interface/Button";

export function IntroductionView() {
	const value = useAtomClampValue(viewCursorAtom);
	return (
		<main
			style={{ marginTop: `-${window.innerHeight * value}px` }}
			className="m-auto flex h-screen w-full max-w-5xl flex-col transition-all duration-500 ease-out "
		>
			<header className="sticky top-4 z-40 h-14 w-full rounded-xl bg-[#070F1C] transition"></header>
			<h3 className="mt-auto text-3xl font-semibold">Hi! I am chani.</h3>
			<h1 className="animation-delay-1000 bg-gradient-to-br from-light-blue to-amethyst bg-clip-text pb-1 text-5xl font-bold text-transparent">
				A passionate <br /> technology enthusiast.
			</h1>
			<p className="text-lg font-semibold text-light-blue">
				I’am self-taught full-stack developer from Brazil. Passionate about technology since 15. Eager to innovate and learn
				in the ever-changing tech world.
			</p>

			<div className="my-10 flex h-fit w-full items-center gap-6">
				<div className="h-0.5 flex-1 bg-[#1F3250]" />
				<RiUser2Fill className="text-[#5478B1]" />
				<span className="font-semibold text-[#5478B1]">Social</span>
				<div className="h-0.5 flex-1 bg-[#1F3250]" />
			</div>

			<div className="mb-auto flex items-center gap-4">
				<Button variant={"primary"} size={"sm"} className="w-fit">
					<RiChatNewLine className="h-4 w-4 " />
					Get in touch
				</Button>

				<Button variant={"secondary"} size={"sm"} className="w-fit">
					<RiLinkedinBoxFill className="h-4 w-4 " />
					Linkedin
					<RiExternalLinkLine />
				</Button>
				<Button variant={"secondary"} size={"sm"} className="w-fit">
					<RiGithubFill className="h-4 w-4 " />
					Github
					<RiExternalLinkLine />
				</Button>
				<Button variant={"secondary"} size={"sm"} className="w-fit">
					<RiDiscordFill className="h-4 w-4 " />
					<SiWakatime />
					Discord
					<RiExternalLinkLine />
				</Button>
				<Button variant={"secondary"} size={"sm"} className="w-fit">
					<SiWakatime className="h-4 w-4 " />
					Wakatime
					<RiExternalLinkLine />
				</Button>
			</div>
		</main>
	);
}
