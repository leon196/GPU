
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uTimeElapsed;

uniform float uParameter1;
uniform float uParameter2;
uniform float uParameterFadeOut;

// Dat random function for glsl
float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }

// Pixelize coordinates
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

void main( void )
{
	vec2 uv = vTextureCoord;

	// TV Offset Y
	uv.y += mod(uTimeElapsed * 0.1, 1.0) * uParameterFadeOut;
	uv = mod(uv, 1.0);

	// Scanline
	float random1 = rand(pixelize(uv - vec2(0, uTimeElapsed * 0.1), pow(2.0, 10.0)).yy);
    float random2 = rand(pixelize(uv + vec2(0, uTimeElapsed * 0.1), pow(2.0, 6.0)).yy) * 0.025 * random1;
    float random3 = rand(pixelize(vec2(0, uTimeElapsed), pow(2.0, 4.0)).yy);
    float timingGlitch = step(random3, cos(uTimeElapsed) * 0.5 + 0.5);
    uv = mix(uv, uv + random2, abs(uParameter2));

	// RGB 
	float rgbScale = 0.05 * uParameter1;
	vec3 rgbAngle = vec3(uTimeElapsed, uTimeElapsed + PI2 / 3.0, uTimeElapsed + PI2 * 2.0 / 3.0);
	vec2 uvR = uv + rgbScale * vec2(cos(rgbAngle.r), sin(rgbAngle.r));
	vec2 uvG = uv + rgbScale * vec2(cos(rgbAngle.g), sin(rgbAngle.g));
	vec2 uvB = uv + rgbScale * vec2(cos(rgbAngle.b), sin(rgbAngle.b));
    float red = texture2D(uSampler, mod(uvR, 1.0)).r;
    float green = texture2D(uSampler, mod(uvG, 1.0)).g;
    float blue = texture2D(uSampler, mod(uvB, 1.0)).b;

    vec3 color = vec3(red, green, blue);

    // Noise
    // color *= mix(1.0, rand(uv), abs(uParameter4));
    
    gl_FragColor = vec4( color, 1.0 );
}