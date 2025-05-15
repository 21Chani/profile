import { rangeRandom } from "@/modules/global/lib/rangeRandom"
import { useEffect, useState } from "react"
import { BufferAttribute, type Mesh } from "three"

interface UseEqualizeVerticesProps {
  meshes: Mesh[]
  onEqualized?: () => void
}

export function useEqualizeVertices({ meshes, onEqualized }: UseEqualizeVerticesProps) {
  const [isEqualized, setIsEqualized] = useState(false)
  const highestVertexCount = Math.max(...meshes.map((mesh) => mesh.geometry.attributes.position.count))

  useEffect(() => {
    meshes.forEach((mesh) => {
      const vertexCount = mesh.geometry.attributes.position.count
      if (vertexCount === highestVertexCount) return

      // In theory this should never happen.
      // If does, there is any problem with the mesh or with the math above
      if (vertexCount > highestVertexCount) throw new Error("Mesh has more vertices than the highest vertex count")

      const newPositions = new Float32Array(highestVertexCount * 3) // * 3 Means that we have XYZ coords for each vertex.
      newPositions.set(mesh.geometry.attributes.position.array)

      const diff = highestVertexCount - vertexCount
      for (let i = 0; i < diff; i++) {
        const normalizedPosition = vertexCount + i
        const x = normalizedPosition * 3 + 0
        const y = normalizedPosition * 3 + 1
        const z = normalizedPosition * 3 + 2

        // Pick a random vertex from the original mesh
        const rVertice = rangeRandom(0, vertexCount)
        const rX = rVertice * 3 + 0
        const rY = rVertice * 3 + 1
        const rZ = rVertice * 3 + 2

        newPositions[x] = mesh.geometry.attributes.position.array[rX]
        newPositions[y] = mesh.geometry.attributes.position.array[rY]
        newPositions[z] = mesh.geometry.attributes.position.array[rZ]
      }
      mesh.geometry.setAttribute("position", new BufferAttribute(newPositions, 3))
    })
    setIsEqualized(true)

    // Cleanup
    return () => {
      setIsEqualized(false)
    }
  }, [meshes, setIsEqualized])

  return { isEqualized }
}
