precision mediump float;

attribute vec2 aPosition;
varying vec2 vTexCoord;

void main() 
{
  	gl_Position = vec4(aPosition, 0.0, 1.0);
	vTexCoord = 0.5 * (aPosition + 1.0);
}
