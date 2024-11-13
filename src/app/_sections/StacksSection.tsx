"use client"
import { type PropsWithChildren } from "react"
import { FaFedora, FaJava, FaUbuntu, FaWindows } from "react-icons/fa"
import {
	SiArchlinux,
	SiCplusplus,
	SiCsharp,
	SiCss3,
	SiDebian,
	SiFirebase,
	SiGo,
	SiHcl,
	SiHtml5,
	SiJavascript,
	SiMacos,
	SiMongodb,
	SiMysql,
	SiPostgresql,
	SiPython,
	SiRedis,
	SiSolidity,
	SiTypescript,
	SiVk,
} from "react-icons/si"
import { Card } from "~/components/ui/card"
import { Bar } from "~/components/ui/chart/bar/Bar"
import { Chart } from "~/components/ui/chart/bar/Chart"
import { Paragraph } from "~/components/ui/paragraph"
import { useDisclosure } from "~/lib/hooks/useDisclosure"
import { cn } from "~/lib/styles"

export function StackSection() {
	return (
		<section className=" relative mx-auto mt-24 flex w-full max-w-screen-xl  snap-start overflow-hidden">
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
				<FullRowSeparator className="h-14" />

				{/* Operating Systems Row */}
				<div className="size-full h-full border border-border-primary "></div>
				<div className="row-span2 flex size-full h-full flex-col border border-border-primary p-4">
					<h1 className="mt-auto text-2xl font-bold">
						Operating <br /> Systems
					</h1>
				</div>
				<div className="col-span-2 row-span-2 aspect-video size-full h-full min-h-[440px] border border-border-primary ">
					<OperatingSystem />
				</div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary p-4">
					<Paragraph className="text-sm">
						Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem sit
						porro officiis sed dolor voluptate.
					</Paragraph>
				</div>
				<div className="size-full h-full border border-border-primary"></div>

				<FullRowSeparator className="h-14" />

				{/* Languages Row */}
				<div className="size-full h-full border border-border-primary "></div>
				<div className="col-span-2 row-span-2 aspect-video size-full h-full border border-border-primary ">
					<Card className="size-full flex-wrap border-none p-8">
						<div className="grid h-fit w-full grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8">
							<StackItem className="aspect-square w-full p-4">
								<SiJavascript className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiTypescript className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiSolidity className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiGo className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiHtml5 className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiCss3 className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<FaJava className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiCsharp className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiPython className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiHcl className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiCplusplus className="size-full rounded fill-black" />
							</StackItem>
						</div>
					</Card>
				</div>

				<div className="flex size-full h-full border border-border-primary p-4">
					<h1 className="mt-auto text-2xl font-bold">Programming Languages</h1>
				</div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary p-2">
					<Paragraph className="text-sm">
						Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem sit
						porro officiis sed dolor voluptate.
					</Paragraph>
				</div>
				<div className="size-full h-full border border-border-primary"></div>
				<FullRowSeparator className="h-14" />

				{/* Operating Systems Row */}
				<div className="size-full h-full border border-border-primary "></div>
				<div className="row-span2 flex size-full h-full flex-col border border-border-primary p-4">
					<h1 className="mt-auto text-2xl font-bold">Database</h1>
				</div>
				<div className="col-span-2 row-span-2 aspect-video size-full h-full border border-border-primary ">
					<Card className="size-full flex-wrap border-none p-8">
						<div className="grid h-fit w-full grid-cols-[repeat(auto-fill,_minmax(50px,1fr))] gap-8">
							<StackItem className="aspect-square w-full p-4">
								<SiPostgresql className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiMysql className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiFirebase className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiMongodb className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiRedis className="size-full rounded fill-black" />
							</StackItem>
							<StackItem className="aspect-square w-full p-4">
								<SiVk className="size-full rounded fill-black" />
							</StackItem>
						</div>
					</Card>
				</div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary"></div>
				<div className="size-full h-full border border-border-primary p-4">
					<Paragraph className="text-sm">
						Lorem ipsum dolor sit amet. Aut itaque veritatis id quis harum quo quod deserunt sed numquam voluptatem sit
						porro officiis sed dolor voluptate.
					</Paragraph>
				</div>
				<div className="size-full h-full border border-border-primary"></div>

				<FullRowSeparator className="h-14" />
				<FullRowSeparator className="aspect-video" />
			</div>
		</section>
	)
}

function OperatingSystem() {
	const state = useDisclosure(true)
	return (
		<div className="flex size-full  flex-col">
			<Card className="size-full  border-none p-4">
				<Chart gap={"2%"} open={state.isOpen} className="size-full animate-scale-appear ">
					<Bar width={"70px"} height={"70%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<SiArchlinux className="size-7 fill-black" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"55%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<SiMacos className="size-7 fill-black" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"80%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<FaUbuntu className="size-7 fill-black" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"43%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<FaWindows className="size-7 fill-black" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"40%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<SiDebian className="size-7 fill-black" />
						</div>
					</Bar>
					<Bar width={"70px"} height={"18%"} fill="url(#gradient)">
						<div className="flex size-full justify-center">
							<FaFedora className="size-7 fill-black" />
						</div>
					</Bar>

					<defs>
						<linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0%" className="stop-color-orange-100" />
							<stop offset="100%" className="stop-color-orange-500" />
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
		<div className={cn("rounded-lg bg-gradient-to-tr from-orange-500 to-orange-100 p-1", props.className)}>
			{props.children}
		</div>
	)
}
