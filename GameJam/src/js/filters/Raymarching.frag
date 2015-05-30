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
const float rayEpsilon = 0.001;
const float rayMin = 0.1;
const float rayMax = 10000.0;
const int rayCount = 32;

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

float equationSelection (float equationIndex)
{
    return step(uEquationSelected / uEquationCount, (equationIndex - 1.0) / uEquationCount) - step((uEquationSelected + 1.0) / uEquationCount, (equationIndex - 1.0) / uEquationCount);
}

float sceneSelection (float sceneIndex)
{
    return step(uSceneSelected / uSceneCount, (sceneIndex - 1.0) / uSceneCount) - step((uSceneSelected + 1.0) / uSceneCount, (sceneIndex - 1.0) / uSceneCount);
}

float equation1 (float x, vec2 mouse)
{
    return cos(x * (1.0 + 2.0 * mouse.x)) * 0.1;
}

float equation2 (float x, vec2 mouse)
{
    return 1.0 / (1.0 + exp(mouse.x * 2.0 * (x - 0.5)));
}

float scene1 (vec3 p, float scale)
{
    p = repeat(p, vec3(scale));
    return sphere(p, scale * 0.2);
}

float scene2 (vec3 p, float scale)
{
    float height = 2.0;
    float d = plane(p, vec4(0.0, -1.0, 0.0, height));
    p.xz = mod(p.xz, scale) - scale * 0.5;
    p.y -= height / 2.0;
    return min(d, sphere(p, scale * 0.2));
}

float scene3 (vec3 p, float scale)
{
    float height = 2.0;
    // p = rotateX(p, -PI * 0.1);
    float d = plane(p, vec4(0.0, -1.0, 0.0, height));
    p.xz = mod(p.xz, scale) - scale * 0.5;
    p.y -= height / 2.0;
    return min(d, box(p, vec3(scale * 0.1, scale, scale * 0.1)));
}

void main( void )
{
    // Pixel coordinate
    vec2 uv = vTextureCoord * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    vec2 mouse = uMouse / uResolution;
    
    // Ray from pixel
    vec3 ray = normalize(front + right * uv.x + up * uv.y);
    
    // Initial color
    vec3 color = skyColor;
    
    // Raymarching
    float t = 0.0;
    for (int r = 0; r < rayCount; ++r)
    {
        // Ray Position
        vec3 p = eye + ray * t;

        // float scale = 1.0 + length(ray * t) * -mouse.x;
        float dist = length(ray * t);
        
        float scale = 0.0;
        scale += equationSelection(1.0) * equation1(dist, mouse);
        scale += equationSelection(2.0) * equation2(dist, mouse);

        float d = 0.0;
        d += sceneSelection(1.0) * scene1(p, scale);
        d += sceneSelection(2.0) * scene2(p, scale);
        d += sceneSelection(3.0) * scene3(p, scale);

        // Distance min or max reached
        if (d < rayEpsilon || t > rayMax)
        {
            vec3 colorNormal = vec3(0.0);

            colorNormal += sceneSelection(1.0) * normalize(vec3(scene1(p+axisX, scale)-scene1(p-axisX, scale), scene1(p+axisY, scale)-scene1(p-axisY, scale), scene1(p+axisZ, scale)-scene1(p-axisZ, scale)));
            colorNormal += sceneSelection(2.0) * normalize(vec3(scene2(p+axisX, scale)-scene2(p-axisX, scale), scene2(p+axisY, scale)-scene2(p-axisY, scale), scene2(p+axisZ, scale)-scene2(p-axisZ, scale)));
            colorNormal += sceneSelection(3.0) * normalize(vec3(scene3(p+axisX, scale)-scene3(p-axisX, scale), scene3(p+axisY, scale)-scene3(p-axisY, scale), scene3(p+axisZ, scale)-scene3(p-axisZ, scale)));

            // Shadow from ray count
            color = (colorNormal * 0.5 + 0.5) * (1.0 - float(r) / float(rayCount));

            // Sky color from distance
            color = mix(color, skyColor, smoothstep(rayMin, rayMax, t));

            break;
        }

        // Distance field step
        t += d;
    }

    // color += 0.001 / abs(cos(vTextureCoord.x * 10.0) * 0.1 - vTextureCoord.y + 0.5); 

    vec2 eqUV = vec2(vTextureCoord.x, 1.0 - vTextureCoord.y) * 2.0 - 1.0;
    eqUV.x *= uResolution.x / uResolution.y;
    eqUV *= 4.0;
    // eqUV.y *= -1.0;
    float eq = 0.0;
    eq += equationSelection(1.0) * (equation1(eqUV.x, mouse) - eqUV.y);
    eq += equationSelection(2.0) * (equation2(eqUV.x, mouse) - eqUV.y);
    color += max(0.0, 0.01 / abs(eq));

    gl_FragColor = vec4( color, 1.0 );
}