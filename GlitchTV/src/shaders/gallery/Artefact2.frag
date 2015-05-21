
precision mediump float;

#define PI 3.141592653
#define PI2 6.283185307
#define RADTier 2.094395102
#define RAD2Tier 4.188790205

uniform sampler2D uBuffer;
uniform sampler2D uPicture;
uniform sampler2D uVideo;

uniform vec2 uBufferResolution;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vTexCoord;

uniform float uTimeElapsed;
uniform float uEnableTresholdAuto;
uniform float uSliderTreshold;
uniform float uEnableRGBOffset;
uniform float uSliderRGBOffset;

float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }

void main() 
{
	// Pixel coordinates
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	// Mouse coordinates
	vec2 mouse = uMouse / uResolution;
	mouse.y = 1.0 - mouse.y;

    float t = sin(uTimeElapsed) * 0.5 + 0.5;

   	vec4 color = texture2D(uBuffer, vTexCoord);

   	// Displacement
   	vec2 force = vec2(0.0, 0.1 + rand(vTexCoord.xx) * rand(color.rb + color.b));
   	vec2 uvDisplaced = vTexCoord + force * 0.02;
   	uvDisplaced = mod(abs(uvDisplaced), 1.0);

   	color = texture2D(uBuffer, uvDisplaced);

   	// Video color
	vec4 video = texture2D(uVideo, uv);

	// RGB Offset
   	float angle = uTimeElapsed * 10.0;
   	float size = mix(0.0, 0.01 * uSliderRGBOffset, uEnableRGBOffset);
   	video.r = texture2D(uVideo, uv + vec2(cos(angle), sin(angle)) * size).r;
   	video.g = texture2D(uVideo, uv + vec2(cos(angle + RADTier), sin(angle + RADTier)) * size).g;
   	video.b = texture2D(uVideo, uv + vec2(cos(angle + RAD2Tier), sin(angle + RAD2Tier)) * size).b;

	float treshold = mix(uSliderTreshold, 0.3 + 0.2 * t, uEnableTresholdAuto);

	// Reinject video if colors are too much different
	color = mix(color, video, step(treshold, distance(color.rgb, video.rgb)));

	// Hop
	gl_FragColor = color;
}
