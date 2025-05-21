import { AdditiveBlending, Uniform, type ShaderMaterialParameters } from "three"
import fragmentShader from "./fragment.glsl"
import vertexShader from "./vertex.glsl"

import { shaderMaterial } from "@react-three/drei"

type Uniforms = {
  u_Time: Uniform<number>
  u_Progress: Uniform<number>
}

export const particlesMaterial = shaderMaterial({ u_Time: 0, u_Progress: 0 }, vertexShader, fragmentShader)

export class MovingParticlesShader extends particlesMaterial {
  public uniforms: Uniforms = { u_Time: new Uniform(0), u_Progress: new Uniform(0) }

  constructor(props: ShaderMaterialParameters = {}) {
    super({
      depthWrite: false,
      // transparent: true,
      blending: AdditiveBlending,
      ...props,
    })
  }
}
