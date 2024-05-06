import { type PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

export function ItemInfo({ children, className }: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={twMerge("flex items-center gap-2  font-jaro uppercase leading-3 text-foreground-alt", className)}>
			<div className="bevel-2 z-10 size-3 bevel-color-foreground-alt bevel-offset-[3px] bevel-gradient-to-b bevel-to-transparent  bevel-from-transparent" />{" "}
			{children}
		</div>
	)
}
