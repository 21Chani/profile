/**
 * Ease in out cubic function
 * Performs an ease in out cubic easing function
 * @param time - The time value between 0 and 1
 * @returns The eased time value
 */
export function easeInOutCubic(time: number) {
  return time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2
}
