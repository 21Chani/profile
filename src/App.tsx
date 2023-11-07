/* eslint-disable react-refresh/only-export-components */
import { IntroductionView } from "./components/home/IntroductionView";
import { TechnologiesView } from "./components/home/Technologies";
import { ViewIndicator } from "./components/home/ViewIndicator";
import { clampAtom, useAtomClamp } from "./lib/jotai/clampAtom";

export const viewCursorAtom = clampAtom(0, 1);

function App() {
	const currentCursor = useAtomClamp(viewCursorAtom);

	return (
		<div className="relative mx-auto max-h-screen w-full overflow-hidden bg-[#0A0C2080]">
			<div className="absolute -left-[48px] -top-[77px] h-80 w-80 rounded bg-[#30B4FF]" />
			<div className="absolute right-0  h-96 w-96 rounded bg-[#00A3FF]" />
			<div className="absolute bottom-0 left-[592px] top-2/4 h-72 w-3/4 rotate-[-25deg] rounded bg-[#3FA4ED]" />

			<div
				onWheel={(e) => {
					if (e.deltaY > 0) currentCursor.next();
					else currentCursor.prev();
				}}
				className="z-40 h-screen w-full overflow-hidden bg-[#0A0C20cc] backdrop-blur-[408px]"
			>
				<IntroductionView />
				<TechnologiesView />
			</div>
			<ViewIndicator />
		</div>
	);
}

export default App;
