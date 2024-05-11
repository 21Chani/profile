"use client"

import { Provider as JotaiProvider } from "jotai"
import { type PropsWithChildren } from "react"

export function AppProviders(props: PropsWithChildren) {
	return <JotaiProvider>{props.children}</JotaiProvider>
}
