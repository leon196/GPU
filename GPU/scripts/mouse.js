
var mouse = { x: 0, y: 0, clic: false };

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);
document.addEventListener('touchmove', onTouchMove, {passive: false});
document.addEventListener('touchstart', onTouchDown, {passive: false});
document.addEventListener('touchend', onTouchUp, {passive: false});

function onMove (x, y) {
  mouse.x = x;
  mouse.y = y;
}

function onClic (x, y) {
  mouse.x = x;
  mouse.y = y;
  mouse.clic = true;
}

function onUnclic () {
  mouse.clic = false;
}

function onMouseMove (event) { onMove(event.clientX, event.clientY); }
function onMouseDown (event) { onClic(event.clientX, event.clientY) }
function onMouseUp (event)   { onUnclic(); }
function onTouchMove (event) {
  event.preventDefault();
  onMove(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
}
function onTouchDown (event) {
  event.preventDefault();
  onClic(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
}
function onTouchUp (event) {
  event.preventDefault();
  onUnclic();
}