import { SectionLabel } from "../../global/components/section-label";
import { TerminalCard } from "./terminal-card";

const terminalLines = [
	{ key: "alias", value: "Chani" },
	{ key: "location", value: "Brazil" },
	{ key: "exp", value: "5+ years" },
	{ key: "focus", value: "Web3 · Frontend" },
] as const;

export function AboutSection() {
	return (
		<div className="max-w-[480px]">
			<SectionLabel label="INIT SEQUENCE" className="mb-4" />

			<h1 className="font-display text-3xl text-terminal-white leading-[1.05] mb-1.5 relative max-[860px]:text-2xl">
				diogo
				<br />
				mendonça
				<span
					className="absolute top-0 left-0 w-full h-full text-terminal-white opacity-0 animate-glitch pointer-events-none [clip-path:inset(15%_0_65%_0)] [animation-delay:0.1s]"
					aria-hidden="true"
				>
					diogo
					<br />
					mendonça
				</span>
				<span
					className="absolute top-0 left-0 w-full h-full text-terminal-white opacity-0 animate-glitch pointer-events-none [clip-path:inset(65%_0_10%_0)] [animation-delay:0.25s]"
					aria-hidden="true"
				>
					diogo
					<br />
					mendonça
				</span>
			</h1>

			<div className="text-xs text-terminal-text-dim tracking-[6px] mb-8 font-light">
				SR. FRONTEND ENGINEER
			</div>

			<p className="text-terminal-text-dim text-[12.5px] leading-8 mb-9 [&>em]:text-terminal-text [&>em]:not-italic [&>em]:border-b [&>em]:border-dashed [&>em]:border-terminal-border-bright">
				Senior Frontend Engineer with <em>5+ years</em> of experience,
				specializing in <em>TypeScript</em> and <em>React</em>. Known for
				leveraging hyperfocus and a relentless drive to deliver{" "}
				<em>elegant, high-performance</em> solutions.
			</p>

			<TerminalCard title="~/about">
				{terminalLines.map(({ key, value }) => (
					<div key={key} className="flex py-[3px]">
						<span className="text-terminal-text-muted mr-2 select-none">▸</span>
						<span className="text-terminal-text-muted inline-block w-[100px]">
							{key}
						</span>
						<span className="text-terminal-text">{value}</span>
					</div>
				))}
			</TerminalCard>
		</div>
	);
}
