
uniform vec3 target;
uniform vec2 resolution, imageResolution;

varying vec2 vUv;

void main ()
{
	vUv = 1.-uv;
	vec3 pos = position * .3;
	pos.x /= resolution.x/resolution.y;
	pos.x *= imageResolution.x/imageResolution.y;
	pos.y += .5*imageResolution.y/resolution.y;
	pos = target-pos;
	pos.z = .1;
	gl_Position = vec4(pos, 1);
}