"use client"
import { useFrame, type MeshProps } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import type * as THREE from "three"
import { normalizeMouse, useNormalizedMousePosition } from "~/lib/atoms/mouse"
import { useDeltaTime } from "~/lib/atoms/time"
import { useDisclosure } from "~/lib/hooks/useDisclosure"

export enum DraggableMeshType {
	CLICK_TO_DRAG,
	DRAG_ON_HOVER,
}

export function DraggableMesh({
	dragType = DraggableMeshType.CLICK_TO_DRAG,
	...props
}: MeshProps & { dragType?: DraggableMeshType }) {
	const deltaTime = useDeltaTime()
	const mouse = useNormalizedMousePosition()
	const [meshRef, setMeshRef] = useState<THREE.Mesh | null>(null)
	const dragRef = useRef(false)
	const drag = useDisclosure()

	useEffect(() => {
		dragRef.current = drag.isOpen
	}, [drag.isOpen])

	function moveMesh(x: number, y: number, speed = 20) {
		if (!meshRef) throw new Error("Mesh not found")

		const diffX = (x - meshRef.position.x / 6) * speed * deltaTime
		const diffY = (-y - meshRef.position.y / 6) * speed * deltaTime

		meshRef.position.x += diffX
		meshRef.position.y += diffY
		return { x: diffX, y: diffY }
	}

	function pointerUpHandler(event: MouseEvent) {
		if (!meshRef) return
		const mouse = normalizeMouse(event)
		drag.close()
		dragRef.current = false

		function damping() {
			if (dragRef.current) return

			const result = moveMesh(mouse.x - 0.5, mouse.y - 0.5)
			if (Math.abs(result?.x) + Math.abs(result?.y) < 0.008) return

			requestAnimationFrame(damping)
		}
		damping()
		window.removeEventListener("pointerup", pointerUpHandler)
	}

	useFrame(() => {
		if (!drag.isOpen) return
		if (!meshRef) return

		moveMesh(mouse.x - 0.5, mouse.y - 0.5)
	})

	return (
		<mesh
			onPointerEnter={() => document.body.style.setProperty("cursor", "pointer")}
			onPointerLeave={() => document.body.style.setProperty("cursor", "default")}
			onClick={() => dragType == DraggableMeshType.CLICK_TO_DRAG && drag.toggle()}
			onPointerDown={() => {
				if (dragType !== DraggableMeshType.DRAG_ON_HOVER) return
				drag.open()
				window.addEventListener("pointerup", pointerUpHandler)
			}}
			{...props}
			ref={setMeshRef}>
			{props.children}
		</mesh>
	)
}
