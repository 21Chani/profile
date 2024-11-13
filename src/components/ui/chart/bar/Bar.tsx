"use client"
import { Fragment, useId, useRef, type SVGProps } from "react"
import { useChartCTX } from "./Chart"
export function Bar({ x, height, width = 40, className, children, ...props }: SVGProps<SVGRectElement>) {
	const ctx = useChartCTX()
	const id = useId()
	const rectRef = useRef<SVGRectElement | null>(null)

	const _height = ctx.open ? height : 0

	if (!ctx.svg) return null

	const bars = Array.from(ctx.svg.children).filter((el) => el.id.startsWith("bar-"))
	const elementIndex = bars.findIndex((el) => el.id === `bar-${id}`)
	const gap = typeof ctx.gap === "number" ? `${ctx.gap}px` : ctx.gap ?? "0px"
	return (
		<Fragment>
			<rect
				id={`bar-${id}`}
				ref={rectRef}
				x={`calc((${width} + ${gap}) * ${elementIndex})`}
				y={`calc(100% - ${_height}${typeof _height === "number" ? "px" : ""})`}
				rx={5}
				radius={"10"}
				width={width}
				className={`transition-all duration-500 ease-out ${className}`}
				height={_height}
				{...props}
			/>
			<foreignObject
				x={`calc((${width} + ${gap}) * ${elementIndex})`}
				style={{ width, height }}
				y={`calc(100% - ${_height}${typeof _height === "number" ? "px" : ""})`}
				className="relative py-3 transition-all duration-500 ease-out"
			>
				{children}
			</foreignObject>
		</Fragment>
	)
}
