
float luminance ( vec3 color ) 
{ 
	return (color.r + color.g + color.b) / 3.0; 
}

#pragma glslify: export(luminance)