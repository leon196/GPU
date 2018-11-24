
uniform sampler2D title;

varying vec2 vUv;

void main ()
{
	gl_FragColor = texture2D(title, vUv);
}