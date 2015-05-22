
vec2 pixelize(vec2 uv, float segments) 
{ 
	return floor(uv * segments) / segments; 
}

#pragma glslify: export(pixelize)