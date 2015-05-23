
vec4 updateBufferWithColorFilter (vec4 colorBuffer, vec4 colorUpdate, vec4 colorFromFilter, float treshold)
{
  	return mix(colorBuffer, colorUpdate, step(treshold, (colorFromFilter.r + colorFromFilter.g + colorFromFilter.b) / 3.0));
}

#pragma glslify: export(updateBufferWithColorFilter)