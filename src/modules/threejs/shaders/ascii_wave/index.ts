import { shaderMaterial } from "@react-three/drei"
import { NearestFilter, Uniform, Vector2, type IUniform, type ShaderMaterialParameters, type Texture } from "three"
import fragment from "./ascii_wave.frag"
import vertex from "./ascii_wave.vert"

// Load the shader material
const asciiShader = shaderMaterial({}, vertex, fragment)

/**
 * Ascii Wave Generator Shaders.
 * It performs a re
 */
export class ASCIIWaveShaderMaterial extends asciiShader {
  public static readonly DEFAULT_PARTICLE_SIZE = 9.0
  public static readonly DEFAULT_WAVE_SPREAD = 2.0
  public static readonly DEFAULT_WAVE_LENGTH = 0.8
  public static readonly DEFAULT_SPEED = 0.2

  // Define uniforms type.
  public uniforms: {
    /**
     * Sprite texture to be rendered on each particle.
     */
    u_SpriteTexture?: IUniform<Texture>
    /**
     * Texture pattern to be followed by the waves.
     * It is importante to be in black and white channels.
     */
    u_Texture?: IUniform<Texture>
    /**
     * Factor that defines how fast waves will move.
     */
    u_Speed: IUniform<number>
    /**
     * Factor that define if the effect will look very like a wave vertically (flag effect), or just a caos.
     */
    u_WaveSpread: IUniform<number>
    /**
     * Factor that define how long will be the
     */
    u_WaveLength: IUniform<number>

    // Vectors
    u_Resolution: IUniform<Vector2>

    // Float/Numbers
    u_SpriteCount?: IUniform<number>
    u_Size: IUniform<number>
    u_Time: IUniform<number>
  }

  constructor(params: ShaderMaterialParameters = {}) {
    super({ transparent: true, depthWrite: false, ...params } satisfies ShaderMaterialParameters)

    // Init required uniforms
    this.uniforms = {
      // Initialization required.
      u_Time: { value: 0 },
      u_Resolution: new Uniform(new Vector2(0, 0)),

      // Default Values
      u_Speed: new Uniform(ASCIIWaveShaderMaterial.DEFAULT_SPEED),
      u_Size: new Uniform(ASCIIWaveShaderMaterial.DEFAULT_PARTICLE_SIZE),
      u_WaveLength: new Uniform(ASCIIWaveShaderMaterial.DEFAULT_WAVE_LENGTH),
      u_WaveSpread: new Uniform(ASCIIWaveShaderMaterial.DEFAULT_WAVE_SPREAD),
    }
  }

  // #########################################
  // ---------------- Setters ----------------
  // #########################################

  setSpriteTexture(texture: Texture) {
    texture.minFilter = NearestFilter
    texture.magFilter = NearestFilter
    texture.generateMipmaps = false

    this.uniforms.u_SpriteTexture = new Uniform(texture)
  }

  setTexture(texture: Texture) {
    this.uniforms.u_Texture = new Uniform(texture)
  }

  setResolution(width: number, height: number) {
    this.uniforms.u_Resolution.value.set(width, height)
  }
}
