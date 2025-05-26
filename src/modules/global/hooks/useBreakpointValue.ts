import { BREAKPOINTS, BREAKPOINTS_VALUES, VALUES_TO_BREAKPOINTS, type Breakpoint } from "../constants/breakpoint"
import { useBreakpoint } from "./useBreakpoint"

const BREAKPOINTS_IN_DESC: Record<Breakpoint, number> = Object.fromEntries(
  [...BREAKPOINTS].reverse().map((breakpoint) => [breakpoint, BREAKPOINTS_VALUES[breakpoint]])
) as Record<Breakpoint, number>

/**
 * use Breakpoint media query
 * Return values based on current breakpoint value
 * @param media - Object with breakpoint values
 * @example
 * const isMobile = useMediaQuery({ base: true, sm: false })
 * if (isMobile === undefined) return null // Page has not been hydrated yet
 * // Breakpoint values = { base: 0, sm: 640, md: 768}
 * // Current window width = 700
 * // isMobile = false
 *
 * @returns Value based on current breakpoint
 */
export function useBreakpointQuery<T>(media: Partial<Record<Breakpoint, T>>) {
  // use Breakpoint global state from window width
  const breakpoint = useBreakpoint()

  const value = media[breakpoint]
  if (value !== undefined) return value

  // Convert aliases to values
  // Example
  // const keys = ["base", "sm", "md"] -> [0, 640, 768]
  const breakPointValues = Object.keys(media).map((key) => BREAKPOINTS_IN_DESC[key as Breakpoint])

  // With breakpoint values, find the closest breakpoint value
  // Example
  // const breakpointValues = [0, 640, 768]
  // const windowWidth = 700
  // closestBreakpoint = 640

  const breakPointWidth = BREAKPOINTS_VALUES[breakpoint]
  const closestBreakpoint = breakPointValues.reverse().find((bp) => bp <= breakPointWidth)

  if (closestBreakpoint === undefined) return undefined
  const closestAlias = VALUES_TO_BREAKPOINTS[closestBreakpoint]

  return media[closestAlias]
}
