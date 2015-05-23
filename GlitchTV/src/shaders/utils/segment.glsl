
vec2 segment(float amount, float segments) 
{ 
	return floor(amount * segments) / segments; 
}

#pragma glslify: export(segment)