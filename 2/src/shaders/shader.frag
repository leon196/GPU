
// inspired by http://glslsandbox.com/e#25072.0

precision mediump float;

#define PI 3.141592653589
#define PI2 6.283185307179

uniform sampler2D uFramebuffer;
uniform sampler2D uPicture;
uniform sampler2D uVideo;
uniform float uTimeElapsed;
uniform vec2 uBufferResolution;
uniform vec2 uResolution;
uniform vec2 uMouse;
varying vec2 vTexCoord;

float rand(vec2 co){ return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
float luminance ( vec3 color ) { return (color.r + color.g + color.b) / 3.0; }
vec2 pixelize(vec2 uv, float details) { return floor(uv.xy * details) / details; }
vec3 posterize ( vec3 color, float details ) { return floor(color * details) / details; }

vec2 forceFromNeighborhood (vec2 p, sampler2D map) 
{ 
	float s = 1.0 / uBufferResolution.x;
	vec2 n = vec2(0.0);
	float l = luminance(texture2D(map, p).rgb);

	n.x += luminance(texture2D(map, p - vec2(s, 0.0)).rgb) - l;
	n.x += l - luminance(texture2D(map, p + vec2(s, 0.0)).rgb);
	n.y += luminance(texture2D(map, p - vec2(0.0, s)).rgb) - l;
	n.y += l - luminance(texture2D(map, p + vec2(0.0, s)).rgb);

	return n;
}

vec2 numberOfNeighbord (vec2 p, sampler2D map) 
{ 
	float s = 1.0 / uBufferResolution.x;
	vec2 n = vec2(0.0);
	float l = luminance(texture2D(map, p).rgb);

	n.x += luminance(texture2D(map, p - vec2(s, 0.0)).rgb) - l;
	n.x += l - luminance(texture2D(map, p + vec2(s, 0.0)).rgb);
	n.y += luminance(texture2D(map, p - vec2(0.0, s)).rgb) - l;
	n.y += l - luminance(texture2D(map, p + vec2(0.0, s)).rgb);

	return n;
}

void main() 
{
	float offsetYAnimation = sin(uTimeElapsed * 0.001) * 0.25;


	vec2 uv = vTexCoord;
	uv.y = 1.0 - uv.y;

	vec2 m = uMouse / uResolution;
	m.y = 1.0 - m.y;
	// m = (m - 0.5) * 2.0;

    vec2 p = (vTexCoord - vec2(0.5));

    // p.y += offsetYAnimation;
    // p *= uResolution;
    // p.x *= uResolution.x / uResolution.y;
    float angle = atan(p.y, p.x);
    float radius = length(p);

    float t = sin(uTimeElapsed * 0.001) * 0.5 + 0.5;

   	// vec2 force = vec2(cos(angle), sin(angle)) * (radius - 0.004 + 0.003 * t);
   	// vec2 force = vec2(cos(angle), sin(angle)) * (radius - 0.004);
   	// vec2 force = vec2(cos(angle), sin(angle)) * (radius - 0.004);
   	// vec2 force = vec2(cos(angle), sin(angle)) * radius;

   	vec4 color = texture2D(uFramebuffer, vTexCoord);
 
   	// vec2 force = forceFromNeighborhood(pixelize(uv, 4.0 + 4.0 * rand(color.rg + color.b)), uVideo);
   	vec2 force = forceFromNeighborhood(vTexCoord, uFramebuffer);
   	// vec2 force = forceFromNeighborhood(pixelize(uv, 32.0), uVideo);
   	//vec2(0.0, rand(color.rg + color.b) + 0.5) * 0.008;
   	//-0.5 + rand(p.yy)
   	// force += rand(color.rg) * 0.25;

	// force = pixelize(force, 512.0);

   	// angle = mix(rand(p + vec2(uTimeElapsed * 0.001, 0.0)) * PI2, rand(p) * PI2, clamp(m.y + 0.5, 0.0, 1.0));
   	// angle = rand(color.rg + color.b) * PI2;
   	// force += vec2(cos(angle), sin(angle)) * 0.001;
   	// vec2 force = vec2(cos(angle), sin(angle));


   	// vec2 pp = vTexCoord + force * 0.01;
   	vec2 pp = vTexCoord - force * 0.01;
   	pp = mod(abs(pp), 1.0);

   	color = texture2D(uFramebuffer, pp);



	//color.rgb *= texture2D(uFramebuffer, vTexCoord + force * 0.01).rgb;

	// vec4 color = texture2D(uFramebuffer, vTexCoord);//m + force);//(vec2(0.5) + force - m * 0.01);
	// uv.y += offsetYAnimation;
	vec4 picture = texture2D(uVideo, uv);
	// picture.rgb = posterize(picture.rgb, 8.0);


	// picture.rgb *= 4.0;
	// // if (length(p) < 0.01) 
	// float red = clamp(picture.r - picture.g - picture.b, 0.0, 1.0);
	// float blue = clamp(picture.b - picture.g - picture.r, 0.0, 1.0);
	// float green = clamp(picture.g - picture.r - picture.b, 0.0, 1.0);

	// if (length(p) < 1.0 / uBufferResolution.x)
	// {
	// 	color.rgb = vec3(0.0);
	// }

	// float red = abs(picture.r - color.r);
	// float green = abs(picture.g - color.g);
	// float blue = abs(picture.b - color.b);
	// float seuil = 1.0 - m.x;
	// if (red > seuil || blue > seuil || green > seuil)
	if (distance(color.rgb, picture.rgb) > 0.5)
	// if ()
	// if (luminance(picture.rgb) > m.x)
	// if (picture.a > 0.0)
	// if (red + blue + green > m.x)
	{
		color = picture;
		//color = mix(color, picture, 0.05);
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
	// else
	// {
		// float a = rand(color.rg + color.b) * PI2;

		// color = texture2D(uFramebuffer, vTexCoord);// pixelize(vTexCoord, 32.0));
		// float lum = luminance(color.rgb);
		// float a = rand(vec2(lum, 0.0)) * PI2 + uTimeElapsed * 0.001;
		// a += rand(vTexCoord) * PI2;
		// vec2 d = vec2(cos(a), sin(a));
		// color = texture2D(uFramebuffer, vTexCoord);

		// (rand(vTexCoord) * 0.001 + 0.001) 

		// color.rgb *= 0.9;
	// }
	// else if (rand(vTexCoord.xy + uTimeElapsed) < 0.01) color = vec4(rand(vTexCoord.xy + uTimeElapsed), cos(uTimeElapsed) * 0.5 + 0.5, sin(uTimeElapsed) * 0.5 + 0.5, 1.0);
	// Nice blur
	// color = mix(color, picture, distance(color.rgb, picture.rgb) * 0.1); 
	// if (length(color.rgb) < 0.01)
	// {
	// 	color = picture;	
	// }

	gl_FragColor = color;
}
