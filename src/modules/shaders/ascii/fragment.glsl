
varying vec2 v_Uv;
varying vec4 v_Color;
varying float v_RandomNess;

// Uniforms

uniform sampler2D u_Texture;
uniform float u_Time; 
// Spritesheet that contains images that will be changed with time
uniform sampler2D u_BitTexture; 
// TODO: add a uniform to control the amount of sprites in the spritesheet
// Right now it is hardcoded to 10 sprites since has been designed for numeric changing

void main() {
    // float distance = length(gl_PointCoord - 0.5);

    vec2 uv = gl_PointCoord;
    float sprite = floor(mod(u_Time / 20.0 + (v_RandomNess) * 10.0, 10.0));
    uv.x = (uv.x + sprite) / 10.0;  
    vec4 cryptoTexture = texture2D(u_BitTexture, uv);


    vec2 wavePosition = v_Uv ; 
    wavePosition.y = mod(wavePosition.y + (u_Time * 0.01), 1.0);


    vec4 waveMapping = texture2D(u_Texture, wavePosition);
 
    float intensity =  (v_RandomNess * 0.3);  ; 

    vec4 color = vec4(vec3(1.0), 0.05 + intensity) * waveMapping * cryptoTexture;

    color.a = max(color.a, 0.0);

    
    gl_FragColor = vec4(color);
}