import { ScrollbarInitializer } from "./_providers/ScrollbarInitializer"
import { HomeSection } from "./_sections/HomeSection"

export default function Home() {
	return (
		<ScrollbarInitializer>
			<main className="">
				<HomeSection />
				<section className="h-screen w-full" />
				<section className="h-screen w-full" />
				<section className="h-screen w-full" />
			</main>
		</ScrollbarInitializer>
	)
}
