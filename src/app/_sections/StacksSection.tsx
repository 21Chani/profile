"use client"
import { type PropsWithChildren } from "react"
import { FaFedora, FaJava, FaUbuntu, FaWindows } from "react-icons/fa"
import {
	SiArchlinux,
	SiCplusplus,
	SiCsharp,
	SiCss3,
	SiDebian,
	SiGo,
	SiHcl,
	SiHtml5,
	SiJavascript,
	SiMacos,
	SiPython,
	SiSolidity,
	SiTypescript,
} from "react-icons/si"
import { Card } from "~/components/ui/card"
import { Bar } from "~/components/ui/chart/bar/Bar"
import { Chart } from "~/components/ui/chart/bar/Chart"
import { useDisclosure } from "~/lib/hooks/useDisclosure"
import { cn } from "~/lib/styles"

export function StackSection() {
	return (
		<section className=" relative mt-24 flex  w-full  snap-start overflow-hidden">
			{/* <div className="flex items-center justify-center gap-4">
				<OperatingSystem />
				<Card className="size-96 rounded-xl p-10 ">
					<div className="size-10 rounded-lg bg-orange-400" />
					<div className="size-10 rounded-lg bg-orange-400" />
					<div className="size-10 rounded-lg bg-orange-400" />
					<div className="size-10 rounded-lg bg-orange-400" />
					<div className="size-10 rounded-lg bg-orange-400" />
					<div className="size-10 rounded-lg bg-orange-400" />
					<div className="size-10 rounded-lg bg-orange-400" />
				</Card>
			</div> */}
			<div
				style={{
					gridTemplateColumns: "200px minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) 200px",
				}}
				className="relative grid w-full grid-cols-5"
			>
				{/* Opacity effect */}
				<div className="absolute bottom-0 left-0 h-full w-60 bg-gradient-to-r from-background to-background/0"></div>
				<div className="absolute bottom-0 right-0 h-full w-60 bg-gradient-to-l from-background to-background/0"></div>
				<div className="absolute top-0 h-60 w-full bg-gradient-to-b from-background to-background/0"></div>
				<div className="absolute bottom-0 h-60 w-full bg-gradient-to-t from-background to-background/0"></div>
				{/* Grid */}
				<FullRowSeparator className="aspect-video" />
				<FullRowSeparator className="h-20" />

				{/* Operating Systems Row */}
				<div className="size-full h-full border border-border-primary "></div>
				<div className="row-span-2 size-full h-full border border-border-primary p-4">
					<h1 className="text-2xl font-bold">Operating Systems</h1>
				</div>
				<div className="col-span-2 row-span-2 aspect-video size-full h-full border border-border-primary ">
					<OperatingSystem />
				</div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary"></div>

				<FullRowSeparator className="h-20" />

				{/* Languages Row */}
				<div className="size-full h-full border border-border-primary "></div>
				<div className="col-span-2 row-span-2 aspect-video size-full h-full border border-border-primary ">
					<Card className="size-full flex-wrap border-none p-8">
						<div className="grid h-fit w-full grid-cols-[repeat(auto-fill,_minmax(80px,1fr))] gap-8">
							<StackItem className="aspect-square w-full p-4">
								<SiJavascript className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiTypescript className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiSolidity className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiGo className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiHtml5 className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiCss3 className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<FaJava className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiCsharp className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiPython className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiHcl className="size-full rounded" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiCplusplus className="size-full rounded" />
							</StackItem>
						</div>
					</Card>
				</div>

				<div className="row-span-2 size-full h-full border border-border-primary p-4">
					<h1 className="text-2xl font-bold">Programming Languages</h1>
				</div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary"></div>
				<FullRowSeparator className="h-20" />
				<FullRowSeparator className="aspect-video" />
			</div>
		</section>
	)
}

function OperatingSystem() {
	const state = useDisclosure(true)
	return (
		<div className="flex size-full  flex-col">
			<Card className="size-full border-none p-4">
				<Chart gap={"2%"} open={state.isOpen} className="size-full animate-scale-appear ">
					<Bar width={"70px"} height={"70%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<SiArchlinux className="size-5 fill-white" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"80%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<FaUbuntu className="size-5 fill-white" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"35%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<SiMacos className="size-5 fill-white" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"50%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<FaWindows className="size-5 fill-white" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"20%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<SiDebian className="size-5 fill-white" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"15%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<FaFedora className="size-5 fill-white" />
						</div>
					</Bar>

					<defs>
						<linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0%" className="stop-color-orange-400" />
							<stop offset="100%" className="stop-color-orange-950" />
						</linearGradient>
					</defs>
				</Chart>
			</Card>
		</div>
	)
}
function FullRowSeparator({ rows = 5, className }: { className?: string; rows?: number }) {
	return new Array(rows)
		.fill(0)
		.map((_, i) => <div className={cn("size-full h-full border border-border-primary", className)} key={i} />)
}

function StackItem(props: PropsWithChildren<{ className?: string }>) {
	return (
		<div className={cn("rounded-lg bg-gradient-to-bl from-orange-950 to-orange-400 p-1", props.className)}>
			{props.children}
		</div>
	)
}
