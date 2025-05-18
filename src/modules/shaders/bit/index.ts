import { shaderMaterial } from "@react-three/drei"
import { Uniform, type IUniform, type ShaderMaterialParameters, type Texture } from "three"
import fragment from "./fragment.glsl"
import vertex from "./vertex.glsl"

const bitMapShader = shaderMaterial({}, vertex, fragment)

export class BitShaderMaterial extends bitMapShader {
  public uniforms: { u_BitTexture?: IUniform<Texture>; u_Texture?: IUniform<Texture>; u_Time: IUniform<number> }

  constructor(params: ShaderMaterialParameters = {}) {
    super({
      ...params,
    } as ShaderMaterialParameters)

    this.uniforms = {
      u_Time: { value: 0 },
    }
  }

  setBitTexture(texture: Texture) {
    this.uniforms.u_BitTexture = new Uniform(texture)
  }

  setTexture(texture: Texture) {
    this.uniforms.u_Texture = new Uniform(texture)
  }
}
