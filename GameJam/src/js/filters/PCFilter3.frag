
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uTimeElapsed;

uniform float uParameter1;
uniform float uParameter2;

// Dat random function for glsl
float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }

// Pixelize coordinates
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }
float getLuminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

// hash based 3d value noise
// function taken from https://www.shadertoy.com/view/XslGRr
// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// ported from GLSL to HLSL
float hash( float n )
{
    return fract(sin(n)*43758.5453);
}

// @iquilezles
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

void main( void )
{
	vec2 uv = vTextureCoord;

	vec2 center = uv - vec2(0.5);
	float angle = atan(center.y, center.x);
	float radius = length(center);
	float ratioAngle = (angle / PI) * 0.5 + 0.5;
	float dist = length(center);

	// Displacement from noise
	vec2 uvAngle = pixelize(vec2(uTimeElapsed * 0.1, ratioAngle), 2048.0);
	float offset = rand(uvAngle) * radius + 0.2;

	// Displaced pixel color
	vec2 p = vec2(0.5) + vec2(cos(angle), sin(angle)) * offset;

	// Apply displacement
	float displaced = step(offset, radius);
	uv = mix(uv, p, displaced * uParameter2);

    vec3 color = texture2D(uSampler, uv).rgb;

    // Perlin 
	uv += uParameter1 * noise(vec3(color) * 4.0 + vec3(0.1, 0.5, 1.0) * uTimeElapsed);
	uv = mod(uv, 1.0);

	color = texture2D(uSampler, uv).rgb;
    
    gl_FragColor = vec4( color, 1.0 );
}