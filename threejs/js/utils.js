
// http://www.html5canvastutorials.com/advanced/html5-canvas-animation-stage/
window.requestAnimFrame = (function(callback) { 
    return window.requestAnimationFrame 
    || window.webkitRequestAnimationFrame 
    || window.mozRequestAnimationFrame 
    || window.oRequestAnimationFrame 
    || window.msRequestAnimationFrame 
    || function(callback) { window.setTimeout(callback, 1000 / 60);};
})();

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

//
function animationRatio(start, delay, time) { return clamp((time - start) / delay, 0.0, 1.0); }