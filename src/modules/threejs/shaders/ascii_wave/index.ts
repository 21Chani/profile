import { shaderMaterial } from "@react-three/drei"
import { Uniform, Vector2, type IUniform, type ShaderMaterialParameters, type Texture } from "three"
import fragment from "./ascii_wave.frag"
import vertex from "./ascii_wave.vert"

// Load the shader material
const asciiShader = shaderMaterial({}, vertex, fragment)

export class ASCIIWaveShaderMaterial extends asciiShader {
  // Define uniforms type.
  public uniforms: {
    // Textures
    u_SpriteTexture?: IUniform<Texture>
    u_Texture?: IUniform<Texture>

    // Vectors
    u_Resolution: IUniform<Vector2>

    // Float/Numbers
    u_SpriteCount?: IUniform<number>
    u_Size?: IUniform<number>
    u_Time: IUniform<number>
  }

  constructor(params: ShaderMaterialParameters = {}) {
    super({
      transparent: true,
      depthWrite: false,
      ...params,
    } as ShaderMaterialParameters)

    // Init required uniforms
    this.uniforms = {
      u_Time: { value: 0 },
      u_Resolution: new Uniform(new Vector2(0, 0)),
      u_Size: new Uniform(10.0), // Default size
    }
  }

  // #############################################
  // Setters
  setSpriteTexture(texture: Texture) {
    this.uniforms.u_SpriteTexture = new Uniform(texture)
  }

  setTexture(texture: Texture) {
    this.uniforms.u_Texture = new Uniform(texture)
  }

  setResolution(width: number, height: number) {
    this.uniforms.u_Resolution.value.set(width, height)
  }
}
