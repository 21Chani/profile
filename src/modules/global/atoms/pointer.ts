import { atom } from "jotai"

type PointerPosition = {
  xPercent?: number
  yPercent?: number

  x: number
  y: number
}

export const pointerPositiomAtom = atom<PointerPosition>({ x: -999, y: -999, xPercent: undefined, yPercent: undefined })

pointerPositiomAtom.onMount = (set) => {
  const handleMouseMove = (event: MouseEvent) => {
    const xPercent = event.clientX / window.innerWidth
    const yPercent = event.clientY / window.innerHeight

    set({ x: event.clientX, y: event.clientY, xPercent, yPercent })
  }

  const ac = new AbortController()
  const { signal } = ac
  window.addEventListener("pointermove", handleMouseMove, { signal })

  return () => ac.abort()
}
