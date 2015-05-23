
vec2 wrapUV (vec2 uv)
{
	return mod(abs(uv), 1.0);
}

#pragma glslify: export(wrapUV)