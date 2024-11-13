import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef } from "react"
import { cn } from "~/lib/styles"

const paragraphStyles = cva("", {
	variants: {
		variant: {
			low: "text-justify font-jetbrains text-foreground-alt text-base ",
		},
	},
	defaultVariants: {
		variant: "low",
	},
})

export const Paragraph = forwardRef<
	HTMLParagraphElement,
	React.HTMLProps<HTMLParagraphElement> & VariantProps<typeof paragraphStyles>
>(function Paragraph({ children, variant, className, ...props }, ref) {
	return (
		<p ref={ref} {...props} className={cn(paragraphStyles({ variant }), className)}>
			{children}
		</p>
	)
})
