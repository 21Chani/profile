import { shaderMaterial } from "@react-three/drei"
import { NearestFilter, Uniform, Vector2, type IUniform, type ShaderMaterialParameters, type Texture } from "three"

// Shader imports
import fragment from "./ascii.frag"
import vertex from "./ascii.vert"

const asciiShader = shaderMaterial({}, vertex, fragment)

export class ASCIIShaderMaterial extends asciiShader {
  public static readonly DEFAULT_PARTICLE_SIZE = 0.07

  public uniforms: {
    // Textures
    u_SpriteSheet?: IUniform<Texture>
    u_Texture?: IUniform<Texture>

    u_SpriteCount?: Uniform<number>
    u_Progress: IUniform<number>
    u_Time: IUniform<number>
    u_Size: IUniform<number>

    // Vector uniforms
    u_Resolution: IUniform<Vector2>
  }

  constructor(params: ShaderMaterialParameters = {}) {
    super({ transparent: true, depthWrite: false, ...params } as ShaderMaterialParameters)

    // Update uniforms.
    this.uniforms = {
      u_Progress: { value: 0 },
      u_Time: { value: 0 },
      u_Resolution: new Uniform(new Vector2(0, 0)),

      u_Size: new Uniform(ASCIIShaderMaterial.DEFAULT_PARTICLE_SIZE),
    }
  }

  setSpriteSheet(texture: Texture) {
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    texture.generateMipmaps = false

    // Calculate sprite count based on width and height of texture.
    // For the sprite to work, the image must be formatted in a "square" format, like 32x16, it means it have 2 sprites on the texture
    const spriteCount = texture.image.width / texture.image.height
    if (spriteCount % 1 !== 0) throw new Error("Sprite sheet texture must be square")
    this.uniforms.u_SpriteCount = new Uniform(spriteCount)
    this.uniforms.u_SpriteSheet = new Uniform(texture)
  }

  setTexture(texture: Texture) {
    this.uniforms.u_Texture = new Uniform(texture)
  }
}
