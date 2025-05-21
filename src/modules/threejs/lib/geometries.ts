import { BufferAttribute, BufferGeometry, Vector3 } from "three"

/**
 * Generates a singulary geometry where all vertices are at the same position.
 * @param count - The number of vertices to generate.
 * @param position - The position of the vertices - Default is (0, 0, 0).
 * @param geometry - The BufferGeometry to set the vertices to.
 * @returns BufferGeometry - The generated geometry with all vertices at the same position.
 */
export function generateSingularity(
  count: number,
  position = new Vector3(0, 0, 0),
  geometry = new BufferGeometry()
): BufferGeometry {
  const positions = new Float32Array(count * 3)
  new Array(count).forEach((_, i) => {
    const normalizedIndex = i * 3 // Amount of vertices
    const iX = normalizedIndex + 0
    const iY = normalizedIndex + 1
    const iZ = normalizedIndex + 2

    // Positionate the vertices in the same position
    positions[iX] = position.x
    positions[iY] = position.y
    positions[iZ] = position.z
  })

  geometry.setAttribute("position", new BufferAttribute(positions, 3))
  return geometry
}
