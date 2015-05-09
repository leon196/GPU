
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTimeElapsed;

uniform float uParameter1;
uniform float uParameter2;
uniform float uParameter3;
uniform float uParameter4;
uniform float uParameter5;
uniform float uParameter6;

// Dat random function for glsl
float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }

// Pixelize coordinates
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

void main( void )
{
	vec2 uv = vTextureCoord;

	// Wave
	uv.x += 0.05 * sin(40.0 * uv.y) * uParameter1;

	// Noise X
	uv.x += 0.05 * rand(pixelize(uv.yy, 32.0)) * uParameter3;

	// Noise Y
	uv.y += 0.05 * rand(uv.xx) * uParameter4;

	// RGB 
	float rgbScale = 0.1 * uParameter2;
	vec3 rgbAngle = vec3(uTimeElapsed, uTimeElapsed + PI2 / 3.0, uTimeElapsed + PI2 * 2.0 / 3.0);
	vec2 uvR = uv + rgbScale * vec2(cos(rgbAngle.r), sin(rgbAngle.r));
	vec2 uvG = uv + rgbScale * vec2(cos(rgbAngle.g), sin(rgbAngle.g));
	vec2 uvB = uv + rgbScale * vec2(cos(rgbAngle.b), sin(rgbAngle.b));

    float red = texture2D(uSampler, uvR).r;
    float green = texture2D(uSampler, uvG).g;
    float blue = texture2D(uSampler, uvB).b;

    vec3 color = vec3(red, green, blue);
    
    gl_FragColor = vec4( color, 1.0 );
}