"use client"
import ScrollBar from "smooth-scrollbar"
import { type PropsWithChildren, useEffect } from "react"

export function ScrollbarInitializer(props: PropsWithChildren) {
	useEffect(() => void ScrollBar.init(document.body, { damping: 0.1, alwaysShowTracks: false }), [])
	return props.children
}
