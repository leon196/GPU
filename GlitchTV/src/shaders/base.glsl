
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
#pragma glslify: applyFilter5x5 = require(../utils/filter5x5.glsl)