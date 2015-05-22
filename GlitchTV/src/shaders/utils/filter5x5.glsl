
// From Anton Roy -> https://www.shadertoy.com/view/Xs23DG
vec4 filter5x5 (float filter[25], sampler2D bitmap, vec2 uv, vec2 dimension)
{
  vec4 color = vec4(0.);
  for (int i = 0; i < 5; ++i)
    for (int j = 0; j < 5; ++j) 
      color += filter[i * 5 + j] * texture2D(bitmap, uv + vec2(i - 2, j - 2) / dimension);
  return color;
}

#pragma glslify: export(filter5x5)