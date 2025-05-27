// ##########################################
//
// Appearance Functionality
// ------------------------
// This function can be used to create a wave-like appearance effect
// 
// Parameters:
// progress     - The progress factor, typically from 0 to 1.
// finalPos     - The final position of the object.
// initialPos   - The initial position of the object.
// factor       - A factor that influences the wave effect.
// amplitude    - The amplitude of the wave effect.
// frequency    - The frequency of the wave effect.
// ##########################################

float appearance(
    float progress, 
    float finalPos,
    float initialPos,
    float factor,
    float amplitude
    // float posA
){
    float wave = abs(sin(factor ) * amplitude);
    return mix(
        initialPos - wave, 
        finalPos,
        progress
    );
}