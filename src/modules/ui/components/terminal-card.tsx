import { cva } from "class-variance-authority"
import type { ReactNode } from "react"

const card = cva(
  [
    "group/card relative rounded-lg border text-sm",
    "border-terminal-border bg-terminal-bg-elevated/60",
    "transition-[border-color] duration-400 hover:border-terminal-border-bright",
  ],
  {
    variants: {
      fitContent: {
        true: "w-fit",
        false: "overflow-hidden",
      },
      cornerBrackets: {
        true: [
          "before:absolute before:-top-px before:-left-px before:w-4 before:h-4",
          "before:border-t before:border-l before:border-terminal-border-mid",
          "before:z-5 before:pointer-events-none",
          "before:transition-[border-color] before:duration-400",
          "hover:before:border-terminal-border-bright",

          "after:absolute after:-bottom-px after:-right-px after:w-4 after:h-4",
          "after:border-b after:border-r after:border-terminal-border-mid",
          "after:z-5 after:pointer-events-none",
          "after:transition-[border-color] after:duration-400",
          "hover:after:border-terminal-border-bright",
        ],
      },
    },
    defaultVariants: {
      fitContent: false,
      cornerBrackets: false,
    },
  },
)

const body = cva("", {
  variants: {
    hasPrompt: {
      true: "py-0.5 pb-2",
      false: "px-4.5 py-4",
    },
  },
})

export function TerminalCard({
  title,
  children,
  className,
  prompt,
  footer,
  scanLine = false,
  cornerBrackets = false,
  fitContent = false,
}: {
  title: string
  children: ReactNode
  className?: string
  prompt?: ReactNode
  footer?: ReactNode
  scanLine?: boolean
  cornerBrackets?: boolean
  fitContent?: boolean
}) {
  return (
    <div className={card({ fitContent, cornerBrackets, className })}>
      {/* Scan line */}
      {scanLine && (
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-terminal-white/3 to-transparent animate-scan-down pointer-events-none z-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-400" />
      )}

      {/* Title bar */}
      <div className="flex items-center gap-2 px-3.5 py-2 border-b border-terminal-border bg-terminal-bg-panel/80">
        <div className="size-1.75 rounded-full border border-terminal-border-mid transition-colors duration-300 group-hover/card:border-terminal-border-bright" />
        <div className="size-1.75 rounded-full border border-terminal-border-mid transition-colors duration-300 group-hover/card:border-terminal-border-bright" />
        <div className="size-1.75 rounded-full border border-terminal-border-mid transition-colors duration-300 group-hover/card:border-terminal-border-bright" />
        <span className="text-xxs tracking-[1px] text-terminal-text-muted ml-1">{title}</span>
      </div>

      {/* Prompt */}
      {prompt && (
        <div className="px-3.5 pt-2.5 pb-1.5 text-xs text-terminal-text-muted flex items-center select-none">
          {prompt}
        </div>
      )}

      {/* Body */}
      <div className={body({ hasPrompt: !!prompt })}>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="flex justify-between items-center px-3.5 py-1.75 border-t border-terminal-border bg-terminal-bg-overlay/60">
          {footer}
        </div>
      )}
    </div>
  )
}
