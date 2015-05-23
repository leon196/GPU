
vec4 updateBufferWithColorDifference (vec4 colorBuffer, vec4 colorUpdate, float treshold)
{
	return mix(colorBuffer, colorUpdate, step(treshold, distance(colorBuffer.rgb, colorUpdate.rgb)));
}

#pragma glslify: export(updateBufferWithColorDifference)