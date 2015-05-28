
vec4 posterize ( vec4 color, float segments ) 
{ 
	return vec4(floor(color.rgb * segments) / segments, 1.0); 
}

#pragma glslify: export(posterize)
