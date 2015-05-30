
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
uniform float uParameter4;

// Dat random function for glsl
float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }

// Pixelize coordinates
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }
float getLuminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

void main( void )
{
	vec2 uv = vTextureCoord;

	vec2 p = uv - vec2(0.5);
	float angle = atan(p.y, p.x);
	float radius = length(p);

	// Blur
	float blurScale = 0.01 * uParameter1;
	vec3 color = texture2D( uSampler, uv ).rgb * 0.6;
	color += texture2D( uSampler, uv + vec2(blurScale, blurScale) ).rgb * 0.1;
	color += texture2D( uSampler, uv + vec2(blurScale, -blurScale) ).rgb * 0.1;
	color += texture2D( uSampler, uv + vec2(-blurScale, blurScale) ).rgb * 0.1;
	color += texture2D( uSampler, uv + vec2(-blurScale, -blurScale) ).rgb * 0.1;

	// Saturation
	float luminance = getLuminance(color);
	color = mix(color, vec3(luminance), abs(uParameter2));

	// Noise
	color = mix(color, mix(color, vec3(rand(uv), rand(vec2(angle)), rand(vec2(radius))), 0.5), abs(uParameter3));

	// Exposure
	color -= abs(uParameter4) * 0.5;
    
    gl_FragColor = vec4( color, 1.0 );
}