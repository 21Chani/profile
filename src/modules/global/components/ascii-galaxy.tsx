import { useEffect, useRef } from "react"
import { type CanvasChannels, getCanvasChannels } from "../lib/theme-colors"

// ─── Character atlas ───
const ATLAS_CELL = 64
const ATLAS_FONT = 44
const ATLAS_PAD = 8
const ALL_CHARS = ["·", "∙", "+", "*", "#"]

// ─── Galaxy geometry ───
const GALAXY_RADIUS_FRAC = 1.2
const NUM_ARMS = 4
const SPIRAL_TURNS = 2.4
const SPIRAL_TIGHT = 0.32
const ARM_WIDTH = 1.5

// ─── Particle counts ───
const BULGE = 80
const ARM_STEPS = 150
const ARM_LAT = 6
const INTER_ARM = 350
const BG = 120
const SPINE = 300

const FLOATS_PER = 6
const TAU = Math.PI * 2

// ─── Math helpers ───

function gaussRand(): number {
  const u1 = Math.random()
  const u2 = Math.random()
  return Math.sqrt(-2 * Math.log(u1 + 0.0001)) * Math.cos(TAU * u2)
}

function spiralAngle(nd: number, ai: number): number {
  return (ai / NUM_ARMS) * TAU + SPIRAL_TURNS * TAU * Math.pow(nd, SPIRAL_TIGHT)
}

function simpleNoise(x: number): number {
  const s = Math.sin(x * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

function backboneWobble(nd: number, ai: number): number {
  const n1 = simpleNoise(nd * 4 + ai * 7.3) - 0.5
  const n2 = simpleNoise(nd * 8.7 + ai * 13.1) - 0.5
  const n3 = simpleNoise(nd * 15.3 + ai * 21.7) - 0.5
  return (n1 * 0.5 + n2 * 0.3 + n3 * 0.2) * (0.3 + 0.7 * nd)
}

function pickChar(armStrength: number): number {
  if (armStrength > 0.8) return 3 + Math.floor(Math.random() * 2)
  if (armStrength > 0.5) return 2 + Math.floor(Math.random() * 2)
  if (armStrength > 0.25) return 1 + Math.floor(Math.random() * 2)
  return Math.floor(Math.random() * 2)
}

// ─── WebGL helpers ───

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, source)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

function linkProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram | null {
  const p = gl.createProgram()
  if (!p) return null
  gl.attachShader(p, vs)
  gl.attachShader(p, fs)
  gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p))
    gl.deleteProgram(p)
    return null
  }
  return p
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sn = s / 100
  const ln = l / 100
  const c = (1 - Math.abs(2 * ln - 1)) * sn
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = ln - c / 2
  let r = 0,
    g = 0,
    b = 0
  if (h < 60) {
    r = c
    g = x
  } else if (h < 120) {
    r = x
    g = c
  } else if (h < 180) {
    g = c
    b = x
  } else if (h < 240) {
    g = x
    b = c
  } else if (h < 300) {
    r = x
    b = c
  } else {
    r = c
    b = x
  }
  return [r + m, g + m, b + m]
}

function getBgRgb(ch: CanvasChannels): [number, number, number] {
  // Canvas foreground l=100 in dark mode, l≈0 in light mode.
  // Background is the inverse: dark → hsl(0,0%,2%), light → hsl(0,0%,98%).
  const bgL = ch.l > 50 ? 2 : 98
  return hslToRgb(ch.h, ch.s, bgL)
}

// ─── Atlas ───

function createAtlas(gl: WebGLRenderingContext) {
  const count = ALL_CHARS.length
  const cellTotal = ATLAS_CELL + ATLAS_PAD
  const ac = document.createElement("canvas")
  ac.width = count * cellTotal
  ac.height = cellTotal
  const ctx = ac.getContext("2d")!
  ctx.fillStyle = "#000"
  ctx.fillRect(0, 0, ac.width, ac.height)
  ctx.font = `${ATLAS_FONT}px "Courier New","SF Mono",monospace`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = "#fff"
  for (let i = 0; i < count; i++) {
    ctx.fillText(ALL_CHARS[i], i * cellTotal + ATLAS_CELL / 2 + ATLAS_PAD / 2, cellTotal / 2)
  }
  const tex = gl.createTexture()!
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ac)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  return { tex, cellTotal, atlasWidth: ac.width, atlasHeight: ac.height }
}

// ─── Particles ───

