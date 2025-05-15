import { BufferAttribute, BufferGeometry } from "three"

export function randomizeAttributes(geometry: BufferGeometry, attributeName = "a_Random") {
  const length = geometry.attributes.position.count

  const randomAttributes = new Float32Array(length)
  for (let i = 0; i < length; i++) {
    randomAttributes[i] = (Math.random() * 2 - 1) / 2
  }
  geometry.setAttribute(attributeName, new BufferAttribute(randomAttributes, 1))
}
