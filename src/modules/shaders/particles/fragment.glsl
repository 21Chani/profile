
void main(){

    float distanceToCenter = length(gl_PointCoord -  0.5);
    vec3 modelUv = gl_FragCoord.xyz / 600.0 ;

    float alpha = 0.05 / distanceToCenter - 0.1;
    vec3 color = vec3(0, 0, 0.3);
    color.rgb += modelUv.r * 0.5 ;

    gl_FragColor = vec4(color, alpha);
}