
uniform float u_Time;

attribute float a_Random;

void main(){

    vec3 modelPos = position;

    modelPos.x += a_Random *   sin(u_Time * a_Random ) * 0.1;
    modelPos.z += a_Random *  cos(u_Time  * a_Random) * 0.1;
    
    vec4 modelPosition = modelMatrix * vec4(modelPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_PointSize = 30.0;
    gl_Position = projectionPosition;
}