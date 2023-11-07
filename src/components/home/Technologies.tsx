import { StackButton } from "@interface/StackButton";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
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
	SiVisualstudiocode
} from "react-icons/si";
import { TbBrandCSharp, TbDeviceDesktopCode } from "react-icons/tb";

export function TechnologiesView() {
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="text-2xl font-bold">Synopsis & technologies</h1>

			<div className="flex h-fit w-[600px] flex-col flex-wrap overflow-hidden rounded-2xl border border-pastel-blue-300 bg-dark/50 shadow-2xl ">
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
				<div className="flex h-fit  w-full flex-col  gap-2 border-t border-pastel-blue-300 bg-pastel-blue-300/20 p-4 shadow-xl ">
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
			<div className="mt-4 flex h-fit w-[600px] flex-col overflow-hidden rounded-2xl border border-pastel-blue-300 bg-dark/50 shadow-2xl ">
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
	);
}
