
// ##########################################
// ---------------- Uniforms ----------------
// ##########################################
uniform sampler2D   u_Texture;
uniform float       u_Time;
uniform float       u_Progress;

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

// ##########################################
// ---------------- Includes ----------------
// ##########################################
#include "../include/appearance.glsl"

void main() {
    
    // Animated position based on the progress.
    float randomFactor = a_Random * 10.0;
    vec3 modifiedPosition = position; 
    modifiedPosition.y = appearance(
        u_Progress,                 // Progress factor
        position.y,                 // Final position 
        -5.0 - abs(randomFactor),   // Initial position
        position.x * 10.0,          // Factor for wave effect    
        -randomFactor * 10.0        // Aplitude of the wave
    );

    // Default shader projection
    vec4 modelPosition = modelMatrix * vec4(modifiedPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 modelProjection = projectionMatrix * viewPosition;

    // Apply Varyings 
    vec4 intensity = texture(u_Texture, uv);
    intensity.a *= u_Progress; // Smoothly add opacity based on the progress

    v_Uv = uv;
    v_Color = vec4(intensity);
    v_RandomNess = a_Random;

    // Final rendering position
    gl_PointSize =  9.0;
    gl_Position = modelProjection;

}