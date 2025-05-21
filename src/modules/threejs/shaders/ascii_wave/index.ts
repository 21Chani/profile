import { shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import type { JSX } from "react"
import { Uniform, Vector2, type IUniform, type ShaderMaterialParameters, type Texture } from "three"
import fragment from "./ascii_wave.frag"
import vertex from "./ascii_wave.vert"

// Load the shader material
const asciiShader = shaderMaterial({}, vertex, fragment)

export class ASCIIWaveShaderMaterial extends asciiShader {
  public uniforms: {
    u_SpriteTexture?: IUniform<Texture>
    u_SpriteCount?: IUniform<number>
    u_Texture?: IUniform<Texture>
    u_Time: IUniform<number>
    u_Resolution: IUniform<Vector2>
  }

  constructor(params: ShaderMaterialParameters = {}) {
    super({
      ...params,
    } as ShaderMaterialParameters)

    // Init required uniforms
    this.uniforms = {
      u_Time: { value: 0 },
      u_Resolution: new Uniform(new Vector2(0, 0)),
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

extend({ ASCIIWaveShaderMaterial })
declare module "@react-three/fiber" {
  interface ThreeElements {
    aSCIIShaderMaterial: JSX.IntrinsicElements["shaderMaterial"]
  }
}
