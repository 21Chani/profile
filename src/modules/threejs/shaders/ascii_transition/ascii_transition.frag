
// ##########################################
// ---------------- Varyings ----------------
// ##########################################
varying float   v_RandomNess;
varying vec4    v_Color;
varying vec2    v_Uv;

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
// ---------------- Includes ----------------
// ##########################################
#include ../include/sprite.glsl 


void main() {
    // Get Sprite Texture
    float spriteX = u_Time * 0.2 + (v_RandomNess) * 10.0;
    vec4 spriteShape = sprite(gl_PointCoord, spriteX, u_SpriteSheet, 10.0);
       
    vec4 color = vec4(v_Color * spriteShape);   
    color.rgb += v_RandomNess * 0.5;
    color.a = smoothstep(0.2, 1.0, color.a); 
     
    gl_FragColor = color;
}