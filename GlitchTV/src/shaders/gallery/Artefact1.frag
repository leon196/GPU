
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

vec2 forceFromNeighborhood (vec2 p, sampler2D map) 
{ 
	float s = 1.0 / uBufferResolution.x;
	vec2 n = vec2(0.0);
	float l = luminance(texture2D(map, p).rgb);

	n.x += luminance(texture2D(map, p - vec2(s, 0.0)).rgb) - l;
	n.x += l - luminance(texture2D(map, p + vec2(s, 0.0)).rgb);
	n.y += luminance(texture2D(map, p - vec2(0.0, s)).rgb) - l;
	n.y += l - luminance(texture2D(map, p + vec2(0.0, s)).rgb);

	return n;
}

void main() 
{
	// Pixel coordinates
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	// Mouse coordinates
	vec2 m = uMouse / uResolution;
	m.y = 1.0 - m.y;

    float t = sin(uTimeElapsed * 0.001) * 0.5 + 0.5;

   	// Displacement
   	vec2 force = forceFromNeighborhood(pixelize(uv, 32.0), uVideo);
   	vec2 uvDisplaced = vTexCoord - normalize(force) * 0.002;
   	uvDisplaced = mod(abs(uvDisplaced), 1.0);

   	// RGB Offset
   	vec4 color = texture2D(uBuffer, uvDisplaced);

   	// Video color
	vec4 video = texture2D(uVideo, uv);

	// RGB Offset
   	float angle = uTimeElapsed * 0.01;
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
