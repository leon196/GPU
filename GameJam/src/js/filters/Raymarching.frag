// thank to @iquilezles -> http://www.iquilezles.org/www/index.htm
// thank to @uint9 -> http://9bitscience.blogspot.fr/2013/07/raymarching-distance-fields_14.html

precision mediump float;

#define PI 3.1416
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uTimeElapsed;
uniform float uParameter1;
uniform float uParameter2;

// Raymarching
const float rayEpsilon = 0.01;
const float rayMin = 0.1;
const float rayMax = 1000.0;
const int rayCount = 128;

// Camera
vec3 eye = vec3(0.0, 0.0, -1.5);
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

float sphere ( vec3 p, float s ) 
{ 
    return length(p)-s; 
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

        float scale = 1.0 + length(ray * t) * -mouse.x;
        
        p = repeat(p, vec3(scale));

        p *= scale;

        // Distance from sphere
        float d = sphere(p, 0.01 / scale);
        
        // Distance min or max reached
        if (d < rayEpsilon || t > rayMax)
        {
            // Shadow from ray count
            color = mix(normalize(p) * 0.5 + 0.5, shadowColor, float(r) / float(rayCount));

            // Sky color from distance
            color = mix(color, skyColor, smoothstep(rayMin, rayMax, t));

            break;
        }

        // Distance field step
        t += d;
    }
    gl_FragColor = vec4( color, 1.0 );
}