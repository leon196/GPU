
uniform sampler2D uText, uTextMask;
uniform vec2 uResolution;
uniform float uTime, uHover, uTransition;

varying vec2 vUv;

const float PI = 3.14159;
const float PI2 = 6.28318;

float random (in vec2 st) { return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123); }
vec2 pixelize(vec2 uv, float details) { return floor(uv * details) / details; }

void main ()
{
	vec2 uv = vUv;

	float hover = uHover * step(abs(uv.x-.5), .15) * step(abs(uv.y-.25), .1);
	float should = texture2D(uTextMask, vUv).r + hover;

	// Scanline
	float random1 = random(pixelize(uv - vec2(0, uTime * .01), pow(2.0, 10.0)).yy);
	float random2 = random(pixelize(uv + vec2(0, uTime * .01), pow(2.0, 6.0)).yy) * 0.025 * random1;
	uv.x += random2 * mix(.1, 1., should);

	// RGB 
	float rgbScale = mix(1., 10., should) / uResolution.y;
	float time = uTime * .1;
	vec3 rgbAngle = vec3(time, time + PI2 / 3.0, time + PI2 * 2.0 / 3.0);
	vec2 uvR = uv + rgbScale * vec2(cos(rgbAngle.r), sin(rgbAngle.r));
	vec2 uvG = uv + rgbScale * vec2(cos(rgbAngle.g), sin(rgbAngle.g));
	vec2 uvB = uv + rgbScale * vec2(cos(rgbAngle.b), sin(rgbAngle.b));
	float red = texture2D(uText, uvR).r;
	float green = texture2D(uText, uvG).g;
	float blue = texture2D(uText, uvB).b;

	vec3 color = vec3(red, green, blue);

	gl_FragColor = vec4(color, 1) * (1.-uTransition);
}