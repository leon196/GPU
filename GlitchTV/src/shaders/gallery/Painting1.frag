
// inspired by http://glslsandbox.com/e#25072.0

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

#pragma glslify: forceFromAngle                   = require(../utils/forceFromAngle.glsl)
#pragma glslify: updateBufferWithColorDifference  = require(../utils/updateBufferWithColorDifference.glsl)
#pragma glslify: updateBufferWithColorFilter      = require(../utils/updateBufferWithColorFilter.glsl)
#pragma glslify: applyFilter5x5                   = require(../utils/filter5x5.glsl)

void main() 
{

	// Pixel coordinates
	vec2 uv = vTexCoord;
	vec2 uvVideo = videoUV(vTexCoord);

	vec2 m = mouse / screenSize;
	m -= vec2(0.5);
	m.y *= -1.0;

    vec2 p = vTexCoord - vec2(0.5);
    float angle = atan(p.y, p.x);
    float dist = length(p);

   	// Displacement
   	vec2 force = vec2(cos(angle), sin(angle)) * (dist - 0.002 - 0.002 * oscillation(time, 1.0));
   	angle = random(p) * PI2;
   	force += vec2(cos(angle), sin(angle)) * 0.001;
   	vec2 uvDisplaced = vec2(0.5) + force - m * 0.01 * isInteractive;
   	uvDisplaced = mod(abs(uvDisplaced), 1.0);

	vec4 colorFbo = texture2D(fbo, uvDisplaced);


	angle = time * 10.0;
	float radius = mix(0.01 * sliderRGBOffset, 0.005 * oscillation(time, 2.0), isAutomatic);

	vec4 colorVideo = rgbOffset(video, uvVideo, angle, radius);

	colorFbo = mix(colorFbo, colorVideo, step(dist, 2.0 / screenSize.x));

	float treshold = mix(sliderTreshold, 0.3 + 0.2 * oscillation(time, 1.0), isAutomatic);
  	vec4 filter = applyFilter5x5(filter5x5, video, uv, bufferSize);

  	vec4 color = updateBufferWithColorFilter(colorFbo, colorVideo, filter, treshold);
	color = updateBufferWithColorDifference(color, colorVideo, treshold);

	gl_FragColor = color;
}
