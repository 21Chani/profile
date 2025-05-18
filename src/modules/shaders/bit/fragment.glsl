
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
    float distance = length(gl_PointCoord - 0.5);

    // Calculate the current sprite to be used from the spritesheet
    vec2 uv = gl_PointCoord;
    float sprite = floor(mod(u_Time + (v_RandomNess) * 10.0, 10.0));
    uv.x = (uv.x + sprite) / 10.0;  

    vec4 cryptoTexture = texture2D(u_BitTexture, uv);
    float alpha = 0.01 / distance - 0.1;

    float intensity = sin((u_Time + v_RandomNess) * 1.0) * 0.5 ;
    cryptoTexture.rgb -= clamp(sprite / intensity, 0.0, 1.0) - sprite / 10.0;

    
    gl_FragColor = vec4(v_Color * cryptoTexture);
}