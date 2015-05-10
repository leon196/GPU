
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uTimeElapsed;

uniform float uParameter1;
uniform float uParameter2;
uniform float uParameter3;

// Dat random function for glsl
float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }

// Pixelize coordinates
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }
float getLuminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

void main( void )
{
	vec2 uv = vTextureCoord;

    // Pixel Leek 1
    uv = mix(uv, vec2(rand(uv.xx)), uParameter2 * step(0.95, rand(uv.xx))); 

    // Pixel Leek 2
    uv = mix(uv, vec2(rand(uv.xx)), uParameter3 * step(0.5, rand(uv.yy))); 

	// Pixel Local 
	vec2 target = vec2(cos(uTimeElapsed) * 0.5 + 0.5, sin(uTimeElapsed) * 0.125 + 0.5);
    float area = 16.0;
    float dist = distance(pixelize(uv, 16.0), target);
    dist += 0.25;
    dist = max(0.0, min(1.0, 1.0 - dist));
    dist = dist * dist;
    float details = 4.0 + floor(dist * 12.0);
    details = pow(2.0, details);
    uv = mix(uv, pixelize(uv, details), abs(uParameter1));

    vec3 color = texture2D(uSampler, uv).rgb;
    
    gl_FragColor = vec4( color, 1.0 );
}