function buildParticles(
  gl: WebGLRenderingContext,
  W: number,
  H: number,
  galaxyCX: number,
  galaxyCY: number,
  galaxyRadius: number,
) {
  const dots: number[] = []
  function addDot(a: number, d: number, as: number, b: number, ps: number, ci: number) {
    dots.push(a, d, ci, b, as, ps)
  }

  // Bulge
  const bI = galaxyRadius * 0.06
  const bO = galaxyRadius * 0.2
  const bD = Math.floor(BULGE * (galaxyRadius / 300))
  for (let i = 0; i < bD; i++) {
    const r = bI + Math.random() * (bO - bI)
    const a = Math.random() * TAU
    const nd = r / galaxyRadius
    let best = 0
    for (let ai = 0; ai < NUM_ARMS; ai++) {
      const sa = spiralAngle(nd, ai) + backboneWobble(nd, ai)
      let d = a - sa
      d -= Math.round(d / TAU) * TAU
      best = Math.max(best, Math.max(0, 1 - Math.abs(d) / 0.8))
    }
    const as = 0.3 + 0.7 * best
    addDot(a, r, as, 0.4 + Math.random() * 0.3, 22 + Math.random() * 3, pickChar(as))
  }

  // Arm scatter
  for (let ai = 0; ai < NUM_ARMS; ai++) {
    for (let s = 0; s < ARM_STEPS; s++) {
      const nd = 0.12 + (s / ARM_STEPS) * 1.03
      const dist = nd * galaxyRadius
      const sa = spiralAngle(nd, ai) + backboneWobble(nd, ai)
      const lw = ARM_WIDTH * (0.3 + 0.8 * nd)
      const lc = Math.floor(ARM_LAT * (0.5 + 0.8 * nd))
      const ef = nd > 0.85 ? Math.max(0, (1.15 - nd) / 0.3) : 1
      for (let d = 0; d < lc; d++) {
        const sc = gaussRand() * lw * 0.55
        const da = sa + sc
        const rj = gaussRand() * galaxyRadius * 0.06 * nd
        const dd = dist + rj
        if (dd < 0) continue
        const ns = Math.abs(sc) / lw
        const as = Math.max(0, 1 - ns * ns)
        const b = 0.15 + Math.random() * 0.25 + as * 0.3 * ef
        addDot(da, dd, as * ef, b, 20 + as * 4 + Math.random() * 3, pickChar(as))
      }
    }
  }

  // Inter-arm
  const iD = Math.floor(INTER_ARM * (galaxyRadius / 300))
  for (let i = 0; i < iD; i++) {
    const nd = 0.15 + Math.random() * 0.95
    const d = nd * galaxyRadius
    const a = Math.random() * TAU
    addDot(a, d, 0.1 + Math.random() * 0.15, 0.15 + Math.random() * 0.2, 18 + Math.random() * 3, pickChar(0.1))
  }

  // Background
  const bgD = Math.floor(BG * (Math.max(W, H) / 1000))
  for (let i = 0; i < bgD; i++) {
    const x = Math.random() * W
    const y = Math.random() * H
    const dx = x - galaxyCX
    const dy = y - galaxyCY
    const d = Math.sqrt(dx * dx + dy * dy)
    const a = Math.atan2(dy, dx)
    addDot(a, d, 0.08 + Math.random() * 0.1, 0.12 + Math.random() * 0.15, 18 + Math.random() * 3, pickChar(0.1))
  }

  // Spine
  for (let ai = 0; ai < NUM_ARMS; ai++) {
    for (let s = 0; s < SPINE; s++) {
      const nd = 0.1 + (s / SPINE) * 1
      const dist = nd * galaxyRadius
      const sa = spiralAngle(nd, ai) + backboneWobble(nd, ai)
      const tw = 0.18 * (0.3 + 0.7 * nd)
      const ef = nd > 0.85 ? Math.max(0, (1.1 - nd) / 0.25) : 1
      for (let d = 0; d < 4; d++) {
        const sc = gaussRand() * tw * 0.4
        const da = sa + sc
        const rj = gaussRand() * galaxyRadius * 0.018 * nd
        const dd = dist + rj
        if (dd < 0) continue
        const ns = Math.abs(sc) / tw
        const as = Math.max(0, 1 - ns * ns)
        addDot(
          da,
          dd,
          Math.min(1, as * ef + 0.3),
          0.3 + Math.random() * 0.2 + as * 0.3 * ef,
          20 + as * 3 + Math.random() * 2,
          pickChar(0.8),
        )
      }
    }
  }

  const count = dots.length / FLOATS_PER
  const vbo = gl.createBuffer()!
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dots), gl.STATIC_DRAW)
  return { vbo, count }
}

// ─── Shaders ───

