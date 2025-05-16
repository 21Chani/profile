
void main(){

    float distanceToCenter = length(gl_PointCoord -  0.5);
    vec3 modelUv = gl_FragCoord.xyz / 2000.0 ;

    // if (distanceToCenter > 0.1) {
    //     discard;
    // }

    float alpha = 0.05 / distanceToCenter - 0.1;
    vec3 color = vec3(0.01, 0.01, 0.01);
    color.rgb += modelUv.r * 2.f ;

    // alpha = smoothstep(0.2, 1.0, alpha);

    gl_FragColor = vec4(color, alpha);
}