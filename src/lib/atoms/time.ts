import { atom, useAtomValue } from "jotai"
import { Clock } from "three"

export const deltaTimeAtom = atom(0)
export const clock = new Clock()

deltaTimeAtom.onMount = (set) => {
	let lastTime = clock.getElapsedTime()

	function update() {
		const currentTime = clock.getElapsedTime()
		const deltaTime = currentTime - lastTime
		lastTime = currentTime

		set(deltaTime)

		requestAnimationFrame(update)
	}

	update()
}

const readAtom = atom((get) => get(deltaTimeAtom))
export const useDeltaTime = () => useAtomValue(readAtom)
