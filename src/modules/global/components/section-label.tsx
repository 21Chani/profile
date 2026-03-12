export function SectionLabel({
	label,
	className = "",
	id,
}: {
	label: string;
	className?: string;
	id?: string;
}) {
	return (
		<div
			id={id}
			className={`flex items-center gap-3 text-xxs tracking-[5px] text-terminal-text-muted mb-12 after:flex-1 after:h-px after:bg-linear-to-r after:from-terminal-border-mid after:to-transparent ${className}`}
		>
			{label}
		</div>
	);
}
