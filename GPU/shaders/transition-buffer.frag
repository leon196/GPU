
uniform sampler2D uFrame, uVideo, uTextWin;
uniform vec2 uResolution, uCursor;
uniform float uTime, uGameOver;

varying vec2 vUv;

float random (in vec2 st) { return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123); }
vec2 pixelize(vec2 uv, float details) { return floor(uv * details) / details; }
vec2 pixelize(vec2 uv, vec2 details) { return floor(uv * details) / details; }
float luminance (vec4 color) { return (color.r + color.b + color.g) / 3.; }
vec3 rgb2hsv(vec3 c) {
	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
	vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
	vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
	float d = q.x - min(q.w, q.y);
	float e = 1.0e-10;
	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c) {
	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main () {
	vec4 video = texture2D(uVideo, vUv);
	vec4 text = texture2D(uTextWin, vUv);
	vec4 frame = texture2D(uFrame, vUv);

	vec2 uv = vUv;
	vec2 unit = 1. / uResolution;
	float a = 2. * 3.1415 * luminance(video);
	a += 2. * 3.1415 * luminance(frame);
	a += uTime * .1;
	uv += vec2(cos(a), sin(a))*unit;

	frame = texture2D(uFrame, uv);
	text.rgb = hsv2rgb(vec3(uTime * .1 + text.a, .9, .9));

	vec4 frameVideo = mix(video, frame, 1.1 * smoothstep(.6, .4, length(video.rgb-frame.rgb)));

	gl_FragColor = mix(
		frame,
		frameVideo,
		uGameOver);

	gl_FragColor.rgb = mix(gl_FragColor.rgb, text.rgb, text.a);
}