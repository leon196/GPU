
uniform sampler2D uVideo;
uniform vec2 uResolution, uCursor;
uniform float uTime, uTransition;

varying vec2 vUv;

float random (in vec2 st) { return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123); }
float luminance (vec4 color) { return (color.r + color.b + color.g) / 3.; }

void main () {
  vec2 uv = vUv;

	vec2 p = uv * 2. - 1.;
	p.x *= uResolution.x / uResolution.y;
	uv.x += mix(0., 1./length(p), uCursor.x);
	uv.y += mix(0., atan(p.y,p.x), uCursor.y);
	uv = mod(abs(uv),1.);
	vec4 media = texture2D(uVideo, uv);

  gl_FragColor = media * uTransition;
}