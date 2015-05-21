
// inspired by http://glslsandbox.com/e#25072.0

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

uniform float uLaplacianFilter5x5[25];
uniform float uLaplacianFilter9x9[81];

float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }


// From Anton Roy -> https://www.shadertoy.com/view/Xs23DG
vec4 laplacian5x5 (sampler2D bitmap, vec2 uv, float range, float treshold)
{
  vec4 color = vec4(0.);
  for (int i = 0; i < 5; ++i)
    for (int j = 0; j < 5; ++j) 
      color += uLaplacianFilter5x5[i * 5 + j] * texture2D(bitmap, uv + vec2(i - 2, j - 2) / range);
  if(luminance(color.rgb) < treshold)
    color = vec4(0.);
  return color;
}
vec4 laplacian9x9 (sampler2D bitmap, vec2 uv, float range, float treshold)
{
  vec4 color = vec4(0.);
  for (int i = 0; i < 9; ++i)
    for (int j = 0; j < 9; ++j) 
      color += uLaplacianFilter9x9[i * 9 + j] * texture2D(bitmap, uv + vec2(i - 4, j - 4) / range);
  if(luminance(color.rgb) < treshold)
    color = vec4(0.);
  return color;
}

void main() 
{
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  vec2 mouse = uMouse / uResolution.xy;
  mouse = (mouse - vec2(0.5)) * 2.0;
  mouse.y *= -1.0;

  float t = sin(uTimeElapsed * 0.1) * 0.5 + 0.5;

  float angle = rand(uv) * PI2 + uTimeElapsed;
  vec2 force = vec2(cos(angle), sin(angle)) - vec2(0.0, 2.0);
  force *= 1.0 / uBufferResolution.x;

  vec2 uvDisplaced = vTexCoord + force;
  uvDisplaced = mod(abs(uvDisplaced), 1.0);

  vec4 color = texture2D(uBuffer, uvDisplaced);
  vec4 video = texture2D(uVideo, uv);

  // RGB Offset
  angle = uTimeElapsed * 10.0;
  float size = mix(0.0, 0.01 * uSliderRGBOffset, uEnableRGBOffset);
  video.r = texture2D(uVideo, uv + vec2(cos(angle), sin(angle)) * size).r;
  video.g = texture2D(uVideo, uv + vec2(cos(angle + RADTier), sin(angle + RADTier)) * size).g;
  video.b = texture2D(uVideo, uv + vec2(cos(angle + RAD2Tier), sin(angle + RAD2Tier)) * size).b;

  float treshold = mix(uSliderTreshold, 0.5, uEnableTresholdAuto);

  // float difference = distance(color.rgb, video.rgb);

  // color = mix(color * vec4(vec3(0.95),1.0), video, step(treshold, difference));

  float difference = luminance(laplacian5x5(uVideo, uv, 512.0, treshold).rgb);
  
  // Update buffer if color difference with video is greater than treshold
  color = mix(color * vec4(vec3(0.95),1.0), video, step(treshold, difference));

  gl_FragColor = color;
}
