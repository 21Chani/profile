import { shaderMaterial } from "@react-three/drei"
import { extend, type ThreeElement } from "@react-three/fiber"
import { Texture, Vector2 } from "three"
import fragment from "./ascii.frag"
import vertex from "./ascii.vert"

export const DEFAULT_PARTICLE_SIZE = 0.07

const AsciiMaterialImpl = shaderMaterial(
  {
    u_SpriteSheet: null as Texture | null,
    u_Texture: null as Texture | null,
    u_SpriteCount: 0,
    u_Progress: 1,
    u_Time: 0,
    u_Size: DEFAULT_PARTICLE_SIZE ,
    u_Resolution: new Vector2(0, 0),
  },
  vertex,
  fragment
)

extend({ AsciiMaterial: AsciiMaterialImpl })

export { AsciiMaterialImpl as AsciiMaterial }
export type AsciiMaterialType = InstanceType<typeof AsciiMaterialImpl>

declare module "@react-three/fiber" {
  interface ThreeElements {
    asciiMaterial: ThreeElement<typeof AsciiMaterialImpl>
  }
}
