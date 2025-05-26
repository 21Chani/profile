import { useAtomValue } from "jotai"
import { windowBreakpointAtom } from "../atoms/breakpoint"

/**
 * use Current Breakpoint Hook.
 *
 * Warning: this hook is a wrapper for consuming the `windowBreakpointAtom`.
 * @returns The current window breakpoing value.
 */
export const useBreakpoint = () => useAtomValue(windowBreakpointAtom)
