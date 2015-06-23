
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179
#define RADTier 2.094395102
#define RAD2Tier 4.188790205

varying vec2 vTexCoord;

uniform sampler2D picture;
uniform sampler2D video;
uniform sampler2D fbo;

uniform vec2 bufferSize;
uniform vec2 screenSize;
uniform vec2 mouse;

uniform float time;
uniform float isInteractive;
uniform float isAutomatic;

uniform float sliderTreshold;
uniform float sliderRGBOffset;

uniform float filter5x5[25];
uniform float filter9x9[81];

// Utils
#pragma glslify: random = require('glsl-random')
#pragma glslify: oscillation = require('../utils/oscillation.glsl')

// UVs
#pragma glslify: videoUV = require('../utils/videoUV.glsl')
#pragma glslify: wrapUV = require('../utils/wrapUV.glsl')
#pragma glslify: pixelize = require('../utils/pixelize.glsl')

// Color
#pragma glslify: luminance = require('glsl-luma')
#pragma glslify: posterize = require('../utils/posterize.glsl')
#pragma glslify: rgbOffset = require('../utils/rgbOffset.glsl')
#pragma glslify: fadeOut = require('../utils/fadeOut.glsl')
#pragma glslify: hsl2rgb = require('glsl-hsl2rgb')

#pragma glslify: blur = require('glsl-fast-gaussian-blur')

#pragma glslify: forceFromAngle = require('../utils/forceFromAngle.glsl')
#pragma glslify: forceFromLight = require('../utils/forceFromLight.glsl')
#pragma glslify: applyFilter5x5 = require('../utils/filter5x5.glsl')
#pragma glslify: updateBufferWithColorDifference = require('../utils/updateBufferWithColorDifference.glsl')
#pragma glslify: updateBufferWithColorFilter = require('../utils/updateBufferWithColorFilter.glsl')

// <3 Shadertoy
// thank to @uint9 -> http://9bitscience.blogspot.fr/2013/07/raymarching-distance-fields_14.html


// Raymarching
const float rayEpsilon = 0.001;
const float rayMin = 0.1;
const float rayMax = 4.0;
const int rayCount = 16;

// Camera
vec3 eye = vec3(0, 0, -2.0);
vec3 front = vec3(0, 0, 1);
vec3 right = vec3(1, 0, 0);
vec3 up = vec3(0, 1, 0);

// Animation
vec2 uvScale1 = vec2(2.0);
vec2 uvScale2 = vec2(2.0);
float terrainHeight = 0.6;
float sphereRadius = 0.9;
float translationSpeed = 0.4;
float rotationSpeed = 0.1;

// Colors
vec3 skyColor = vec3(0, 0, 0.1);
vec3 shadowColor = vec3(0.1, 0, 0);

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

float sphere( vec3 p, float s ) { return length(p)-s; }
float reflectance(vec3 a, vec3 b) { return dot(normalize(a), normalize(b)) * 0.5 + 0.5; }
vec2 kaelidoGrid(vec2 p) { return vec2(step(mod(p, 2.0), vec2(1.0))); }

void main()
{
    // Ray from UV
    vec2 uv = videoUV(vTexCoord).xy * 2.0 - 1.0;
    uv.x *= screenSize.x / screenSize.y;
    vec3 ray = normalize(front + right * uv.x + up * uv.y);
    
    // Color
    vec3 color = shadowColor;
    
    // Animation
    float translationTime = 0.0;//time * translationSpeed;
    
    // Raymarching
    float t = 0.0;
    for (int r = 0; r < rayCount; ++r)
    {
        // Ray Position
        vec3 p = eye + ray * t;
        vec3 originP = p;
        
        // Transformations
        p = rotateY(p, PI / 2.0);
        p = rotateX(p, PI / 2.0);
        vec2 translate = vec2(0.0, translationTime);
        
        // Sphere UV
        float angleXY = atan(p.y, p.x);
        float angleXZ = atan(p.z, p.x);
        vec2 sphereP1 = vec2(angleXY / PI, 1.0 - reflectance(p, eye)) * uvScale1;
        vec2 sphereP2 = vec2(angleXY / PI, reflectance(p, eye)) * uvScale2;
        sphereP1 += 0.5;
        sphereP2 += mix(vec2(translationTime), vec2(-translationTime), 
                        vec2(step(angleXY, 0.0), step(angleXZ, 0.0)));
        vec2 uv1 = mod(mix(sphereP1, 1.0 - sphereP1, kaelidoGrid(sphereP1)), 1.0);
        vec2 uv2 = mod(mix(sphereP2, 1.0 - sphereP2, kaelidoGrid(sphereP2)), 1.0);
        
        // Texture
        // vec3 texture = texture2D(video, uv1).rgb;
        // vec3 texture2 = texture2D(picture, uv2).rgb;

        vec2 direction = normalize(videoUV(vTexCoord) - vec2(0.5)) * 8.0;
        vec3 texture = blur(video, uv1, screenSize, direction).rgb;
        color = texture;
        
        // Height from luminance
        float luminance = (texture.r + texture.g + texture.b) / 3.0;
        //texture = mix(texture, texture2, 1.0 - step(texture.g - texture.r - texture.b, -0.3));
        luminance = (texture.r + texture.g + texture.b) / 3.0;
        // luminance = sin(luminance / 0.6355);
        
        // Displacement
        p -= normalize(p) * terrainHeight * luminance * reflectance(originP, eye);
        
        // Distance to Sphere
        float d = sphere(p, sphereRadius);
        
        // Distance min or max reached
        if (d < rayEpsilon || t > rayMax)
        {
            // Shadow from ray count
            color = mix(color, shadowColor, float(r) / float(rayCount));
            // Sky color from distance
            //color = mix(color, skyColor, smoothstep(rayMin, rayMax, t));
            break;
        }
        
        // Distance field step
        t += d;
    }

    // Hop
    gl_FragColor = vec4(color, 1.0);
}