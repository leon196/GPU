
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
#pragma glslify: posterize = require(../utils/posterize.glsl)
#pragma glslify: rgbOffset = require(../utils/rgbOffset.glsl)
#pragma glslify: fadeOut = require(../utils/fadeOut.glsl)
#pragma glslify: hsl2rgb = require(glsl-hsl2rgb)

#pragma glslify: forceFromAngle = require(../utils/forceFromAngle.glsl)
#pragma glslify: forceFromLight = require(../utils/forceFromLight.glsl)
#pragma glslify: applyFilter5x5 = require(../utils/filter5x5.glsl)
#pragma glslify: updateBufferWithColorDifference = require(../utils/updateBufferWithColorDifference.glsl)
#pragma glslify: updateBufferWithColorFilter = require(../utils/updateBufferWithColorFilter.glsl)

// float 

void main() 
{
  vec2 uv = videoUV(vTexCoord);
  vec2 m = mouse / screenSize;

  vec4 colorCurrent = texture2D(fbo, vTexCoord);
  vec4 colorUp = texture2D(fbo, vTexCoord - vec2(0.0, 1.0 / bufferSize.y));
  vec4 colorDown = texture2D(fbo, vTexCoord + vec2(0.0, 1.0 / bufferSize.y));
  // colorUp = posterize(colorUp, 2.0);
  // colorDown = posterize(colorDown, 2.0);

  // vec2 force = vec2(step(0.5, luminance(colorDown)), step(0.5, luminance(colorCurrent)));
  vec2 force = vec2(0.0);
  force.x = (colorCurrent.g * 2.0 - 1.0) * 0.125;
  force.y = colorCurrent.b - colorCurrent.r;
  force = normalize(force);
  force *= m.x / bufferSize.x;

  vec4 colorFbo = texture2D(fbo, vTexCoord + force);

  float angle = time * 2.0;
  float radius = mix(0.01 * sliderRGBOffset, 0.0, isAutomatic);

  vec4 colorVideo = rgbOffset(video, uv, angle, radius);
  // colorVideo = posterize(colorVideo, 2.0);

  vec4 filter = applyFilter5x5(filter5x5, video, uv, bufferSize);

  float treshold = mix(sliderTreshold, 0.3 + 0.2 * oscillation(time, 1.0), isAutomatic);

  vec4 blue1 = vec4(0.2, 0.2, 1.0, 1.0);
  vec4 blue2 = vec4(0.5, 0.5, 1.0, 1.0);

  // vec4 color = mix(colorFbo, colorVideo, luminance(colorVideo));
  // color = updateBufferWithColorDifference(color, colorVideo, treshold);
  vec4 color = updateBufferWithColorFilter(colorFbo, colorVideo, filter, 1.0);
  // color = mix(vec4(vec3(0.0), 1.0), color, step(2.0 / bufferSize.y, uv.y));

	gl_FragColor = color;
}
