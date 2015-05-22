
vec2 forceFromAngle (float angle)
{
  	return vec2(cos(angle), sin(angle));
}

#pragma glslify: export(forceFromAngle)