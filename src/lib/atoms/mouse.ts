import { atom, useAtomValue } from "jotai"

export const mousePositionAtom = atom({ x: 0, y: 0 })
mousePositionAtom.onMount = (set) => {
	const handler = (event: MouseEvent) => {
		set({ x: event.clientX, y: event.clientY })
	}
	window.addEventListener("mousemove", handler)
	return () => window.removeEventListener("mousemove", handler)
}

export function normalizeMouse(payload: { clientX: number; clientY: number }) {
	return { x: payload.clientX / window.innerWidth, y: payload.clientY / window.innerHeight }
}

export function normalizeMouseFromEvent(event: MouseEvent) {
	return { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight }
}

export const normalizedMousePositionAtom = atom((get) => {
	const { x, y } = get(mousePositionAtom)
	return normalizeMouse({ clientX: x, clientY: y })
})

export const useMousePosition = () => useAtomValue(mousePositionAtom)
export const useNormalizedMousePosition = () => useAtomValue(normalizedMousePositionAtom)
