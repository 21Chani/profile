import { cva, type VariantProps } from "class-variance-authority"
import clsx from "clsx"
import { forwardRef } from "react"

const paragraphStyles = cva("", {
  variants: {
    variant: {
      low: "font-cascadia text-foreground-alt text-base ",
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
    <p ref={ref} {...props} className={clsx(paragraphStyles({ variant }), className)}>
      {children}
    </p>
  )
})
