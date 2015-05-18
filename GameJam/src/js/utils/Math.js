//
function animationRatio(start, delay, time) { return clamp((time - start) / delay, 0.0, 1.0); }

// 
var PI = 3.14159265358979;
var PI2 = 6.28318530717958;

//
function vec2(xx, yy) { return { x: xx, y: yy }; }
function vec3(xx, yy, zz) { return { x: xx, y: yy, z: zz }; }
function size(ww, hh) { return { width: ww, height: hh }; }
function rect(xx, yy, ww, hh) { return { x: xx, y: yy, width: ww, height: hh }; }

//
function clamp(value, mini, maxi) { return Math.max(mini, Math.min(maxi, value)); }
function pixelate(value, details) { return Math.floor( value * details ) / details ; };

function distance(v1, v2) { return Math.sqrt((v2.x - v1.x) * (v2.x - v1.x) + (v2.y - v1.y) * (v2.y - v1.y)); };

function length (v) { return Math.sqrt(v.x * v.x + v.y * v.y); };
function normalize(v) { var dist = length(v); return vec2(v.x / dist, v.y / dist ); }
function fract(x) { return x % 1; }
function fractVec3(v) { return vec3(v.x % 1, v.y % 1 , v.z % 1); }
function mix(a, b, ratio) { return a * (1 - ratio) + b * ratio };

// https://github.com/gre/smoothstep
function smoothstep (min, max, value) {
  var x = Math.max(0, Math.min(1, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
}

////////////////////////////////////
// From -> http://www.actionscript.org/forums/showthread.php3?t=176052
// By abeall
// dot product of two vectors 
function dot (v1,v2) { return (v1.x*v2.x) + (v1.y*v2.y); } ;
// reflect vector 'v' against normalized vector 'n' 
function reflect (v, n) {     
	// R = V - 2 * (V · N)     
	var d = dot(v,n);  
	return { x: v.x -2 * d * n.x, y: v.y -2 * d * n.y } 
};
////////////////////////////////////

////////////////////////////////////
// hash based 3d value noise
// function taken from [url]https://www.shadertoy.com/view/XslGRr[/url]
// Created by inigo quilez - iq/2013
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

// ported from HLSL to js
function hash( n ) {
	return fract(Math.sin(n)*43758.5453);
}

function noise( seed ) {
    // The noise function returns a value in the range -1.0f -> 1.0f
    var p = vec3(Math.floor(seed.x), Math.floor(seed.y), Math.floor(seed.z));
    var f = fractVec3(seed);
    f.x = f.x*f.x*(3.0-2.0*f.x);
    f.y = f.y*f.y*(3.0-2.0*f.y);
    f.z = f.z*f.z*(3.0-2.0*f.z);
    var n = p.x + p.y*57.0 + 113.0*p.z;
    return mix(mix(mix( hash(n+0.0), hash(n+1.0),f.x),
                   mix( hash(n+57.0), hash(n+58.0),f.x),f.y),
               mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                   mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
}
