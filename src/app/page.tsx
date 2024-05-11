import { HomeSection } from "./_sections/HomeSection"
import { ProjectsSection } from "./_sections/ProjectsSection"

export default function Home() {
	return (
		<main className="">
			<HomeSection />
			<ProjectsSection />
			<section className="h-screen w-full" />
			<section className="h-screen w-full" />
			<section className="h-screen w-full" />
		</main>
	)
}
