
uniform sampler2D uFrame, uVideo;
uniform vec2 uResolution, uCursor;
uniform float uTime, uTransition, uGameOver;

varying vec2 vUv;

float random (in vec2 st) { return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123); }
vec2 pixelize(vec2 uv, float details) { return floor(uv * details) / details; }
vec2 pixelize(vec2 uv, vec2 details) { return floor(uv * details) / details; }
float luminance (vec4 color) { return (color.r + color.b + color.g) / 3.; }

void main () {
	vec4 video = texture2D(uVideo, vUv);
	vec4 frame = texture2D(uFrame, vUv);
	gl_FragColor = mix(mix(video, frame, smoothstep(.0, .2,luminance(frame))), frame, uGameOver);
	gl_FragColor *= uTransition;
}