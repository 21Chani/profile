import { atom, useAtom, useSetAtom } from "jotai";

export function clampAtom(min: number, max: number, defaultValue = min) {
	const _atom = atom(defaultValue);

	const next = atom(null, (get, set) => {
		const value = get(_atom);
		if (value > max) return;
		set(_atom, value + 1);
	});

	const prev = atom(null, (get, set) => {
		const value = get(_atom);
		if (value < min) return;
		set(_atom, value - 1);
	});

	return [_atom, { next, prev }] as const;
}

export type ClampAtom = ReturnType<typeof clampAtom>;

export function useAtomClamp(atom: ClampAtom) {
	const [value, set] = useAtom(atom[0]);
	const next = useSetAtom(atom[1].next);
	const prev = useSetAtom(atom[1].prev);

	return { value, next, prev, set };
}

export function useSetAtomClamp(atom: ClampAtom) {
	const set = useSetAtom(atom[0]);
	const next = useSetAtom(atom[1].next);
	const prev = useSetAtom(atom[1].prev);

	return { set, next, prev };
}
