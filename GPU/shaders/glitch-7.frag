
uniform sampler2D uVideo;
uniform vec2 uResolution, uCursor;
uniform float uTime, uTransition;

varying vec2 vUv;

float luminance (vec4 color) { return (color.r + color.b + color.g) / 3.; }

void main () {
  vec2 uv = vUv;

  vec4 media = vec4(uCursor.y);

	const float count = 8.;
	for (float i = count; i > 0.; --i) {
		float ratio = i / count;
		float a = ratio * 3.1415 * 2. + uCursor.x * 10.;
		vec2 offset = vec2(cos(a),sin(a))*.5*uCursor.x;
		vec4 map = texture2D(uVideo, uv+offset);
		media = mix(media + map/count, media * step(.02, abs(map-ratio)), uCursor.y);
	}

  gl_FragColor = media * uTransition;
}