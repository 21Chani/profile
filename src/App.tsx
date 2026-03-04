import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Navbar } from "./global/components/navbar";
import { AboutSection } from "./ui/components/about-section";

function App() {
	return (
		<>
			{/* Three.js canvas — fixed behind all page content */}
			<div className="canvas-background">
				<Canvas></Canvas>
			</div>

			{/* Page wrapper — sits above the canvas */}
			<div className="page">
				<Navbar />
				<section
					className="min-h-screen flex items-center justify-center px-5 pt-20 pb-10 md:px-10"
					id="about"
				>
					<div className="max-w-[1080px] w-full">
						<AboutSection />
					</div>
				</section>
			</div>
		</>
	);
}

export default App;