const VERT_SRC = `
  attribute float a_baseAngle;
  attribute float a_dist;
  attribute float a_charIndex;
  attribute float a_baseBright;
  attribute float a_armStr;
  attribute float a_pointSize;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_center;
  uniform float u_galaxyR;
  varying float v_charIndex;
  varying float v_bright;
  varying float v_alpha;

  const float ORB_CORE = 0.02, ORB_EDGE = 0.003, CORE_F = 0.06, BULGE_F = 0.20;
  const float TILT = 0.57;
  const float ROT  = 0.3316;

  void main() {
    float nd = a_dist / u_galaxyR;
    float cl = min(nd, 2.5);
    float spd = ORB_CORE + (ORB_EDGE - ORB_CORE) * sqrt(cl / 2.5);
    float curAngle = a_baseAngle + spd * u_time;

    vec2 offset = vec2(cos(curAngle), sin(curAngle) * TILT) * a_dist;
    float cr = cos(ROT), sr = sin(ROT);
    offset = vec2(offset.x * cr - offset.y * sr, offset.x * sr + offset.y * cr);
    vec2 pos = u_center + offset;

    float arm = a_armStr, bright = a_baseBright, alpha = 0.0, pSize = a_pointSize;

    if (nd < CORE_F) {
      alpha = 0.0;
    } else if (nd < BULGE_F) {
      float f = (nd - CORE_F) / (BULGE_F - CORE_F);
      bright = 0.30 + (1.0 - f) * 0.15 + arm * 0.10;
      alpha = 0.25 * (1.0 - f * 0.4) * (0.4 + 0.6 * arm) + 0.05;
      pSize += (1.0 - f) * 0.8;
    } else if (nd <= 1.15) {
      float ef = nd > 0.85 ? (1.15 - nd) / 0.30 : 1.0;
      bright = a_baseBright * 0.15 + arm * 0.35 * ef;
      alpha = (0.06 + arm * arm * 0.18) * ef;
      if (arm > 0.85) { bright += 0.25; alpha = min(alpha + 0.10, 0.35); }
    } else {
      float hf = clamp(1.0 - (nd - 1.15) / 1.0, 0.0, 1.0);
      bright = a_baseBright * 0.25;
      alpha = 0.05 * hf;
    }

    bright = clamp(bright, 0.03, 0.35);
    alpha  = clamp(alpha,  0.0,  0.19);

    vec2 cp = (pos / u_resolution) * 2.0 - 1.0;
    cp.y = -cp.y;
    gl_Position = vec4(cp, 0.0, 1.0);
    gl_PointSize = max(1.0, pSize);
    v_charIndex = a_charIndex;
    v_bright = bright;
    v_alpha = alpha;
  }
`

const FRAG_SRC = `
  precision mediump float;
  varying float v_charIndex;
  varying float v_bright;
  varying float v_alpha;
  uniform sampler2D u_atlas;
  uniform float u_cellTotal;
  uniform vec2 u_atlasSize;
  uniform vec3 u_baseColor;
  uniform float u_alphaBoost;

  void main() {
    if (v_alpha < 0.01) discard;
    float ci = floor(v_charIndex + 0.5);
    float padHalf = (u_cellTotal - ${ATLAS_CELL}.0) * 0.5;
    float cellX = ci * u_cellTotal + padHalf;
    float cellY = padHalf;
    vec2 uv = vec2(
      (cellX + gl_PointCoord.x * ${ATLAS_CELL}.0) / u_atlasSize.x,
      (cellY + gl_PointCoord.y * ${ATLAS_CELL}.0) / u_atlasSize.y
    );
    float mask = texture2D(u_atlas, uv).r;
    if (mask < 0.1) discard;
    float alpha = min(v_alpha * u_alphaBoost * mask, 1.0);
    gl_FragColor = vec4(u_baseColor * v_bright * mask, alpha);
  }
`

// ─── Component ───

