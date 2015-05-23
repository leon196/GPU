
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179
#define RADTier 2.094395102
#define RAD2Tier 4.188790205

varying vec2 vTexCoord;

uniform sampler2D picture;
uniform sampler2D video;
uniform sampler2D fbo;

uniform vec2 bufferSize;
uniform vec2 screenSize;
uniform vec2 mouse;

uniform float time;
uniform float isInteractive;
uniform float isAutomatic;

uniform float sliderTreshold;
uniform float sliderRGBOffset;

uniform float filter5x5[25];
uniform float filter9x9[81];

// Utils
#pragma glslify: random = require(glsl-random)
#pragma glslify: oscillation = require(../utils/oscillation.glsl)

// UVs
#pragma glslify: videoUV = require(../utils/videoUV.glsl)
#pragma glslify: wrapUV = require(../utils/wrapUV.glsl)
#pragma glslify: pixelize = require(../utils/pixelize.glsl)

// Color
#pragma glslify: luminance = require(glsl-luma)
#pragma glslify: posterize = require(../utils/pixelize.glsl)
#pragma glslify: rgbOffset = require(../utils/rgbOffset.glsl)
#pragma glslify: fadeOut = require(../utils/fadeOut.glsl)
#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

void main() 
{
	vec2 uv = vTexCoord;
	vec2 uvVideo = videoUV(vTexCoord);

    vec2 p = uv - vec2(0.5);
    float angle = atan(p.y, p.x);
    float radius = length(p);

    float t = sin(time) * 0.5 + 0.5;
    float t2 = sin(time * 2.0) * 0.5 + 0.5;

    vec4 colorFbo = texture2D(fbo, uv);

   	// Displacement
   	angle = luminance(colorFbo.rgb) * PI2;
   	vec2 force = vec2(cos(angle), sin(angle)) * 0.004;
   	vec2 uvDisplaced = uv + force;
   	uvDisplaced = mod(abs(uvDisplaced), 1.0);

	colorFbo = texture2D(fbo, uvDisplaced);

	vec4 colorVideo = texture2D(video, uvVideo);

	// RGB Offset
 	angle = time * 10.0;
 	float size = mix(0.01 * sliderRGBOffset, 0.005 * t2, isAutomatic);

 	colorVideo.r = texture2D(video, uvVideo + vec2(cos(angle), sin(angle)) * size).r;
 	colorVideo.g = texture2D(video, uvVideo + vec2(cos(angle + RADTier), sin(angle + RADTier)) * size).g;
 	colorVideo.b = texture2D(video, uvVideo + vec2(cos(angle + RAD2Tier), sin(angle + RAD2Tier)) * size).b;

	float treshold = mix(sliderTreshold, 0.3 + 0.2 * t, isAutomatic);
  	float difference = distance(colorFbo.rgb, colorVideo.rgb);

	// Update buffer if color difference with video is greater than treshold
	vec4 color = mix(colorFbo, colorVideo, step(treshold, difference));

	gl_FragColor = color;
}
