import { viewCursorAtom } from "@src/App";
import { useAtomClamp } from "@src/lib/jotai/clampAtom";

export function ViewIndicator() {
	return (
		<div className="fixed right-6 top-2/4 z-40 flex flex-col items-end gap-1">
			<IndicatorButton label="About me" index={0} />
			<IndicatorButton label="Technologies" index={1} />
		</div>
	);
}

export function IndicatorButton(props: { label?: string; index: number }) {
	const cursor = useAtomClamp(viewCursorAtom);
	const selected = cursor.value === props.index;
	return (
		<button
			onClick={() => cursor.set(props.index)}
			aria-selected={selected}
			aria-multiselectable
			className="group flex items-center gap-2 transition-all aria-[selected=false]:hover:underline"
			role="option"
		>
			<span className="text-sm text-light-blue/50 transition-all group-aria-selected:text-light-blue">{props.label}</span>
			<div className="h-3 w-3 rounded-full border-2 border-light-blue/50 transition-all group-aria-selected:border-light-blue group-aria-selected:bg-light-blue " />
		</button>
	);
}
