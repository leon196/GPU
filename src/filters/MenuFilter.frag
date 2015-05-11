

precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

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

      // Scanline
      float random1 = rand(pixelize(uv - vec2(0, uTimeElapsed * 0.01), pow(2.0, 10.0)).yy);
      float random2 = rand(pixelize(uv + vec2(0, uTimeElapsed * 0.01), pow(2.0, 6.0)).yy) * 0.00125 * random1;
      uv += random2;

      // RGB 
      float rgbScale = 0.001;
      vec3 rgbAngle = vec3(uTimeElapsed, uTimeElapsed + PI2 / 3.0, uTimeElapsed + PI2 * 2.0 / 3.0);
      vec2 uvR = uv + rgbScale * vec2(cos(rgbAngle.r), sin(rgbAngle.r));
      vec2 uvG = uv + rgbScale * vec2(cos(rgbAngle.g), sin(rgbAngle.g));
      vec2 uvB = uv + rgbScale * vec2(cos(rgbAngle.b), sin(rgbAngle.b));
      float red = texture2D(uSampler, mod(uvR, 1.0)).r;
      float green = texture2D(uSampler, mod(uvG, 1.0)).g;
      float blue = texture2D(uSampler, mod(uvB, 1.0)).b;
      float alpha = texture2D(uSampler, mod(uv, 1.0)).a;

      gl_FragColor = vec4(red, green, blue, alpha);

}