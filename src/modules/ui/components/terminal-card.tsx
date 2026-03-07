import type { ReactNode } from "react"

export function TerminalCard({
  title,
  children,
  className = "",
  prompt,
  footer,
  scanLine = false,
  cornerBrackets = false,
}: {
  title: string
  children: ReactNode
  className?: string
  prompt?: ReactNode
  footer?: ReactNode
  scanLine?: boolean
  cornerBrackets?: boolean
}) {
  return (
    <div
      className={`group/card relative border border-terminal-border bg-terminal-bg-elevated/60 text-sm overflow-hidden transition-[border-color] duration-400 hover:border-terminal-border-bright ${cornerBrackets ? "before:absolute before:-top-px before:-left-px before:w-4 before:h-4 before:border-t before:border-l before:border-terminal-border-mid before:z-5 before:pointer-events-none before:transition-[border-color] before:duration-400 hover:before:border-terminal-border-bright after:absolute after:-bottom-px after:-right-px after:w-4 after:h-4 after:border-b after:border-r after:border-terminal-border-mid after:z-5 after:pointer-events-none after:transition-[border-color] after:duration-400 hover:after:border-terminal-border-bright" : ""} ${className}`}
    >
      {/* Scan line */}
      {scanLine && (
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/3 to-transparent animate-scan-down pointer-events-none z-4 opacity-0 group-hover/card:opacity-100 transition-opacity duration-400" />
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
      <div className={prompt ? "py-0.5 pb-2" : "px-4.5 py-4"}>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="flex justify-between items-center px-3.5 py-1.75 border-t border-terminal-border bg-[rgba(12,12,12,0.6)]">
          {footer}
        </div>
      )}
    </div>
  )
}
