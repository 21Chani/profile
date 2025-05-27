import { shaderMaterial } from "@react-three/drei"
import { Uniform, type IUniform, type ShaderMaterialParameters, type Texture } from "three"

// Shader imports
import fragment from "./ascii.frag"
import vertex from "./ascii.vert"

const asciiShader = shaderMaterial({}, vertex, fragment)

export class ASCIIShaderMaterial extends asciiShader {
  public uniforms: {
    u_SpriteSheet?: IUniform<Texture>
    u_SpriteCount?: Uniform<number>
    u_Texture?: IUniform<Texture>
    u_Time: IUniform<number>
    u_Progress: IUniform<number>
  }

  constructor(params: ShaderMaterialParameters = {}) {
    super({
      ...params,
    } as ShaderMaterialParameters)

    this.uniforms = {
      u_Time: { value: 0 },
      u_Progress: { value: 0 },
    }
  }

  setSpriteSheet(texture: Texture) {
    const spriteCount = texture.image.width / texture.image.height
    if (spriteCount % 1 !== 0) throw new Error("Sprite sheet texture must be square")
    this.uniforms.u_SpriteCount = new Uniform(spriteCount)
    this.uniforms.u_SpriteSheet = new Uniform(texture)
  }

  setTexture(texture: Texture) {
    this.uniforms.u_Texture = new Uniform(texture)
  }
}
