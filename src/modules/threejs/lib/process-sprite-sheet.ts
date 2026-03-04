import { NearestFilter, type Texture } from "three"

export function processSpriteSheet(texture: Texture) {
  texture.minFilter = NearestFilter
  texture.magFilter = NearestFilter
  texture.generateMipmaps = false

  const image = texture.image as { width: number; height: number }
  const spriteCount = image.width / image.height
  if (spriteCount % 1 !== 0) throw new Error("Sprite sheet texture must have square sprites")

  return { texture, spriteCount }
}
