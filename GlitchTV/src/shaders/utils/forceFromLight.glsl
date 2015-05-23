


vec2 forceFromLight (sampler2D map, vec2 p, vec2 dimension) 
{ 
	vec2 force = vec2(0.0);
	vec3 c = texture2D(map, p).rgb;
	float l = (c.r + c.g + c.b) / 3.0;

	c = texture2D(map, p - vec2(1.0, 0.0) / dimension).rgb;
	force.x += (c.r + c.g + c.b) / 3.0 - l;

	c = texture2D(map, p + vec2(1.0, 0.0) / dimension).rgb;
	force.x += l - (c.r + c.g + c.b) / 3.0;

	c = texture2D(map, p - vec2(0.0, 1.0) / dimension).rgb;
	force.y += (c.r + c.g + c.b) / 3.0 - l;

	c = texture2D(map, p + vec2(0.0, 1.0) / dimension).rgb;
	force.y += l - (c.r + c.g + c.b) / 3.0;

	return force;
}

#pragma glslify: export(forceFromLight)