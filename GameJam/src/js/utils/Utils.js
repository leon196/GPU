// http://www.html5canvastutorials.com/advanced/html5-canvas-animation-stage/
window.requestAnimFrame = (function(callback) { 
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60);};})();

function random(range)
{
	return Math.floor( Math.random() * range );
}

function randomUniqueList(range)
{
	list = [];
	for (var r = 0; r < range; ++r)
	{
		list.push(r);
	}
	return shuffle(list);
}

// From internet, dont remember where
function shuffle(array) 
{
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
function BoundsCollisionTest(bounds1, bounds2)
{
	if (PointCollisionTest(bounds1.x, bounds1.y, bounds2)) { return true; }
	if (PointCollisionTest(bounds1.x, bounds1.y + bounds1.height, bounds2)) { return true; }
	if (PointCollisionTest(bounds1.x + bounds1.width, bounds1.y, bounds2)) { return true; }
	if (PointCollisionTest(bounds1.x + bounds1.width, bounds1.y + bounds1.height, bounds2)) { return true; }
	if (PointCollisionTest(bounds2.x, bounds2.y, bounds1)) { return true; }
	if (PointCollisionTest(bounds2.x, bounds2.y + bounds2.height, bounds1)) { return true; }
	if (PointCollisionTest(bounds2.x + bounds2.width, bounds2.y, bounds1)) { return true; }
	if (PointCollisionTest(bounds2.x + bounds2.width, bounds2.y + bounds2.height, bounds1)) { return true; }
	return false;
}

function PointCollisionTest(x, y, bounds) {
	if (x >= bounds.x) {
		if (x <= (bounds.x + bounds.width)) {
			if (y >= bounds.y) {
				if (y <= (bounds.y + bounds.height)) {
					return true;
				}
			}
		}
	}
	return false;
}

function positionArea(row, col)
{
	return { x:area.x + row * area.cellSize - area.cellSize/2, y:area.y + col * area.cellSize - area.cellSize/2 };
}

function drawGrid()
{
	var count = area.dimension * area.dimension;
	grid.clear();
	grid.lineStyle(2, 0xcccccc);
	for (var l = 0; l < count; l++) {
		var pos = positionArea(l%area.dimension, Math.floor(l/area.dimension));
		grid.drawRect( pos.x + area.cellSize/2, pos.y + area.cellSize/2, area.cellSize, area.cellSize);
	}
}

function resizeArea()
{
	//
	minSize = Math.min(window.innerWidth, window.innerHeight);
	globalScale = minSize / defaultSize;
	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;
	areaSize = minSize * 0.8;
	area.x = windowWidth/2 - areaSize/2;
	area.y = windowHeight/2 - areaSize/2;
	area.dimension = levels != undefined ? levels[currentLevel].dimension : dimensionDefault;
	area.cellSize = areaSize/area.dimension;
	area.w = areaSize;
	area.h = areaSize;

	resize(background);
	resize(layerUI);
	//resize(layerCondiments)

	if (characters != undefined) {
		for (var c = 0; c < characters.length; c++) {
			var character = characters[c];
			character.resize();
		}
	}
}

function resize(stuff)
{
	if (stuff != undefined) {
		stuff.scale.x = stuff.scale.y = globalScale;
		stuff.x = windowWidth/2;
		stuff.y = windowHeight/2;
	}
}

//
function onResize()
{
	//
	resizeArea();
	//
	drawGrid();
	//
	renderer.resize(windowWidth, windowHeight);
}

// Simple Collision Test
function DistanceTest(bounds1, bounds2)
{
	var dist = distance(bounds1.x + bounds1.width * 0.5, bounds1.y + bounds1.height * 0.5, bounds2.x + bounds2.width * 0.5, bounds2.y + bounds2.height * 0.5);
	// return dist < Math.max(bounds1.width, Math.max(bounds1.height, Math.max(bounds2.width, bounds2.height)));
	return dist < bounds1.width * 0.5 || dist < bounds1.height * 0.5 || dist < bounds2.width * 0.5 || dist < bounds2.height * 0.5;
}
function distance(x1, y1, x2, y2) {
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function randomHead() {
	return textureHeads[Math.floor(Math.random() * textureHeads.length)];
}
function randomArm() {
	return textureArms[Math.floor(Math.random() * textureArms.length)];
}
function randomStuff() {
	if (Math.random() > 0.5) {
		return textureStuffs[Math.floor(Math.random() * textureStuffs.length)];
	} else {
		return randomPlate();
	}
}
function randomPlate() {
	return texturePlates[Math.floor(Math.random() * texturePlates.length)];
}

function randomSkinColor() {
	return Math.random() * 0x0000cc;//skinColors[Math.floor(Math.random() * skinColors.length)];
}

function SprayRandomStuff(randomStuffCount)
{
	var countCases = area.dimension * area.dimension;
	randomStuffCount = Math.min(randomStuffCount, countCases)
	var rndPos = [];
	for (var s = 0; s < countCases; s++) { rndPos.push(s); }
	shuffle(rndPos);
	// Random Stuff
	for (var s = 0; s < randomStuffCount; s++) {
		var sprite = new PIXI.Sprite(randomStuff());
		sprite.scale.x = sprite.scale.y = globalScale * 0.8;
		sprite.alpha = 0;
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		// sprite.x = Math.random() * 
		// sprite.x = (s % dimension)/(dimension*2) * windowWidth + windowWidth/2 - windowWidth * 1/(dimension*2);
		// sprite.y = (Math.floor(s/dimension))/(dimension*2) * windowHeight + windowHeight/2 - windowHeight * 1/(dimension*2);
		var pos = positionArea(rndPos[s]%area.dimension, Math.floor(rndPos[s]/area.dimension));
		sprite.x = pos.x + area.cellSize;
		sprite.y = pos.y + area.cellSize;
		//sprite.rotation = Math.random() * pi2;
		layerStuffs.addChild(sprite);
		stuffs.push({ caught: false, type: -1, sprite: sprite });
	}
}
*/

/*
levels =  [
	{ x: 1/8 * windowWidth, y: 0, rot: 270, start: 0.1, end: 0.9 },
	{ x: 1/4 * windowWidth, y: 0, rot: 90, start: 0.1, end: 0.75 },
	{ x: 1/2 * windowWidth, y: 0, rot: 270, start: 0.25, end: 0.75 },
	{ x: 3/4 * windowWidth, y: 0, rot: 90, start: 0.1, end: 0.9 },
	{ x: 0, y: 1/4 * windowHeight, rot: 180, start: 0.5, end: 0.9 },
	{ x: 0, y: 1/2 * windowHeight, rot: 180, start: 0.25, end: 0.7 },
	{ x: 0, y: 1/2 * windowHeight, rot: 0, start: 0.1, end: 0.4 },
	{ x: 0, y: 3/4 * windowHeight, rot: 0, start: 0.25, end: 0.75}
];
*/