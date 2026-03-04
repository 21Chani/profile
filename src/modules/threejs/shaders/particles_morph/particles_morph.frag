
void main(){

    // Get distance from center to calculate a circle
    float distanceToCenter = length(gl_PointCoord -  0.5);
    vec3 modelUv = gl_FragCoord.xyz / 2000.0 ;

    // Calculate alpha based on distance to center
    // This will add a glow effect in case additive blending is enabled
    float alpha = 0.05 / distanceToCenter - 0.1;
    
    vec3 color = vec3(0.01);
    color.rgb += modelUv.r * 2.f ;

    // Comment line below if you want glow effect
    alpha = smoothstep(0.4, 1.0, alpha);

    gl_FragColor = vec4(color, alpha);
}