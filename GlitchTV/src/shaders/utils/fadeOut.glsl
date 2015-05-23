
vec4 fadeOut (vec4 color, float percent)
{
	return color * vec4(vec3(percent), 1.0);
}

#pragma glslify: export(fadeOut)