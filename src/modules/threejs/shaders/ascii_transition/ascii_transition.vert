
// ##########################################
// ---------------- Uniforms ----------------
// ##########################################
uniform sampler2D u_TextureTarget;
uniform sampler2D u_SpriteSheet;  
uniform float     u_SpriteCount;  
uniform float     u_Progress;
uniform sampler2D u_Texture;
uniform float     u_Time;

// ##########################################
// ---------------- Varyings ----------------
// ##########################################
varying float v_RandomNess;
varying vec4 v_Color;
varying vec2 v_Uv;

// ##########################################
// --------------- Attributes ---------------
// ##########################################
attribute float a_Random;
 
void main() {
    vec3 mPos = position; 

    vec3 posTarget = vec3(mPos);
    posTarget *= (a_Random) * 1.0;

    vec3 finalPos = mix(mPos, posTarget, u_Progress);

    vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 modelProjection = projectionMatrix * viewPosition;

    vec4 current = texture(u_Texture, uv);
    vec4 target = texture(u_TextureTarget, uv);

    v_Uv = uv;
    v_Color = mix(current, target, u_Progress);
    v_RandomNess = a_Random;

    gl_PointSize =  9.0;
    gl_Position = modelProjection;

}