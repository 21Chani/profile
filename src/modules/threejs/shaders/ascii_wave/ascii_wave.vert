
// ##########################################
// ---------------- Uniforms ----------------
// ##########################################
uniform sampler2D   u_Texture;
uniform vec2        u_Resolution;
uniform float       u_Scroll;
uniform float       u_Time;

// ##########################################
// ---------------- Varyings ----------------
// ##########################################
varying float   v_RandomNess; 
varying vec4    v_Color;
varying vec2    v_Uv;

// ##########################################
// --------------- Attributes ---------------
// ##########################################
attribute float a_Random;

void main() {   
    // Z axis wave effect
    vec3 mPos = position;  
    mPos.z += cos(( position.y + u_Time / 4.0) + a_Random * 2.0) * 0.4;

    // Apply model matrix
    vec4 modelPosition = modelMatrix * vec4(mPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 modelProjection = projectionMatrix * viewPosition;
 
    // Apply varyings
    v_Uv = uv; 
    v_RandomNess = a_Random; 

    // Particle Size
    float size = 10.0;
    float perspective = size * u_Resolution.y;
    gl_PointSize = perspective * (1.0 / -viewPosition.z);

    gl_Position = modelProjection;

}