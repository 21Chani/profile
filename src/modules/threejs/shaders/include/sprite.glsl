// ##########################################
//
// Sprite Funcionality
// ------------------------------------------
// This function is used to render a specific sprite from a sprite sheet.
// 
// Parameters:
// uv           - The texture coordinates of the sprite. From 0 to 1.
// positionX    - The position to calculate which sprite to render.
// spriteSheet  - The sprite sheet texture.
// spriteAmount - The number of sprites in the sprite sheet.
vec4 sprite(
    in vec2 uv,
    in float positionX,
    in sampler2D spriteSheet,
    in float spriteAmount
    ) {
    // Calculate the sprite index based on the positionX and spriteAmount
    // It is importante convert it to integer to avoid floating point errors
    float sprite = floor(mod(positionX, spriteAmount));

    // Move the uv coordinates to the correct sprite
    uv.x = (uv.x + sprite) / spriteAmount;  
    
    // Render the sprite with the new positionated uv coordinates.
    return texture2D(spriteSheet, uv);
}