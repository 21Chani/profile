

// ##########################################
// ---------------- Varyings ----------------
// ##########################################
varying float v_RandomNess;
varying float v_Intensity; 
varying vec2  v_Uv;

// ##########################################
// ---------------- Uniforms ----------------
// ##########################################
uniform sampler2D u_SpriteTexture;  
uniform sampler2D u_Texture;
uniform float     u_SpriteCount;  
uniform float     u_Time; 

// ##########################################
// ---------------- Includes ----------------
// ##########################################
#include ../include/sprite.glsl 

// ##########################################
// --------------- Main --------------------
// ##########################################
float intensityMultiplier = 0.01; 
 
void main() { 
    // Get Sprite Texture
    float spriteX = u_Time * 0.5 + (v_RandomNess) * u_SpriteCount;
    vec4 spriteShape = sprite(gl_PointCoord, spriteX, u_SpriteTexture, u_SpriteCount);

    vec4 pattern = texture2D(u_Texture, v_Uv);
    // float rain = smoothstep(0.0, 1.0, pattern.r); // Canvas is opaque; rain data lives in RGB
    float rain = pattern.r; // Canvas is opaque; rain data lives in RGB

    // Colorfy section.
    float brightness = abs(0.2 + (v_RandomNess * 10.0) * 0.01);
    vec4 color = vec4(brightness, brightness, brightness, rain * spriteShape.a);

    gl_FragColor = color;
}