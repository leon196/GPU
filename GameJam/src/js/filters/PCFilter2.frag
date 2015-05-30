
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
float getLuminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

void main( void )
{
	vec2 uv = vTextureCoord;

	// Pixelize
    uv = pixelize(uv, pow(2.0, 4.0 + 6.0 * (1.0 - abs(uParameter1))));

	// Leek
	float y = uv.y + 0.1 * rand(uv.xx);
	uv = mix(uv, mix(uv, vec2(uv.x, y), rand(uv.xx)), uParameter2);

    vec3 color = texture2D(uSampler, uv).rgb;
    
    gl_FragColor = vec4( color, 1.0 );
}