precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D fbo;
uniform sampler2D video;

uniform float isBlurEnabled;

// UVs
#pragma glslify: videoUV = require(./utils/videoUV.glsl)
#pragma glslify: wrapUV = require(./utils/wrapUV.glsl)
#pragma glslify: pixelize = require(./utils/pixelize.glsl)

// Filter
uniform vec2 bufferSize;
uniform float filter5x5[25];
#pragma glslify: applyFilter5x5 = require(./utils/filter5x5.glsl)
#pragma glslify: updateBufferWithColorFilter = require(./utils/updateBufferWithColorFilter.glsl)

void main() 
{
	vec2 uv = vTexCoord;
	vec2 uvVideo = videoUV(uv);

	vec4 colorVideo = texture2D(video, uvVideo);
  	vec4 colorFbo = mix(texture2D(fbo, uv), applyFilter5x5(filter5x5, fbo, uv, bufferSize), isBlurEnabled);

	gl_FragColor = vec4(mix(colorVideo.rgb, colorFbo.rgb, colorFbo.a), 1.0);
}
