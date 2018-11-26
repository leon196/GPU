
uniform sampler2D uFrame;
uniform vec2 uResolution, uCursor;
uniform float uTime, uTransition;

varying vec2 vUv;

float random (in vec2 st) { return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123); }
vec2 pixelize(vec2 uv, float details) { return floor(uv * details) / details; }
vec2 pixelize(vec2 uv, vec2 details) { return floor(uv * details) / details; }

void main () {
	gl_FragColor = texture2D(uFrame, vUv) * (1.-smoothstep(.9, 1., uTransition));
}