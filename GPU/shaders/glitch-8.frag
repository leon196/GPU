
uniform sampler2D uVideo;
uniform vec2 uResolution, uCursor;
uniform float uTime, uTransition;

varying vec2 vUv;

float random (in vec2 st) { return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123); }
float luminance (vec4 color) { return (color.r + color.b + color.g) / 3.; }

void main () {
  vec2 uv = vUv;

	vec4 media = texture2D(uVideo, uv);
	media.r = mix(media.r, random(uv.xx), uCursor.x);
	media.g = mix(media.g, random(vec2(luminance(media))), uCursor.y);
	media.b =  mix(media.b, random(vec2(media.r)), uCursor.x);

  gl_FragColor = media * uTransition;
}