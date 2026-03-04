

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

    // Generate an infinite loop on the Y axis 
    vec2 patternPosition = vec2(v_Uv.x, mod(v_Uv.y + (u_Time  * 0.01), 1.0));
    vec4 pattern = texture2D(u_Texture, patternPosition);
 
    // Colorfy section.
    vec4 color = vec4(abs(0.1 + (v_RandomNess * 10.0) * 0.01)); 
    color.a *= pattern.a * spriteShape.a; // Paint only on pattern and paint the sprite shape

    gl_FragColor = vec4(color );
}