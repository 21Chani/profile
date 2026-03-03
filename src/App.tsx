import { Canvas } from "@react-three/fiber";
import "./App.css";

function App() {
	return (
		<>
			{/* Three.js canvas — fixed behind all page content */}
			<div className="canvas-background">
				<Canvas></Canvas>
			</div>

			{/* Page wrapper — sits above the canvas */}
			<div className="page">
				{/* Future sections: Nav, Hero, Stacks, Work, Contact, Footer */}
			</div>
		</>
	);
}

export default App;
