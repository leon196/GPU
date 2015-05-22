
precision mediump float;

#define PI2 6.283185307179

uniform sampler2D uBuffer;
uniform sampler2D uVideo;

uniform vec2 uBufferResolution;
varying vec2 vTexCoord;

uniform float uTimeElapsed;
uniform float uEnableTresholdAuto;
uniform float uSliderTreshold;
uniform float uEnableRGBOffset;
uniform float uSliderRGBOffset;

uniform float uLaplacianFilter5x5[25];

#pragma glslify: rand                             = require(../utils/rand.glsl)
#pragma glslify: luminance                        = require(../utils/luminance.glsl)
#pragma glslify: forceFromAngle                   = require(../utils/forceFromAngle.glsl)
#pragma glslify: videoUV                          = require(../utils/videoUV.glsl)
#pragma glslify: wrapUV                           = require(../utils/wrapUV.glsl)
#pragma glslify: rgbOffset                        = require(../utils/rgbOffset.glsl)
#pragma glslify: filter5x5                        = require(../utils/filter5x5.glsl)
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
  
  vec4 filter = filter5x5(uLaplacianFilter5x5, uVideo, uv, uBufferResolution);

  float treshold = mix(uSliderTreshold, 0.5, uEnableTresholdAuto);
  color = updateBufferWithColorDifference(color, video, treshold);
  color = updateBufferWithColorFilter(color, video, filter, treshold);

  gl_FragColor = color;
}
