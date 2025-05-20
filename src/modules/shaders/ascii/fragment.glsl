
varying vec2 v_Uv;
varying vec4 v_Color;
varying float v_RandomNess;

// Uniforms 
uniform sampler2D u_Texture;
uniform float u_Time; 
// Spritesheet that contains images that will be changed with time
uniform sampler2D u_BitTexture;  

void main() { 

    vec2 uv = gl_PointCoord;
    float sprite = floor(mod(u_Time * 0.5 + (v_RandomNess) * 10.0, 10.0));
    uv.x = (uv.x + sprite) / 10.0;  
    vec4 cryptoTexture = texture2D(u_BitTexture, uv);


    vec2 wavePosition = v_Uv ; 
    wavePosition.y = mod(wavePosition.y + (u_Time  * 0.01) , 1.0);

    vec4 waveMapping = texture2D(u_Texture, wavePosition);
    float intensity =  (v_RandomNess * 0.3);  ; 
    vec4 color = vec4(vec3(1.0), 0.05 + intensity) * waveMapping * cryptoTexture;
    color.a = max(color.a, 0.0);

    gl_FragColor = vec4(color);
}