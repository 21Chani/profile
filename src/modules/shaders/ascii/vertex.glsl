
uniform sampler2D u_Texture;
uniform float u_Time;

varying vec4 v_Color;
varying vec2 v_Uv;
varying float v_RandomNess;

attribute float a_Random;

void main() {
   
    vec3 mPos = position; 
    float xDistortion =  cos(u_Time * 0.02 + position.y * 2.0 + (a_Random * 1.0)) * 0.2;
    mPos.x += xDistortion;

    mPos.z += cos( position.y + u_Time / 4.0 + v_RandomNess * 100.2) * 0.2;


    vec4 modelPosition = modelMatrix * vec4(mPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 modelProjection = projectionMatrix * viewPosition;

    // vec4 intensity = texture(u_Texture, uv);
    
    v_Uv = uv;
    // v_Color = vec4(intensity);
    v_RandomNess = a_Random;

    gl_PointSize = 10.0;
    gl_Position = modelProjection;

}