import { type Breakpoint, BREAKPOINTS_VALUES, VALUES_TO_BREAKPOINTS } from "../constants/breakpoint"

/**
 * Get breakpoint given a width.
 * @param width - The width in pixels to check against the breakpoints.
 * @returns The corresponding breakpoint for the given width.
 */
export function getBreakpoint(width: number): Breakpoint {
  const possibleValues = Object.values(BREAKPOINTS_VALUES).reverse()

  const bpValue = possibleValues.find((value) => value <= width)
  if (bpValue === undefined) throw new Error(`No breakpoint found for width: ${width}`)

  return VALUES_TO_BREAKPOINTS[bpValue] as Breakpoint
}
