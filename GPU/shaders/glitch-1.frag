
uniform sampler2D uVideo;
uniform vec2 uResolution, uCursor;
uniform float uTime, uTransition;

varying vec2 vUv;

float random (in vec2 st) { return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123); }
vec2 pixelize(vec2 uv, float details) { return floor(uv * details) / details; }
vec2 pixelize(vec2 uv, vec2 details) { return floor(uv * details) / details; }

void main () {
	vec2 uv = vUv;
	vec2 lod = uResolution/max(vec2(.01), uCursor*uResolution);
	uv = pixelize(uv, lod);
	uv += uCursor.x * (fract(vUv*10.)*2.-1.)*.01;

	gl_FragColor = texture2D(uVideo, uv) * uTransition;
}