#include shift.glsl

varying vec2 vUv;

void main() 
{
	vUv = uv;
	// Example usage of included file, see shift.glsl for function definition
	// vec3 shiftedPosition = shift(position);

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
