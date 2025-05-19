import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type DetailedHTMLProps, type HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

//

const cardStyles = cva("flex", {
  variants: {
    variant: {
      primary: ["rounded-lg relative"],
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
