import type { SVGProps } from "react"

// Fallback icons for stacks without a Simple Icons brand entry.

export function JotaiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="9" cy="8" rx="5" ry="7" />
      <ellipse cx="16" cy="15" rx="4" ry="6" opacity="0.6" />
    </svg>
  )
}

export function MetaplexIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2 2 8v8l10 6 10-6V8zm0 2.3 7.5 4.5L12 13.3 4.5 8.8zm-8 6.2 7 4.2v6.4l-7-4.2zm16 0v6.4l-7 4.2v-6.4z" />
    </svg>
  )
}

export function AnchorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2a2.5 2.5 0 0 0-1 4.8V9H8v2h3v9.9a8 8 0 0 1-6.9-6.4L6 13l-3-2-3 2 1.6 1.1A10 10 0 0 0 12 22a10 10 0 0 0 10.4-7.9L24 13l-3-2-3 2 1.9 1.5A8 8 0 0 1 13 20.9V11h3V9h-3V6.8A2.5 2.5 0 0 0 12 2m0 2a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1" />
    </svg>
  )
}
