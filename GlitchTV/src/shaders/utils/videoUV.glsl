
vec2 videoUV (vec2 uv)
{
	return vec2(uv.x, 1.0 - uv.y);
}

#pragma glslify: export(videoUV)