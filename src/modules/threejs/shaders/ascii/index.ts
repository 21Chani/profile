import { shaderMaterial } from "@react-three/drei"
import { NearestFilter, Uniform, Vector2, type IUniform, type ShaderMaterialParameters, type Texture } from "three"

// Shader imports
import fragment from "./ascii.frag"
import vertex from "./ascii.vert"

const asciiShader = shaderMaterial({}, vertex, fragment)

export class ASCIIShaderMaterial extends asciiShader {
  public uniforms: {
    // Textures
    u_SpriteSheet?: IUniform<Texture>
    u_Texture?: IUniform<Texture>

    // Float/number uniforms
    u_SpriteCount?: Uniform<number>
    u_Progress: IUniform<number>
    u_Time: IUniform<number>
    u_Size: IUniform<number>

    // Vector uniforms
    u_Resolution: IUniform<Vector2>
  }

  constructor(params: ShaderMaterialParameters = {}) {
    super({
      transparent: true,
      depthWrite: false,

      ...params,
    } as ShaderMaterialParameters)

    this.uniforms = {
      u_Progress: { value: 0 },
      u_Size: { value: 0.06 },
      u_Time: { value: 0 },
      u_Resolution: new Uniform(new Vector2(0, 0)),
    }
  }

  setSpriteSheet(texture: Texture) {
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    texture.generateMipmaps = false

    const spriteCount = texture.image.width / texture.image.height
    if (spriteCount % 1 !== 0) throw new Error("Sprite sheet texture must be square")
    this.uniforms.u_SpriteCount = new Uniform(spriteCount)
    this.uniforms.u_SpriteSheet = new Uniform(texture)
  }

  setTexture(texture: Texture) {
    this.uniforms.u_Texture = new Uniform(texture)
  }
}
