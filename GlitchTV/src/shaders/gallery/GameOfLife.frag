
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179
#define RADTier 2.094395102
#define RAD2Tier 4.188790205

uniform sampler2D uBuffer;
uniform sampler2D uPicture;
uniform sampler2D uVideo;

uniform vec2 uResolution;
uniform vec2 uBufferResolution;
uniform vec2 uMouse;
varying vec2 vTexCoord;

uniform float uTimeElapsed;
uniform float uInteractionEnabled;
uniform float uEnableTresholdAuto;
uniform float uSliderTreshold;
uniform float uEnableRGBOffset;
uniform float uSliderRGBOffset;

#pragma glslify: luminance = require(../utils/luminance.glsl)

void main() 
{
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	vec2 mouse = uMouse / uResolution.xy;
	mouse = (mouse - vec2(0.5)) * 2.0;
	mouse.y *= -1.0;

    vec2 p = vTexCoord - vec2(0.5);
    float angle = atan(p.y, p.x);
    float radius = length(p);

    float t = sin(uTimeElapsed) * 0.5 + 0.5;
    float t2 = sin(uTimeElapsed * 2.0) * 0.5 + 0.5;

    vec4 color = texture2D(uBuffer, vTexCoord);

    float light = luminance(color.rgb);
	float treshold = mix(uSliderTreshold, 0.3 + 0.2 * t, uEnableTresholdAuto);
   	color = mix(color, vec4(vec3(0.0), 1.0), step(treshold, light));

	vec4 video = texture2D(uVideo, uv);

	// RGB Offset
 	angle = uTimeElapsed * 10.0;
 	float size = mix(0.0, 0.01 * uSliderRGBOffset, uEnableRGBOffset);
 	video.r = texture2D(uVideo, uv + vec2(cos(angle), sin(angle)) * size).r;
 	video.g = texture2D(uVideo, uv + vec2(cos(angle + RADTier), sin(angle + RADTier)) * size).g;
 	video.b = texture2D(uVideo, uv + vec2(cos(angle + RAD2Tier), sin(angle + RAD2Tier)) * size).b;

  	float difference = distance(color.rgb, video.rgb);

	// Update buffer if color difference with video is greater than treshold
	color = mix(color, video, step(treshold, difference));

	gl_FragColor = color;
}
