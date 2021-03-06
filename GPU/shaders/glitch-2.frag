
uniform sampler2D uVideo;
uniform vec2 uResolution, uCursor;
uniform float uTime, uTransition;

varying vec2 vUv;

float random (in vec2 st) { return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123); }
vec2 pixelize(vec2 uv, float details) { return floor(uv * details) / details; }
vec2 pixelize(vec2 uv, vec2 details) { return floor(uv * details) / details; }

void main () {
	vec2 uv = vUv;
	vec2 lod = uResolution/max(.01, uCursor.x*100.);

	uv.x += uCursor.x * (random((vUv - vec2(0, uTime * .02)).yy)*2.-1.);
	uv.y += uCursor.y * (random((vUv - vec2(0, uTime * .01)).xx)*2.-1.);

	gl_FragColor = texture2D(uVideo, uv) * uTransition;
}