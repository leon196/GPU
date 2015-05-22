
vec4 filter9x9 (float filter[81], sampler2D bitmap, vec2 uv, vec2 dimension)
{
  vec4 color = vec4(0.);
  for (int i = 0; i < 9; ++i)
    for (int j = 0; j < 9; ++j) 
      color += filter[i * 9 + j] * texture2D(bitmap, uv + vec2(i - 4, j - 4) / dimension);
  return color;
}

#pragma glslify: export(filter9x9)