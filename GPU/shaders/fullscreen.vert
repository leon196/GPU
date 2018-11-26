
varying vec2 vUv;

void main ()
{
	vUv = uv;
	gl_Position = vec4(vUv*2.-1., 0, 1);
}