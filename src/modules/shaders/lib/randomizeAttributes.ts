import { BufferAttribute, BufferGeometry } from "three"

export function randomizeAttributes(
  geometry: BufferGeometry,
  attributeName = "a_Random",
  count = geometry.attributes.position.count
) {
  const randomAttributes = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    randomAttributes[i] = (Math.random() * 2 - 1) / 2
  }
  geometry.setAttribute(attributeName, new BufferAttribute(randomAttributes, 1))
}
