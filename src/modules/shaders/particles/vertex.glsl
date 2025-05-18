
// ########################
// Uniforms
// ########################
uniform float u_Time;
uniform float u_Progress;

// ########################
// Attributes
// ########################
attribute float a_Random;
attribute vec3 a_Target;


vec3 randomizedPosition(vec3 position, float randomnessFactor) {
    // zGlitch will create a flickering effect
    float zGlitch = tan(u_Time * 2.0 ) * 0.01;
    float direction = normalize(vec3(zGlitch)).z; 
    zGlitch = step(0.9 , min(abs(zGlitch), 2.0)) * direction;

    return vec3(
        position.x + randomnessFactor * sin(u_Time * 80.0 * a_Random) * 0.03,
        position.y + randomnessFactor * cos(u_Time * 80.0 * a_Random) * 0.03,
        position.z + clamp(randomnessFactor * tan( 30.0 * a_Random) * 0.03, -0.1, 0.1) + zGlitch 
    );
}

void main(){ 
    // Manipulate position between model and target
    // It is necessary to make it before the modelMatrix multiplication
    // Otherwise the modelMatrix will not be applied to the randomized position
    vec3 modelPos = randomizedPosition(position, 0.2); 
    vec3 randomizedTarget = randomizedPosition(a_Target, 0.2);
 
    // Interpolate between model position and target position
    vec3 finalPos = mix(modelPos, randomizedTarget, u_Progress);
    
    vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_PointSize = 30.0 + abs(a_Random) * 100.0;
    gl_Position = projectionPosition;
}