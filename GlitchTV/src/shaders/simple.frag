precision mediump float;

uniform sampler2D uBuffer;
uniform sampler2D uVideo;
varying vec2 vTexCoord;

void main() 
{
	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;
	vec4 colorBuffer = texture2D(uBuffer, vTexCoord);
	vec4 colorVideo = texture2D(uVideo, uv);
	gl_FragColor = vec4(mix(colorVideo.rgb, colorBuffer.rgb, step(0.1, colorBuffer.a)), 1.0);
}
