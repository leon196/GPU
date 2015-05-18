precision mediump float;

uniform sampler2D uBuffer;
uniform vec2 uResolution;
varying vec2 vTexCoord;

void main() 
{
	gl_FragColor = texture2D(uBuffer, vTexCoord);
}
