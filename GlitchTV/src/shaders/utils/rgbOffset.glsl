
// PI / 3 		= 2.094395102
// 2 * PI / 3 	= 4.188790205

vec4 rgbOffset (sampler2D map, vec2 uv, float angle, float radius)
{
	vec4 color = vec4(1.0);
	color.r = texture2D(map, uv + vec2(cos(angle), 					sin(angle)) 				* radius).r;
	color.g = texture2D(map, uv + vec2(cos(angle + 2.094395102), 	sin(angle + 2.094395102)) 	* radius).g;
	color.b = texture2D(map, uv + vec2(cos(angle + 4.188790205), 	sin(angle + 4.188790205)) 	* radius).b;
	return color;
}

#pragma glslify: export(rgbOffset)