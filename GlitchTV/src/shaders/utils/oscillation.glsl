

float oscillation (float t, float speed)
{
  	return sin(t * speed) * 0.5 + 0.5;
}

#pragma glslify: export(oscillation)