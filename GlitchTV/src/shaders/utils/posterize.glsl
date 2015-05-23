
vec3 posterize ( vec3 color, float segments ) 
{ 
	return floor(color * segments) / segments; 
}

#pragma glslify: export(posterize)
