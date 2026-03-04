import type { ReactNode } from "react";

interface HudCardProps {
	title: string;
	footerLabel: string;
	coordinates?: string;
	children?: ReactNode;
	className?: string;
}

export function HudCard({
	title,
	footerLabel,
	coordinates = "0.00 / 0.00",
	children,
	className,
}: HudCardProps) {
	return (
		<div
			className={`relative bg-terminal-bg-elevated border border-terminal-border-mid shadow-[0_0_0_1px_var(--color-terminal-border),inset_0_0_60px_rgba(0,0,0,0.8)] group ${className ?? ""}`}
		>
			{/* Corner brackets */}
			<div className="absolute -top-px -left-px w-6 h-6 border-t border-l border-terminal-border-bright z-10 transition-[border-color] duration-400 group-hover:border-[#555]" />
			<div className="absolute -top-px -right-px w-6 h-6 border-t border-r border-terminal-border-bright z-10 transition-[border-color] duration-400 group-hover:border-[#555]" />
			<div className="absolute -bottom-px -left-px w-6 h-6 border-b border-l border-terminal-border-bright z-10 transition-[border-color] duration-400 group-hover:border-[#555]" />
			<div className="absolute -bottom-px -right-px w-6 h-6 border-b border-r border-terminal-border-bright z-10 transition-[border-color] duration-400 group-hover:border-[#555]" />

			{/* Tick marks */}
			<div className="absolute -top-px left-1/2 -translate-x-1/2 w-5 h-px bg-terminal-border-mid z-10 transition-[background] duration-400 group-hover:bg-[#444]" />
			<div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-5 h-px bg-terminal-border-mid z-10 transition-[background] duration-400 group-hover:bg-[#444]" />
			<div className="absolute -left-px top-1/2 -translate-y-1/2 w-px h-5 bg-terminal-border-mid z-10 transition-[background] duration-400 group-hover:bg-[#444]" />
			<div className="absolute -right-px top-1/2 -translate-y-1/2 w-px h-5 bg-terminal-border-mid z-10 transition-[background] duration-400 group-hover:bg-[#444]" />

			{/* Header */}
			<div className="flex justify-between items-center px-4 py-2.5 bg-[rgba(15,15,15,0.9)] border-b border-terminal-border">
				<span className="text-xxs tracking-[3px] text-terminal-text-muted">
					{title}
				</span>
				<div className="flex gap-1.5 items-center">
					<div className="w-1 h-1 rounded-full bg-terminal-text-muted opacity-50" />
					<div className="w-1 h-1 rounded-full bg-terminal-text-muted opacity-50" />
					<div className="w-1 h-1 rounded-full bg-terminal-text-dim animate-dot-pulse" />
				</div>
			</div>

			{/* Viewport */}
			<div className="relative w-full aspect-3/4 overflow-hidden bg-[#080808]">
				{children}
				<div className="absolute top-0 left-0 w-full h-0.5 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent)] animate-scan-down pointer-events-none z-5" />
			</div>

			{/* Footer */}
			<div className="flex justify-between items-center px-4 py-2 bg-[rgba(15,15,15,0.9)] border-t border-terminal-border">
				<span className="text-[8px] tracking-[2px] text-terminal-text-muted">
					{footerLabel}
				</span>
				<span className="text-[8px] tracking-[1px] text-terminal-text-muted tabular-nums">
					{coordinates}
				</span>
			</div>
		</div>
	);
}
