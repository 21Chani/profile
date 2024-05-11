"use client"
import { Canvas } from "@react-three/fiber"
import { useControls } from "leva"
import { DraggableMesh, DraggableMeshType } from "~/components/threejs/DraggableMesh"

export function ProjectsSection() {
	const position = useControls({ x: 0, y: 0, z: 0 })

	return (
		<section className="relative flex h-screen min-h-screen w-full flex-col   ">
			<Canvas linear flat className="border" camera={{ fov: 35, position: [0, 0, 10] }}>
				<DraggableMesh dragType={DraggableMeshType.DRAG_ON_HOVER} position={[position.x, position.y, position.z]}>
					<boxGeometry args={[1, 0.5, 1]} />
					<meshBasicMaterial color="hotpink" />
				</DraggableMesh>
			</Canvas>
		</section>
	)
}
