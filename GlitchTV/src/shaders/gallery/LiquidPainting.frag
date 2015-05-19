
// inspired by http://glslsandbox.com/e#25072.0

precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

uniform sampler2D uBuffer;
uniform sampler2D uPicture;
uniform sampler2D uVideo;

uniform vec2 uResolution;
uniform vec2 uBufferResolution;
uniform vec2 uMouse;
varying vec2 vTexCoord;

uniform float uTimeElapsed;
uniform float uAutoTreshold;
uniform float uSliderRatio;

float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }

void main() 
{
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	vec2 mouse = uMouse / uResolution.xy;
	mouse = (mouse - vec2(0.5)) * 2.0;
	mouse.y *= -1.0;

    vec2 p = vTexCoord - vec2(0.5);
    float angle = atan(p.y, p.x);
    float radius = length(p);

    float t = sin(uTimeElapsed * 0.001) * 0.5 + 0.5;

   	vec2 force = vec2(cos(angle), sin(angle)) * (radius - 0.002);
   	angle = rand(p) * PI2;
   	force += vec2(cos(angle), sin(angle)) * 0.001;

	vec4 color = texture2D(uBuffer, vec2(0.5) + force - mouse * 0.01);

	vec4 video = texture2D(uVideo, uv);

	color = mix(color, video, step(radius, 1.0 / uBufferResolution.x));

	float treshold = mix(uSliderRatio, 0.3 + 0.2 * t, uAutoTreshold);

	color = mix(color, video, step(treshold, distance(color.rgb, video.rgb)));

	gl_FragColor = color;
}
