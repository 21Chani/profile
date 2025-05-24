
uniform sampler2D u_Texture;
uniform float u_Time;

varying vec4 v_Color;
varying vec2 v_Uv;
varying float v_RandomNess;

attribute float a_Random;
 

void main() {
   
    vec3 mPos = position;
    // mPos += waveEffect(mPos, 1.0, 1.0, 10.04) ;

    vec4 modelPosition = modelMatrix * vec4(mPos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 modelProjection = projectionMatrix * viewPosition;

    vec4 intensity = texture(u_Texture, uv);
    
    v_Uv = uv;
    v_Color = vec4(intensity);
    v_RandomNess = a_Random;

    gl_PointSize =  9.0;
    gl_Position = modelProjection;

}