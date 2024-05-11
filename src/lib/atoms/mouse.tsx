import { atom } from "jotai"

export const mousePositionAtom = atom({ x: 0, y: 0 })
mousePositionAtom.onMount = (set) => {
	const handler = (event: MouseEvent) => {
		set({ x: event.clientX, y: event.clientY })
	}
	window.addEventListener("mousemove", handler)
	return () => window.removeEventListener("mousemove", handler)
}

export const normalizedMousePositionAtom = atom((get) => {
	const { x, y } = get(mousePositionAtom)
	return { x: x / window.innerWidth, y: y / window.innerHeight }
})
