
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uTimeElapsed;

uniform float uParameter1;
uniform float uParameter2;

// Dat random function for glsl
float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }

// Pixelize coordinates
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

void main( void )
{
    vec2 uv = vTextureCoord;

    vec3 color = texture2D(uSampler, uv).rgb;

    float lum = luminance(color);

    uv.x = mix(uv.x, step(0.5, lum), uParameter2);

    uv += uParameter1 * 0.01 * vec2(rand(uv), rand(uv.yx));

    color = texture2D(uSampler, uv).rgb;
    
    gl_FragColor = vec4( color, 1.0 );
}