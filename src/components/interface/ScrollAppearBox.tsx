import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const RevealBox = forwardRef<HTMLDivElement, JSX.IntrinsicElements["div"]>((props, outRef) => {
	const innerRef = useRef<HTMLDivElement>(null);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	useImperativeHandle(outRef, () => innerRef.current!, [innerRef]);

	const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry) => {
			const value = String(entry.isIntersecting);
			entry.target.setAttribute("data-open", value);
		});
	};

	const observer = useRef<IntersectionObserver>(
		new IntersectionObserver(intersectionCallback, {
			rootMargin: "1000px",
			threshold: 0.1
		})
	);

	useEffect(() => {
		if (!innerRef.current) return;
		observer.current.observe(innerRef.current);
	}, [observer]);

	return <div data-open={"false"} ref={innerRef} {...props} />;
});