export function AsciiGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false })
    if (!gl) {
      console.warn("WebGL not available for AsciiGalaxy")
      return
    }

    // Compile & link
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC)
    if (!vs || !fs) return
    const program = linkProgram(gl, vs, fs)
    if (!program) return

    const aLoc = {
      baseAngle: gl.getAttribLocation(program, "a_baseAngle"),
      dist: gl.getAttribLocation(program, "a_dist"),
      charIndex: gl.getAttribLocation(program, "a_charIndex"),
      baseBright: gl.getAttribLocation(program, "a_baseBright"),
      armStr: gl.getAttribLocation(program, "a_armStr"),
      pointSize: gl.getAttribLocation(program, "a_pointSize"),
    }
    const uLoc = {
      time: gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution"),
      center: gl.getUniformLocation(program, "u_center"),
      galaxyR: gl.getUniformLocation(program, "u_galaxyR"),
      atlas: gl.getUniformLocation(program, "u_atlas"),
      cellTotal: gl.getUniformLocation(program, "u_cellTotal"),
      atlasSize: gl.getUniformLocation(program, "u_atlasSize"),
      baseColor: gl.getUniformLocation(program, "u_baseColor"),
      alphaBoost: gl.getUniformLocation(program, "u_alphaBoost"),
    }

    const atlas = createAtlas(gl)

    // Mutable state
    let W = 0,
      H = 0,
      galaxyCX = 0,
      galaxyCY = 0,
      galaxyRadius = 0,
      particleCount = 0,
      vbo: WebGLBuffer | null = null,
      time = 0,
      lastFrame = 0,
      rafId = 0

    // Theme
    let ch = getCanvasChannels()
    function onThemeChange() {
      ch = getCanvasChannels()
    }
    document.addEventListener("themechange", onThemeChange)

    // Visibility
    let visible = true
    const intObs = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting
      },
      { threshold: 0.05 },
    )
    intObs.observe(canvas.parentElement!)

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas!.width = W
      canvas!.height = H
      galaxyCX = W * 0.5
      galaxyCY = H * 0.5
      galaxyRadius = Math.min(W, H) * GALAXY_RADIUS_FRAC
      gl.viewport(0, 0, W, H)

      if (vbo) gl.deleteBuffer(vbo)
      const result = buildParticles(gl, W, H, galaxyCX, galaxyCY, galaxyRadius)
      vbo = result.vbo
      particleCount = result.count
    }

    function render(ts: number) {
      rafId = requestAnimationFrame(render)
      if (!visible) return

      const dt = Math.min((ts - lastFrame) / 1000, 0.05)
      lastFrame = ts
      time += dt

      const [bgR, bgG, bgB] = getBgRgb(ch)
      gl.clearColor(bgR, bgG, bgB, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)

      // Theme-derived color
      const [r, g, b] = hslToRgb(ch.h, ch.s, ch.l)
      gl.uniform3f(uLoc.baseColor, r, g, b)
      gl.uniform1f(uLoc.alphaBoost, ch.boost)

      gl.uniform1f(uLoc.time, time)
      gl.uniform2f(uLoc.resolution, W, H)
      gl.uniform2f(uLoc.center, galaxyCX, galaxyCY)
      gl.uniform1f(uLoc.galaxyR, galaxyRadius)
      gl.uniform1f(uLoc.cellTotal, atlas.cellTotal)
      gl.uniform2f(uLoc.atlasSize, atlas.atlasWidth, atlas.atlasHeight)
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, atlas.tex)
      gl.uniform1i(uLoc.atlas, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
      const stride = FLOATS_PER * 4
      gl.enableVertexAttribArray(aLoc.baseAngle)
      gl.vertexAttribPointer(aLoc.baseAngle, 1, gl.FLOAT, false, stride, 0)
      gl.enableVertexAttribArray(aLoc.dist)
      gl.vertexAttribPointer(aLoc.dist, 1, gl.FLOAT, false, stride, 4)
      gl.enableVertexAttribArray(aLoc.charIndex)
      gl.vertexAttribPointer(aLoc.charIndex, 1, gl.FLOAT, false, stride, 8)
      gl.enableVertexAttribArray(aLoc.baseBright)
      gl.vertexAttribPointer(aLoc.baseBright, 1, gl.FLOAT, false, stride, 12)
      gl.enableVertexAttribArray(aLoc.armStr)
      gl.vertexAttribPointer(aLoc.armStr, 1, gl.FLOAT, false, stride, 16)
      gl.enableVertexAttribArray(aLoc.pointSize)
      gl.vertexAttribPointer(aLoc.pointSize, 1, gl.FLOAT, false, stride, 20)

      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.disable(gl.DEPTH_TEST)
      gl.drawArrays(gl.POINTS, 0, particleCount)
    }

    const resizeObs = new ResizeObserver(resize)
    resizeObs.observe(canvas.parentElement!)

    resize()
    rafId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafId)
      intObs.disconnect()
      resizeObs.disconnect()
      document.removeEventListener("themechange", onThemeChange)
      if (vbo) gl.deleteBuffer(vbo)
      gl.deleteTexture(atlas.tex)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return (
    <div
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden max-md:hidden"
      style={{
        maskImage: "radial-gradient(ellipse 64% 60% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 64% 60% at 50% 50%, black 30%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none " />
    </div>
  )
}
