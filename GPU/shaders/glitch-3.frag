
uniform sampler2D uVideo;
uniform vec2 uResolution, uCursor;
uniform float uTime, uTransition;

varying vec2 vUv;

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
  vec2 uv = vUv;
  vec2 unit = 1. / uResolution;
  vec4 media = texture2D(uVideo, uv);
  float l = luminance(media);
  float a = l * 3.14159 * 2.;
  uv += vec2(cos(a), sin(a)) * unit * 1000. * uCursor.x;
  media = texture2D(uVideo, uv);
  media.rgb = hsv2rgb(rgb2hsv(media.rgb)+vec3(l,l,l)*4.*uCursor.y);
  gl_FragColor = media * uTransition;
}