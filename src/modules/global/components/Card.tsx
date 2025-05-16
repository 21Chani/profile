import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type DetailedHTMLProps, type HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

//

const cardStyles = cva("flex", {
  variants: {
    variant: {
      primary: [
        "rounded-lg relative bordr border-border-primary from-white/5 to-black bg-white/5 bg-gradient-to-bl hadow-[32px_-32px_0px_0px] ",
        "bg-dotted",
      ],
      glassy: [""],
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

export const Card = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & VariantProps<typeof cardStyles>
>(function Card({ children, variant, className, ...props }, ref) {
  return (
    <div ref={ref} className={twMerge(cardStyles({ variant }), className)} {...props}>
      {children}
    </div>
  )
})
