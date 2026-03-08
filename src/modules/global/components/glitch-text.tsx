import { createElement, type ReactNode } from "react"

interface GlitchTextProps {
  children: ReactNode
  as?: keyof React.JSX.IntrinsicElements
  className?: string
}

export function GlitchText({ children, as: tag = "span", className = "" }: GlitchTextProps) {
  return createElement(
    tag,
    { className: `relative ${className}` },
    children,
    <span
      className="absolute top-0 left-0 w-full h-full text-terminal-white opacity-0 animate-glitch pointer-events-none [clip-path:inset(15%_0_65%_0)] [animation-delay:0.1s]"
      aria-hidden="true"
    >
      {children}
    </span>,
    <span
      className="absolute top-0 left-0 w-full h-full text-terminal-white opacity-0 animate-glitch pointer-events-none [clip-path:inset(65%_0_10%_0)] [animation-delay:0.25s]"
      aria-hidden="true"
    >
      {children}
    </span>,
  )
}
