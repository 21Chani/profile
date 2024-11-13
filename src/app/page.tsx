import { type Metadata } from "next"
import Image from "next/image"
import { HomeSection } from "./_sections/HomeSection"
import { StackSection } from "./_sections/StacksSection"

export const metadata: Metadata = {
	title: "chani.sh | Profile",
	description: "Chani's personal website",
}

export default function Home() {
	return (
		<main className="mx-auto max-w-screen-2xl">
			<HomeSection />
			{/* <ProjectsSection /> */}
			<StackSection />
			{/* <section className="h-screen w-full" />
			<section className="h-screen w-full" /> */}
		</main>
	)
}

function StackItem(props: { src: string }) {
	return (
		<div className="b-border-2 relative z-10 h-16 w-20 p-4 bevel-color-gray-500 bevel-offset-6    ">
			<Image src={props.src} width={100} height={100} className="size-full rounded-[inherit]" alt="JS" />
		</div>
	)
}
