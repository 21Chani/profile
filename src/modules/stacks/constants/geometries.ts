import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { PlaneGeometry } from "three"

export const ASCII_PLANE_GEOMETRY = new PlaneGeometry(5, 5, 30, 30)
ASCII_PLANE_GEOMETRY.setIndex(null)
randomizeAttributes(ASCII_PLANE_GEOMETRY)
