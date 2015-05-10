

precision mediump float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTimeElapsed;

// Dat random function for glsl
float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }

// Pixelize coordinates
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }

// hash based 3d value noise
// function taken from [url]https://www.shadertoy.com/view/XslGRr[/url]
// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// ported from GLSL to HLSL
float hash( float n )
{
    return fract(sin(n)*43758.5453);
}
 
float noise( vec3 x )
{
    // The noise function returns a value in the range -1.0f -> 1.0f
    vec3 p = floor(x);
    vec3 f = fract(x);
    f       = f*f*(3.0-2.0*f);
    float n = p.x + p.y*57.0 + 113.0*p.z;
    return mix(mix(mix( hash(n+0.0), hash(n+1.0),f.x),
                   mix( hash(n+57.0), hash(n+58.0),f.x),f.y),
               mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                   mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
}

void main (void)
{            
      vec2 uv = vTextureCoord;
      float dist = length(uv);
      vec3 uvP = vec3(uv/* * uScale*/, uTimeElapsed * 0.1);
      float perlin;
      perlin  = 0.5000 * noise( uvP ); uvP *= 2.01;
      perlin += 0.2500 * noise( uvP ); uvP *= 2.02;
      perlin += 0.1250 * noise( uvP ); uvP *= 2.03;
      perlin += 0.0625 * noise( uvP ); uvP *= 2.04;

      float random1 = (rand(pixelize(uv + vec2(0, uTimeElapsed * 0.1), pow(2.0, 10.0)).yy) - 0.5) * 2.0;
      float random2 = (rand(pixelize(uv - vec2(0, uTimeElapsed * 0.1), pow(2.0, 7.0)).yy) - 0.5) * 2.0;
      float random3 = rand(pixelize(vec2(0, uTimeElapsed), pow(2.0, 4.0)).yy);
      float random4 = rand(pixelize(uv + vec2(0, uTimeElapsed * 0.1), pow(2.0, 10.0)).yy);

      float timing = (cos(uTimeElapsed * 0.001) * 0.5 + 0.5);
      float timingGlitch = step(random3, timing);

      vec4 texture = texture2D (uSampler, uv);

      vec2 scanlineGlitch =  vec2(random2 * random1/* * uOffsetGlitch*/, 0);// * uSliderGlitch;
      vec2 offsetRed = vec2(0.01, 0.005);// * uSliderRGB;
      vec2 offsetGreen = vec2(0, 0);// * uSliderRGB;
      vec2 offsetBlue = vec2(-0.01, 0.005);// * uSliderRGB;

      // vec4 textureGlitch1 = texture2D (uSampler, uv + vec2(random2 * random1 * uOffsetGlitch, 0) * uSliderGlitch);

      float luminance = texture.r * .2126 + texture.g * .7152 + texture.b * .0722;

      //uv += vec2(0.5, 0.5) * luminance;// * uSliderLuminance;

      uv += scanlineGlitch;

      //uv += (perlin - .5);// * uSliderPerlin;

      float textureRed = texture2D(uSampler, uv + offsetRed).r;
      float textureGreen = texture2D(uSampler, uv + offsetGreen).g;
      float textureBlue = texture2D(uSampler, uv + offsetBlue).b;
      float textureAlpha = texture2D(uSampler, uv).a;

      vec4 color = vec4(textureRed, textureGreen, textureBlue, textureAlpha);

      gl_FragColor = color;

}