"use client"
import { type ThreeElements } from "@react-three/fiber"
import * as THREE from "three"

const pyramidPoints = {
	top: new THREE.Vector3(0, 2, 0),

	// BASE:
	base1: new THREE.Vector3(-1, 0, -1),
	base2: new THREE.Vector3(1, 0, -1),
	base3: new THREE.Vector3(1, 0, 1),
	base4: new THREE.Vector3(-1, 0, 1),
}

function subdivideBtoA(pointA: THREE.Vector3, pointB: THREE.Vector3, subdivisions: number) {
	const newPoints = []

	for (let i = 0; i < subdivisions; i++) {
		const newPoint = pointA.clone().lerp(pointB, i / subdivisions)
		newPoints.push(newPoint)
	}

	return newPoints
}

function getSubdividedPoints(subdivisions = 1) {
	const newPoints: THREE.Vector3[] = Object.values(pyramidPoints)

	// Base subdivisions
	newPoints.push(...subdivideBtoA(pyramidPoints.base1, pyramidPoints.base2, subdivisions))
	newPoints.push(...subdivideBtoA(pyramidPoints.base2, pyramidPoints.base3, subdivisions))
	newPoints.push(...subdivideBtoA(pyramidPoints.base3, pyramidPoints.base4, subdivisions))
	newPoints.push(...subdivideBtoA(pyramidPoints.base4, pyramidPoints.base1, subdivisions))

	// Top subdivisions
	newPoints.push(...subdivideBtoA(pyramidPoints.top, pyramidPoints.base1, subdivisions))
	newPoints.push(...subdivideBtoA(pyramidPoints.top, pyramidPoints.base2, subdivisions))
	newPoints.push(...subdivideBtoA(pyramidPoints.top, pyramidPoints.base3, subdivisions))
	newPoints.push(...subdivideBtoA(pyramidPoints.top, pyramidPoints.base4, subdivisions))

	return newPoints
}

function generatePyramidPosition(subdivisions = 1) {
	const points = getSubdividedPoints(subdivisions)
	const position = new Float32Array(points.length * 3)

	points.forEach((point, index) => {
		position[index * 3] = point.x
		position[index * 3 + 1] = point.y
		position[index * 3 + 2] = point.z
	})

	return new THREE.BufferAttribute(position, 3)
}

export function PyramidPoints({
	subdivisions = 1,
	...pointProps
}: { subdivisions?: number } & ThreeElements["points"]) {
	return (
		<points {...pointProps}>
			<bufferGeometry attributes={{ position: generatePyramidPosition(subdivisions) }} />
			<pointsMaterial color={"white"} size={0.04} />
			{/* <meshBasicMaterial color="white" /> */}
		</points>
	)
}
