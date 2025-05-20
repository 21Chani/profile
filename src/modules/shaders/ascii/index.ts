import { shaderMaterial } from "@react-three/drei"
import { Uniform, Vector2, type IUniform, type ShaderMaterialParameters, type Texture } from "three"
import fragment from "./fragment.glsl"
import vertex from "./vertex.glsl"

const asciiShader = shaderMaterial({}, vertex, fragment)

export class ASCIIShaderMaterial extends asciiShader {
  public uniforms: {
    u_BitTexture?: IUniform<Texture>
    u_Texture?: IUniform<Texture>
    u_Time: IUniform<number>
    u_Resolution: IUniform<Vector2>
  }

  constructor(params: ShaderMaterialParameters = {}) {
    super({
      ...params,
    } as ShaderMaterialParameters)

    this.uniforms = {
      u_Time: { value: 0 },
      u_Resolution: new Uniform(new Vector2(0, 0)),
    }
  }

  setBitTexture(texture: Texture) {
    this.uniforms.u_BitTexture = new Uniform(texture)
  }

  setTexture(texture: Texture) {
    this.uniforms.u_Texture = new Uniform(texture)
  }
}
