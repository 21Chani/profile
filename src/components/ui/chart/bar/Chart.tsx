"use client"
import * as d3 from "d3"
import { createContext, useContext, useEffect, useState, type SVGProps } from "react"

type ChartCtx = {
	svgSelection?: d3.Selection<SVGSVGElement, unknown, null, undefined> | null
	svg: SVGSVGElement | null
	open?: boolean
	gap?: number | string
}
const chartCtx = createContext<ChartCtx | null>(null)

export function useChartCTX() {
	const ctx = useContext(chartCtx)
	if (!ctx) throw new Error("useChatCTX must be used inside ChartProvider")
	return ctx
}

export function Chart({ gap, ...props }: SVGProps<SVGSVGElement> & { open?: boolean; gap?: string | number }) {
	const [ref, setRef] = useState<SVGSVGElement | null>(null)
	const [svgSelection, setSelection] = useState<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null)

	useEffect(() => {
		if (!ref) return
		const svg = d3.select(ref)
		setSelection(svg)
	}, [ref])

	return (
		<chartCtx.Provider value={{ gap, svg: ref, svgSelection, open: props.open ?? true }}>
			<svg {...props} ref={setRef}>
				{props.children}s
			</svg>
		</chartCtx.Provider>
	)
}

// useEffect(() => {
//   const data = [10, 20, 50, 16, 23, 42]
//   const height = 400
//   if (!svgSelection) return

//   // const svg = d3.select(ref.current).attr("width", width).attr("height", height)

//   // svgSelection
//   // 	.selectAll("rect")
//   // 	.data(data)
//   // 	.join("rect")
//   // 	.attr("x", (d, i) => i * 30)
//   // 	.attr("y", (d) => height - d * 2)
//   // 	.attr("width", 20)
//   // 	.attr("height", (d) => d * 2)
//   // 	.attr("fill", "steelblue")
// }, [svgSelection])
