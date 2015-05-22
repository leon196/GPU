
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179
#define RADTier 2.094395102
#define RAD2Tier 4.188790205

uniform sampler2D uBuffer;
uniform sampler2D uVideo;

uniform vec2 uBufferResolution;
varying vec2 vTexCoord;

uniform float uTimeElapsed;
uniform float uInteractionEnabled;
uniform float uEnableTresholdAuto;
uniform float uSliderTreshold;
uniform float uEnableRGBOffset;
uniform float uSliderRGBOffset;

uniform float uLaplacianFilter5x5[25];
uniform float uLaplacianFilter9x9[81];
uniform float uBlurFilter5x5[25];

#pragma glslify: rand                             = require(../utils/rand.glsl)
#pragma glslify: luminance                        = require(../utils/luminance.glsl)
#pragma glslify: forceFromAngle                   = require(../utils/forceFromAngle.glsl)
#pragma glslify: videoUV                          = require(../utils/videoUV.glsl)
#pragma glslify: wrapUV                           = require(../utils/wrapUV.glsl)
#pragma glslify: rgbOffset                        = require(../utils/rgbOffset.glsl)
#pragma glslify: filter5x5                        = require(../utils/filter5x5.glsl)
#pragma glslify: fadeOut                          = require(../utils/fadeOut.glsl)
#pragma glslify: updateBufferWithColorDifference  = require(../utils/updateBufferWithColorDifference.glsl)
#pragma glslify: updateBufferWithColorFilter      = require(../utils/updateBufferWithColorFilter.glsl)

void main() 
{
  vec2 uv = videoUV(vTexCoord);

  vec2 force = forceFromAngle(rand(uv) * PI2 + uTimeElapsed) - vec2(0.0, 2.0);
  force *= 1.0 / uBufferResolution.x;

  vec2 uvDisplaced = wrapUV(vTexCoord + force);
  vec4 color = texture2D(uBuffer, uvDisplaced);

  float angle = uTimeElapsed * 10.0;
  float radius = mix(0.0, 0.01 * uSliderRGBOffset, uEnableRGBOffset);
  
  vec4 video = rgbOffset(uVideo, uv, angle, radius);
  
  float treshold = mix(uSliderTreshold, 0.5, uEnableTresholdAuto);
  vec4 filter = filter5x5(uLaplacianFilter5x5, uVideo, uv, uBufferResolution);
  color = updateBufferWithColorFilter(fadeOut(color, 0.95), video, filter, treshold);

  gl_FragColor = color;
}
