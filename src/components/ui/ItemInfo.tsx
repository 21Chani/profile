import { type PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

export function ItemInfo({ children, className }: PropsWithChildren<{ className?: string }>) {
	return (
		<div
			className={twMerge(
				"flex items-center gap-2 font-jaro  uppercase leading-3 text-foreground-alt max-md:text-xs",
				className,
			)}
		>
			<div className="b-border-2 z-10 size-3 bevel-color-orange-400 bevel-offset-[3px]" /> {children}
		</div>
	)
}
