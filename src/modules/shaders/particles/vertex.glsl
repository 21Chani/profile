
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
    return vec3(
        position.x + randomnessFactor * sin(u_Time * a_Random) * 0.1,
        position.y,
        position.z + randomnessFactor * cos(u_Time * a_Random) * 0.1
    );
}

void main(){
    float randomnessFactor = min(1.f, u_Time ) * a_Random;
    
    vec3 modelPos = randomizedPosition(position, randomnessFactor); 
    vec3 randomizedTarget = randomizedPosition(a_Target, randomnessFactor);
 
    vec3 finalPos = mix(modelPos, randomizedTarget, u_Progress);
    
    vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_PointSize = 30.0;
    gl_Position = projectionPosition;
}