import { createElement, type ReactNode } from "react"

interface SectionShellProps {
  children: ReactNode
  background?: ReactNode
  className?: string
  innerClassName?: string
  as?: keyof React.JSX.IntrinsicElements
  id?: string
}

export function SectionShell({
  children,
  background,
  className = "",
  innerClassName = "",
  as = "section",
  id,
}: SectionShellProps) {
  return createElement(
    as,
    { id, className: `group relative ${className}` },
    background,
    <div className={`relative max-w-270 mx-auto px-5 md:px-10 ${innerClassName}`}>{children}</div>,
  )
}
