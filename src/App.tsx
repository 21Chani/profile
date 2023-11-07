import { AiOutlineAppstoreAdd } from "react-icons/ai";
import {
	RiChatNewLine,
	RiDiscordFill,
	RiExternalLinkLine,
	RiGithubFill,
	RiLinkedinBoxFill,
	RiUser2Fill
} from "react-icons/ri";
import {
	SiAdobepremierepro,
	SiAlacritty,
	SiBlender,
	SiCplusplus,
	SiCss3,
	SiFigma,
	SiFirebase,
	SiGnubash,
	SiGo,
	SiHcl,
	SiHtml5,
	SiInsomnia,
	SiIntellijidea,
	SiJavascript,
	SiMongodb,
	SiMysql,
	SiPostgresql,
	SiPostman,
	SiPowershell,
	SiPython,
	SiRedis,
	SiSolidity,
	SiTmux,
	SiTypescript,
	SiUnity,
	SiVisualstudio,
	SiVisualstudiocode,
	SiWakatime
} from "react-icons/si";
import { TbBrandCSharp, TbDeviceDesktopCode } from "react-icons/tb";
import { Button } from "./components/interface/Button";
import { StackButton } from "./components/interface/StackButton";
import { useClamp } from "./hook/useClamp";

function App() {
	const currentCursor = useClamp(0, 1);

	return (
		<div className="relative mx-auto max-h-screen w-full overflow-hidden bg-[#0A0C2080]">
			<div className="absolute -left-[48px] -top-[77px] h-80 w-80 rounded bg-[#30B4FF]" />
			<div className="absolute right-0  h-96 w-96 rounded bg-[#00A3FF]" />
			<div className="absolute bottom-0 left-[592px] top-2/4 h-72 w-3/4 rotate-[-25deg] rounded bg-[#3FA4ED]" />

			<div
				onWheel={(e) => {
					if (e.deltaY > 0) currentCursor.next();
					else currentCursor.prev();
				}}
				className="z-40 h-screen w-full overflow-hidden bg-[#0A0C20cc] backdrop-blur-[408px]"
			>
				<main
					style={{ marginTop: `-${window.innerHeight * currentCursor.value}px` }}
					className="m-auto flex h-screen w-full max-w-5xl flex-col transition-all duration-500 ease-out "
				>
					<header className="sticky top-4 z-40 h-14 w-full rounded-xl bg-[#070F1C] transition"></header>
					<h3 className="mt-auto text-3xl font-semibold">Hi! I am chani.</h3>
					<h1 className="bg-gradient-to-br from-light-blue to-amethyst bg-clip-text pb-1 text-5xl font-bold text-transparent">
						A passionate <br /> technology enthusiast.
					</h1>
					<p className="text-lg font-semibold text-light-blue">
						I’am self-taught full-stack developer from Brazil. Passionate about technology since 15. Eager to innovate and
						learn in the ever-changing tech world.
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

				<div className="h-0.5 w-full bg-pastel-blue-300"></div>
				<div className="flex h-screen flex-col items-center justify-center">
					<h1 className="text-2xl font-bold">Synopsis & technologies</h1>

					<div className=" flex h-fit w-[600px] flex-col flex-wrap overflow-hidden rounded-2xl border border-pastel-blue-300 bg-dark/50 ">
						<div className="shadow-inner-glass flex flex-col gap-2 p-5">
							<div className="w-fit rounded-xl bg-pastel-blue-300/60  p-2 shadow-up-sm">
								<TbDeviceDesktopCode className="h-7 w-7" />
							</div>

							<div className="flex items-center gap-2 text-white">
								<span className="font-bold">Technologies</span>
							</div>
							<p className="text-sm font-medium text-light-blue/60">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc suscipit, orci sed mattis tristique, libero dolor
								accumsan metus, non auctor metus urna id mauris. Duis lorem dui, congue ac lorem sed, dictum aliquam magna.
							</p>
						</div>
						<div className="flex h-fit w-full  flex-col gap-2 border-t border-pastel-blue-300 bg-pastel-blue-300/20 p-4 ">
							{/* <span className="text-xs font-bold text-light-blue/70">Languages</span> */}
							<div className="flex w-full flex-wrap gap-2 ">
								<StackButton icon={SiJavascript}>Javascript</StackButton>
								<StackButton icon={SiTypescript}>Typescript</StackButton>
								<StackButton icon={SiGo}>Golang</StackButton>
								<StackButton icon={TbBrandCSharp}>CSharp</StackButton>
								<StackButton icon={SiHtml5}>HTML5</StackButton>
								<StackButton icon={SiCss3}>Css3</StackButton>
								<StackButton icon={SiCplusplus}>C++</StackButton>
								<StackButton icon={SiSolidity}>Solidity</StackButton>
								<StackButton icon={SiHcl}>HCL</StackButton>
								<StackButton icon={SiPython}>Python</StackButton>
								<StackButton icon={SiGnubash}>Bash</StackButton>
								<StackButton icon={SiPowershell}>Powershell</StackButton>
							</div>
							<div className="my-1 h-[1px] w-full bg-pastel-blue-300"></div>
							<div className="flex w-full flex-wrap gap-2 ">
								<StackButton icon={SiMongodb}>MongoDb</StackButton>
								<StackButton icon={SiMysql}>MySql</StackButton>
								<StackButton icon={SiPostgresql}>Postgresql</StackButton>
								<StackButton icon={SiFirebase}>Firebase</StackButton>
								<StackButton icon={SiRedis}>Redis</StackButton>
							</div>
						</div>
					</div>
					<div className="mt-4 flex h-fit w-[600px] flex-col overflow-hidden rounded-2xl border border-pastel-blue-300 bg-dark/50 ">
						<div className="shadow-inner-glass flex flex-col gap-2 p-5">
							<div className="w-fit rounded-xl bg-pastel-blue-300/60  p-2 shadow-up-sm">
								<AiOutlineAppstoreAdd className="h-7 w-7" />
							</div>

							<div className="flex items-center gap-2 text-white">
								<span className="font-bold">Software and apps</span>
							</div>
							<p className="text-sm font-medium text-light-blue/60">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc suscipit, orci sed mattis tristique, libero dolor
								accumsan metus, non auctor metus urna id mauris. Duis lorem dui, congue ac lorem sed, dictum aliquam magna.
							</p>
						</div>
						<div className="flex h-fit w-full  flex-wrap gap-2 border-t border-pastel-blue-300 bg-pastel-blue-300/20 p-4 ">
							<StackButton icon={SiAdobepremierepro}>Premiere pro</StackButton>
							<StackButton icon={SiBlender}>Blender</StackButton>
							<StackButton icon={SiVisualstudiocode}>VsCode</StackButton>
							<StackButton icon={SiVisualstudio}>Visual Studio</StackButton>
							<StackButton icon={SiIntellijidea}>Itenllij Idea</StackButton>
							<StackButton icon={SiTmux}>Tmux</StackButton>
							<StackButton icon={SiAlacritty}>Alacritty</StackButton>
							<StackButton icon={SiUnity}>Unity</StackButton>
							<StackButton icon={SiFigma}>Figma</StackButton>
							<StackButton icon={SiInsomnia}>Insomnia</StackButton>
							<StackButton icon={SiPostman}>Postman</StackButton>
						</div>
					</div>
				</div>
			</div>
			<div className="fixed right-6 top-2/4 z-40 flex flex-col items-end gap-1">
				<button className="flex items-center gap-2 hover:underline">
					<span className="text-sm text-light-blue">About me</span>
					<div className="h-3 w-3 rounded-full border-2 border-light-blue bg-light-blue "></div>
				</button>
				<button className="flex items-center gap-2 hover:underline">
					<span className="text-sm text-light-blue/50">Technologies</span>
					<div className="h-3 w-3 rounded-full border-2 border-light-blue/50 "></div>
				</button>
				<button className="flex items-center gap-2 hover:underline">
					<span className="text-sm text-light-blue/50">About me</span>
					<div className="h-3 w-3 rounded-full border-2 border-light-blue/50 "></div>
				</button>
			</div>
		</div>
	);
}

export default App;
