
void main(){

    float distanceToCenter = length(gl_PointCoord -  0.5);
    vec3 modelUv = gl_FragCoord.xyz / 600.0 ;

    float alpha = 0.05 / distanceToCenter - 0.1;
    vec3 color = vec3(0.5, 0, 0);
    color.g += modelUv.r ;

    gl_FragColor = vec4(modelUv, alpha);
}