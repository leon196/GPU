
// inspired by http://glslsandbox.com/e#25072.0

precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

uniform sampler2D uFramebuffer;
uniform sampler2D uPicture;
uniform sampler2D uVideo;
uniform float uTimeElapsed;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vTexCoord;

float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }

void main() 
{
	float offsetYAnimation = sin(uTimeElapsed * 0.001) * 0.25;


	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	// vec2 m = uMouse / uResolution;
	// m.y = 1.0 - m.y;
	//m = (m - 0.5) * 2.0;


    vec2 p = vTexCoord - vec2(0.5);

    // p.y += offsetYAnimation;
    // p *= uResolution;
    // p.x *= uResolution.x / uResolution.y;
    float angle = atan(p.y, p.x);
    float radius = length(p);

    float t = sin(uTimeElapsed * 0.001) * 0.5 + 0.5;

   	// vec2 force = vec2(cos(angle), sin(angle)) * (radius - 0.004);// + 0.003 * t);
   	vec2 force = vec2(cos(angle), sin(angle)) * (radius - 0.002);
	// force = pixelize(force, 512.0);

   	// angle = rand(p) * PI2;
   	//angle = rand(vec2(luminance(texture2D(uFramebuffer, uv).rgb), 0.0)) * PI2;
   	// force += vec2(cos(angle), sin(angle)) * 0.001;

   	vec4 color = texture2D(uFramebuffer, vTexCoord);

   	// force += rand(colorBuffer.rg) * 0.001;


	//color.rgb *= texture2D(uFramebuffer, vTexCoord + force * 0.01).rgb;

	// vec4 color = texture2D(uFramebuffer, vTexCoord);//m + force);//(vec2(0.5) + force - m * 0.01);
	// uv.y += offsetYAnimation;
	vec4 picture = texture2D(uVideo, uv);

	// picture.rgb *= 4.0;
	// // if (length(p) < 0.01) 
	// float red = picture.r - picture.g - picture.b;
	// float blue = picture.b - picture.g - picture.r;
	// float green = picture.g - picture.r - picture.b;
	// float seuil = 0.0;
	// if (red > seuil || blue > seuil || green > seuil)
	// if (luminance(picture.rgb) > 0.25)// + 0.5 * t)
	if (length(posterize(color.rgb, 4.0) - posterize(picture.rgb, 4.0)) > 0.5)
	// if (picture.a > 0.0)
	{
		color = picture;//mix(color, picture, 0.05);
		// if (rand(vTexCoord + vec2(uTimeElapsed * 0.5)) < 0.5)
		// {
		// 	color = vec4(
		// 		rand(vTexCoord + vec2(uTimeElapsed * 0.1235)), 
		// 		rand(vTexCoord + vec2(-uTimeElapsed)), 
		// 		rand(vTexCoord + vec2(uTimeElapsed * 0.35)), 
		// 		1.0);
		// }
		// else
		// {
		// 	color = vec4(0.0, 0.0, 0.0, 1.0);
		// }
	}
	else
	{
		// float a = rand(color.rg + color.b) * PI2;
		color = texture2D(uFramebuffer, pixelize(vTexCoord, 32.0));
		float lum = luminance(color.rgb);
		float a = rand(vec2(lum, 0.0)) * PI2;
		vec2 d = vec2(cos(a), sin(a));
		color = texture2D(uFramebuffer, vec2(0.5) + 0.004 * d + force);
		// color.rgb *= 0.9;
	}
	// else if (rand(vTexCoord.xy + uTimeElapsed) < 0.01) color = vec4(rand(vTexCoord.xy + uTimeElapsed), cos(uTimeElapsed) * 0.5 + 0.5, sin(uTimeElapsed) * 0.5 + 0.5, 1.0);

	gl_FragColor = color;
}
