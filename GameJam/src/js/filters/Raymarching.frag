// thank to @iquilezles -> http://www.iquilezles.org/www/index.htm
// thank to @uint9 -> http://9bitscience.blogspot.fr/2013/07/raymarching-distance-fields_14.html
// http://iquilezles.org/www/articles/distfunctions/distfunctions.htm

precision lowp float;

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
uniform float uIsMoveSelected;

// Raymarching
const float rayEpsilon = 0.0001;
const float rayMin = 0.1;
const float rayMax = 1000.0;
const float rayStep = 2.0;
const int rayCount = 64;

// Camera
vec3 eye = vec3(0.0, 0.0, 0.0);
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

float addition( float d1, float d2 )
{
    return min(d1,d2);
}

float substraction( float d1, float d2 )
{
    return max(-d1,d2);
}

float intersection( float d1, float d2 )
{
    return max(d1,d2);
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
    return (x * x + sin(3.0 * x)) * 0.2;
}

float equation4 (float x)
{
    return pow(0.25, x - 1.0);
}

float equation5 (float x)
{
    return 1.0 + x + x * cos(x);
}

float equation6 (float x)
{
    return 10.0 / (50.0 * sin(PI * (10.0 * x) / 10.0) + 51.0);
}

vec3 displacement1 (vec3 p, float scale)
{
    return repeat(p, vec3(scale));
}

vec3 displacement2a (vec3 p)
{
    return rotateX(p, -PI * 0.25);
}

vec3 displacement2b (vec3 p, float scale, float height)
{
    p.xz = mod(p.xz, scale) - scale * 0.5;
    p.y -= height / 2.0;
    return p;
}


float scene1 (vec3 p, float scale)
{
    return sphere(displacement1(p, scale), scale * 0.2);
}

float scene2 (vec3 p, float scale)
{
    float height = 2.0;
    p = displacement2a(p);
    float d = plane(p, vec4(0.0, -1.0, 0.0, height));
    p = displacement2b(p, scale, height);
    return min(d, box(p, vec3(scale * 0.2, 0.1 / scale, scale * 0.2)));
}

// https://www.physicsforums.com/threads/cool-3-d-functions-for-graphing.140087/
float scene3 (vec3 p, float scale)
{
    // return 1.0 / (p.x*p.x + p.z*p.z - p.y);
    // return 1.0 / (p.x*p.z*p.z*p.z-p.z*p.x*p.x*p.x - p.y);
    return cos(abs(p.x)+abs(p.z)) - p.y;
}

void main( void )
{
    // Pixel coordinate
    vec2 uv = vTextureCoord * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse / uResolution;
    mouse.y = 1.0 - mouse.y;
    // mouse = mouse * 2.0 - 1.0;

    // front = normalize(-eye);
    // up = cross(front, vec3(0.0, 1.0, 0.0));
    // right = cross(front, up);
    
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

        float sphereSub = sphere(p - eye, 0.1);


        // p = rotateY(p, mouse.x * 10.0);
        // p = rotateX(p, mouse.y * 10.0);

        if (uIsMoveSelected > 0.0)
        {
            p = rotateX(p, -mouse.y * 10.0);
            p = rotateY(p, mouse.x * 10.0);
        }

        // float scale = 1.0 + length(ray * t) * -mouse.x;

        // float x = p.z;
        //float x = atan(uv.y, uv.x);
        float x = length(ray * t) * 0.2;
        
        float scale = 0.2;// + 2.0 * (cos(uTimeElapsed) * 0.5 + 0.5);
        // if (uEquationSelected == 0.0) scale = equation1(x / mouse.x);
        // else if (uEquationSelected == 1.0) scale = equation2(x / mouse.x);
        // else if (uEquationSelected == 2.0) scale = equation3(x / mouse.x);
        // else if (uEquationSelected == 3.0) scale = equation4(x / mouse.x);
        // else if (uEquationSelected == 4.0) scale = equation5(x / mouse.x);
        // else if (uEquationSelected == 5.0) scale = equation6(x / mouse.x);

        float d = 0.0;
        if (uSceneSelected == 0.0) d = scene1(p, scale);
        else if (uSceneSelected == 1.0) d = scene2(p, scale);
        // d = scene3(p / 10.0, scale);

        float boxInter = box(p, vec3(1.0));

        float sphereD = d;

        d = substraction(boxInter, d);
        // d = substraction(sphereSub, d);
        // d = intersection(boxInter, d);
        // float d = sphere(p, 0.2);

        // Distance min or max reached
        if (d < rayEpsilon || t > rayMax)
        {
            vec3 colorNormal = normalize(displacement1(p, scale));//vec3(0.0);

            if (boxInter < sphereD) colorNormal *= -1.0;

            // if (uSceneSelected == 0.0) colorNormal = vec3(scene1(p+axisX, scale)-scene1(p-axisX, scale), scene1(p+axisY, scale)-scene1(p-axisY, scale), scene1(p+axisZ, scale)-scene1(p-axisZ, scale));
            // else if (uSceneSelected == 1.0) colorNormal = vec3(scene2(p+axisX, scale)-scene2(p-axisX, scale), scene2(p+axisY, scale)-scene2(p-axisY, scale), scene2(p+axisZ, scale)-scene2(p-axisZ, scale));

            // Shadow from ray count
            color = (colorNormal * 0.5 + 0.5) * (1.0 - float(r) / float(rayCount));

            // Sky color from distance
            color = mix(color, skyColor, smoothstep(rayMin, rayMax, t));

            break;
        }

        // Distance field step
        t += d;
        // t += rayStep;
    }

    vec2 eqUV = vec2(vTextureCoord.x, 1.0 - vTextureCoord.y) * 2.0 - 1.0;
    eqUV.x *= uResolution.x / uResolution.y;
    eqUV *= 4.0;
    float eq = 0.0;
    if (uEquationSelected == 0.0) eq = equation1(eqUV.x / mouse.x) - eqUV.y;
    else if (uEquationSelected == 1.0) eq = equation2(eqUV.x / mouse.x) - eqUV.y;
    else if (uEquationSelected == 2.0) eq = equation3(eqUV.x / mouse.x) - eqUV.y;
    else if (uEquationSelected == 3.0) eq = equation4(eqUV.x / mouse.x) - eqUV.y;
    else if (uEquationSelected == 4.0) eq = equation5(eqUV.x / mouse.x) - eqUV.y;
    else if (uEquationSelected == 5.0) eq = equation6(eqUV.x / mouse.x) - eqUV.y;
    color += max(0.0, 0.01 / abs(eq));

    gl_FragColor = vec4( color, 1.0 );
}