import { atom } from "jotai"
import { type Breakpoint } from "../constants/breakpoint"
import { getBreakpoint } from "../lib/breakpoint"

/**
 * Atom to store the current breakpoint based on the window width.
 */
export const windowBreakpointAtom = atom<Breakpoint>(getBreakpoint(window.innerWidth))

// Add listener to update the breakpoint on window resize
windowBreakpointAtom.onMount = (set) => {
  // Abort controller to clean up the event listener
  const ac = new AbortController()
  const { signal } = ac

  // Resize event handler to update the breakpoint.
  const handleResize = () => set(getBreakpoint(window.innerWidth))
  window.addEventListener("resize", handleResize, { signal })

  // Initial set
  handleResize()

  // Cleanup the listener when the atom is unmounted.
  return () => ac.abort()
}
