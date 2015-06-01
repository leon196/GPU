// thank to @iquilezles -> http://www.iquilezles.org/www/index.htm
// thank to @uint9 -> http://9bitscience.blogspot.fr/2013/07/raymarching-distance-fields_14.html
// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm

precision mediump float;

#define PI 3.1416
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTimeElapsed;
uniform float uParameter1;
uniform float uParameter2;
uniform float uEquationSelected;
uniform float uEquationCount;
uniform float uSceneSelected;
uniform float uSceneCount;

// Raymarching
const float rayEpsilon = 0.0001;
const float rayMin = 0.1;
const float rayMax = 10000.0;
const int rayCount = 64;

// Camera
vec3 eye = vec3(0.0, 0.0, -10.0);
vec3 front = vec3(0.0, 0.0, 1.0);
vec3 right = vec3(1.0, 0.0, 0.0);
vec3 up = vec3(0.0, 1.0, 0.0);

// Colors
vec3 sphereColor = vec3(0, 0.5, 0.0);
vec3 skyColor = vec3(0.0, 0.0, 0.0);
vec3 shadowColor = vec3(0.0, 0.0, 0.5);
vec3 fogColor  = vec3(0.5,0.0,0.0);

// Animation
float sphereRadius = 0.8;

// 
vec3 axisX = vec3(0.1, 0.0, 0.0);
vec3 axisY = vec3(0.0, 0.1, 0.0);
vec3 axisZ = vec3(0.0, 0.0, 0.1);

float sphere ( vec3 p, float s ) 
{ 
    return length(p)-s; 
}

float box( vec3 p, vec3 b )
{
  return length(max(abs(p)-b,0.0));
}

float plane( vec3 p, vec4 n )
{
  // n must be normalized
  return dot(p,n.xyz) + n.w;
}

vec3 repeat ( vec3 p, vec3 grid )
{
    return mod(p, grid) - grid * 0.5;
}

vec3 rotateY(vec3 v, float t)
{
    float cost = cos(t); float sint = sin(t);
    return vec3(v.x * cost + v.z * sint, v.y, -v.x * sint + v.z * cost);
}

vec3 rotateX(vec3 v, float t)
{
    float cost = cos(t); float sint = sin(t);
    return vec3(v.x, v.y * cost - v.z * sint, v.y * sint + v.z * cost);
}

float substraction( float d1, float d2 )
{
    return max(-d1,d2);
}

float equation1 (float x)
{
    return cos(x * (1.0 + 2.0)) * 0.1;
}

float equation2 (float x)
{
    return 1.0 / (1.0 + exp(2.0 * (x - 0.5)));
}

float equation3 (float x)
{
    return 0.1 + (x * x + sin(3.0 * x));
}

float equation4 (float x)
{
    return pow(1.0, x - 1.0);
}

float equation5 (float x)
{
    return 1.0 + x + x * cos(x);
}

float equation6 (float x)
{
    return 10.0 / (50.0 * sin(PI * (10.0 * x) / 10.0) + 51.0);
}

float scene1 (vec3 p, float scale)
{
    scale = floor(scale * 100.0) / 100.0;
    p = repeat(p, vec3(scale));
    return sphere(p, scale * 0.2);
}

float scene2 (vec3 p, float scale)
{
    float height = 2.0;
    p = rotateX(p, -PI * 0.25);
    float d = plane(p, vec4(0.0, -1.0, 0.0, height));
    p.xz = mod(p.xz, scale) - scale * 0.5;
    p.y -= height / 2.0;
    return min(d, box(p, vec3(scale * 0.2, 0.1 / scale, scale * 0.2)));
}

void main( void )
{
    // Pixel coordinate
    vec2 uv = vTextureCoord * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse / uResolution;
    mouse.y = 1.0 - mouse.y;
    // mouse = mouse * 2.0 - 1.0;
    
    // Ray from pixel
    vec3 ray = normalize(front + right * uv.x + up * uv.y);
    
    // Initial color
    vec3 color = vec3(0.0);

    // Raymarching
    float t = 0.0;
    for (int r = 0; r < rayCount; ++r)
    {
        // Ray Position
        vec3 p = eye + ray * t;

        // float sphereSub = sphere(p - eye, 1.0);

        // p = rotateY(p, mouse.x * 10.0);
        // p = rotateX(p, mouse.y * 10.0);

        // float scale = 1.0 + length(ray * t) * -mouse.x;

        // float value = p.z;
        //float value = atan(uv.y, uv.x);
        float value = length(ray * t) * 0.2;
        
        float scale = 0.0;
        if (uEquationSelected == 0.0) scale = equation1(value / mouse.x) * mouse.y;
        else if (uEquationSelected == 1.0) scale = equation2(value / mouse.x) * mouse.y;
        else if (uEquationSelected == 2.0) scale = equation3(value / mouse.x) * mouse.y;
        else if (uEquationSelected == 3.0) scale = equation4(value / mouse.x) * mouse.y;
        else if (uEquationSelected == 4.0) scale = equation5(value / mouse.x) * mouse.y;
        else if (uEquationSelected == 5.0) scale = equation6(value / mouse.x) * mouse.y;

        float d = 0.0;
        if (uSceneSelected == 0.0) d = scene1(p, scale);
        else if (uSceneSelected == 1.0) d = scene2(p, scale);

        // d = substraction(sphereSub, d);

        // Distance min or max reached
        if (d < rayEpsilon || t > rayMax)
        {
            vec3 colorNormal = vec3(0.0);

            if (uSceneSelected == 0.0) colorNormal = vec3(scene1(p+axisX, scale)-scene1(p-axisX, scale), scene1(p+axisY, scale)-scene1(p-axisY, scale), scene1(p+axisZ, scale)-scene1(p-axisZ, scale));
            else if (uSceneSelected == 1.0) colorNormal = vec3(scene2(p+axisX, scale)-scene2(p-axisX, scale), scene2(p+axisY, scale)-scene2(p-axisY, scale), scene2(p+axisZ, scale)-scene2(p-axisZ, scale));

            // Shadow from ray count
            color = (normalize(colorNormal) * 0.5 + 0.5) * (1.0 - float(r) / float(rayCount));

            // Sky color from distance
            color = mix(color, skyColor, smoothstep(rayMin, rayMax, t));

            break;
        }

        // Distance field step
        t += d;
    }

    vec2 eqUV = vec2(vTextureCoord.x, 1.0 - vTextureCoord.y) * 2.0 - 1.0;
    eqUV.x *= uResolution.x / uResolution.y;
    eqUV *= 4.0;
    float eq = 0.0;
    if (uEquationSelected == 0.0) eq = equation1(eqUV.x / mouse.x) * mouse.y - eqUV.y;
    else if (uEquationSelected == 1.0) eq = equation2(eqUV.x / mouse.x) * mouse.y - eqUV.y;
    else if (uEquationSelected == 2.0) eq = equation3(eqUV.x / mouse.x) * mouse.y - eqUV.y;
    else if (uEquationSelected == 3.0) eq = equation4(eqUV.x / mouse.x) * mouse.y - eqUV.y;
    else if (uEquationSelected == 4.0) eq = equation5(eqUV.x / mouse.x) * mouse.y - eqUV.y;
    else if (uEquationSelected == 5.0) eq = equation6(eqUV.x / mouse.x) * mouse.y - eqUV.y;
    color += max(0.0, 0.01 / abs(eq));

    gl_FragColor = vec4( color, 1.0 );
}