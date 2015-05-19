precision mediump float;

uniform sampler2D uBuffer;
varying vec2 vTexCoord;

void main() 
{
	gl_FragColor = texture2D(uBuffer, vTexCoord);
}
