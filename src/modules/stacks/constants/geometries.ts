import { randomizeAttributes } from "@/modules/threejs/lib/randomizeAttributes"
import { PlaneGeometry } from "three"

/**
 * ASCII Plane Geometry
 * Reusable plane geometry for ASCII image renderings.
 */
// The idea of reuse geometry, is that we can free up memory by not creating new geometries every time we need to render an ASCII image.
export const ASCII_PLANE_GEOMETRY = new PlaneGeometry(10, 10, 30, 30)
ASCII_PLANE_GEOMETRY.setIndex(null) // Disable index to avoid duplicated vertices

// Add `a_Random` attribute to the geometry with random values from 0 to 1
randomizeAttributes(ASCII_PLANE_GEOMETRY)
