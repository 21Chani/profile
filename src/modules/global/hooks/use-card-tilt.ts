import { useCallback, useRef, useState } from "react";

export function useCardTilt() {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);
	const [coordinates, setCoordinates] = useState("0.00 / 0.00");

	const onMouseMove = useCallback((e: React.MouseEvent) => {
		const wrapper = wrapperRef.current;
		const card = cardRef.current;
		if (!wrapper || !card) return;

		const rect = wrapper.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		const rotY = (x - 0.5) * 18;
		const rotX = (0.5 - y) * 12;

		card.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
		setCoordinates(`${(x - 0.5).toFixed(2)} / ${(0.5 - y).toFixed(2)}`);
	}, []);

	const onMouseLeave = useCallback(() => {
		const card = cardRef.current;
		if (!card) return;

		card.style.transform = "rotateY(0deg) rotateX(0deg)";
		card.style.transition =
			"transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
		setTimeout(() => {
			if (card) card.style.transition = "transform 0.08s ease-out";
		}, 600);
		setCoordinates("0.00 / 0.00");
	}, []);

	return { wrapperRef, cardRef, coordinates, onMouseMove, onMouseLeave };
}
