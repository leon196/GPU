
precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform float uTimeElapsed;

uniform float uClear;
uniform float uParameter1;
uniform float uParameter2;

// Dat random function for glsl
float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }

// Pixelize coordinates
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }
float getLuminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }

void main( void )
{
	vec2 uv = vTextureCoord;

    // vec3 color = texture2D(uSampler, uv + vec2(0, -0.5 + 0.25 * cos(uTimeElapsed))).rgb;

    vec2 p = uv - vec2(0.5);
    // p.x *= uResolution.x / uResolution.y;
    float angle = atan(p.y, p.x);
    float radius = length(p);

    // Wow
    vec2 force = vec2(cos(angle), sin(angle)) * (radius - (0.5 + 0.5 * sin(uTimeElapsed)));
    // Scale In
    // vec2 force = vec2(cos(angle), sin(angle)) * (radius / (0.5 + 0.5 * sin(uTimeElapsed)));
    // Scale Out
    // vec2 force = vec2(cos(angle), sin(angle)) * (radius * (0.5 + 0.5 * sin(uTimeElapsed)));
    // Rotation
    // angle += uTimeElapsed;
    // vec2 force = vec2(cos(angle), sin(angle)) * radius;

    vec3 color = texture2D(uSampler, force + vec2(0.5)).rgb;

    //color += texture2D(uSampler, uv).rgb;

    if (uClear == 0.0)
    {  
        if (getLuminance(color) < 0.333) 
        {
            discard;
        }
    }
    
    gl_FragColor = vec4(color, 1.0);
}