
vec2 mouseFromCenter (vec2 mouse, vec2 resolution)
{
	mouse /= resolution;
  	mouse = (mouse - vec2(0.5)) * 2.0;
  	mouse.y *= -1.0;
  	return mouse;
}

#pragma glslify: export(mouseFromCenter)