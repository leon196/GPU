
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

#pragma glslify: forceFromAngle = require(../utils/forceFromAngle.glsl)
#pragma glslify: forceFromLight = require(../utils/forceFromLight.glsl)
#pragma glslify: applyFilter5x5 = require(../utils/filter5x5.glsl)
#pragma glslify: updateBufferWithColorDifference = require(../utils/updateBufferWithColorDifference.glsl)
#pragma glslify: updateBufferWithColorFilter = require(../utils/updateBufferWithColorFilter.glsl)

void main() 
{
  vec2 uv = videoUV(vTexCoord);

  vec4 colorFbo = texture2D(fbo, vTexCoord);

  vec2 force = vec2(0.0);//forceFromAngle(random(uv) * PI2 + time) * colorFbo.r - vec2(0.0, 1.0);
  force *= 2.0 / bufferSize.x;

  colorFbo = texture2D(fbo, wrapUV(vTexCoord + force));

  float angle = time * 10.0;
  float radius = mix(0.0, 0.01 * sliderRGBOffset, isAutomatic);

  vec4 colorVideo = rgbOffset(video, uv, angle, radius);

  vec4 filter = applyFilter5x5(filter5x5, video, uv, bufferSize);

  float treshold = mix(sliderTreshold, 0.3 + 0.2 * oscillation(time, 1.0), isAutomatic);

  vec4 color = updateBufferWithColorFilter(colorFbo * vec4(0.95, 1.1, 1.0, 1.0), vec4(1.0, 0.2, 0.0, 1.0), filter, 1.0);
  color = updateBufferWithColorDifference(colorVideo, color, 1.0 - treshold);

	gl_FragColor = vec4(color.rgb, color.r);
}
