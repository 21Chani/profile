export function SectionLabel({
	label,
	className = "",
}: {
	label: string;
	className?: string;
}) {
	return (
		<div
			className={`flex items-center gap-3 text-xxs tracking-[5px] text-terminal-text-muted mb-12 after:flex-1 after:h-px after:bg-linear-to-r after:from-terminal-border-mid after:to-transparent ${className}`}
		>
			{label}
		</div>
	);
}
