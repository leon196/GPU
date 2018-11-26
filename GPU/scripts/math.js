

function lerp(v0, v1, t) { return v0*(1-t)+v1*t; } 
function closestPowerOfTwo (num) { return Math.pow(2, Math.ceil(Math.log(num) / Math.log(2))); } 
function distanceFrom (a, b) { return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)); } 
function distNoSqrt (a, b) { return ((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)); } 
function vectorFrom (a,b) {
  return [(b.x-a.x), (b.y-a.y)];
}
function directionFrom (a,b) {
  var len = Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
  return [(b.x-a.x)/len, (b.y-a.y)/len];
}
function shuffle (array) { for (var i = array.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var temp = array[i]; array[i] = array[j]; array[j] = temp; } return array; }
function smoothstep (edge0, edge1, x) { var t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0))); return t * t * (3 - 2 * t); }
var defaultUV = [0, 1, 1, 1, 0, 0, 1, 0];