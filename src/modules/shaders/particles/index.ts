import {
  AdditiveBlending,
  ShaderMaterial,
  type ShaderMaterialParameters,
} from "three";
import fragmentShader from "./fragment.glsl";
import vertexShader from "./vertex.glsl";

import { shaderMaterial } from "@react-three/drei";

type Uniforms = {
  u_Time: number;
};

export const particlesMaterial = shaderMaterial<
  Uniforms,
  ShaderMaterial & Uniforms
>({ u_Time: 1 }, vertexShader, fragmentShader);

export class MovingParticlesShader extends particlesMaterial {
  constructor(props: ShaderMaterialParameters = {}) {
    super({
      depthWrite: false,
      blending: AdditiveBlending,
      ...props,
    });
  }
}
