/**
 * All supported page breakpoints.
 */
export const BREAKPOINTS = ["base", "sm", "md", "lg", "xl", "2xl"] as const
Object.freeze(BREAKPOINTS) // Freeze the array to prevent modifications with `sort` or any other ref changes

export type Breakpoint = (typeof BREAKPOINTS)[number]

/**
 * A mapping of breakpoints to their corresponding pixel values.
 */
export const BREAKPOINTS_VALUES: Record<Breakpoint, number> = {
  base: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

/**
 * A reverse mapping of pixel values to their corresponding breakpoints.
 */
export const VALUES_TO_BREAKPOINTS: Record<number, Breakpoint> = Object.fromEntries(
  BREAKPOINTS.map((breakpoint) => [BREAKPOINTS_VALUES[breakpoint], breakpoint])
) as Record<number, Breakpoint>
