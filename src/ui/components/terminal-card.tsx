import type { ReactNode } from "react";

export function TerminalCard({
	title,
	children,
	className = "",
}: {
	title: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`border border-terminal-border bg-terminal-bg-elevated/60 text-sm ${className}`}
		>
			<div className="flex items-center gap-2 px-3.5 py-2 border-b border-terminal-border bg-terminal-bg-panel/80">
				<div className="size-[7px] rounded-full border border-terminal-border-mid" />
				<div className="size-[7px] rounded-full border border-terminal-border-mid" />
				<div className="size-[7px] rounded-full border border-terminal-border-mid" />
				<span className="text-xxs tracking-[2px] text-terminal-text-muted ml-1.5">
					{title}
				</span>
			</div>
			<div className="px-[18px] py-4">{children}</div>
		</div>
	);
}
