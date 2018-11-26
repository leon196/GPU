
function createTextCanvas(segments)
{
	var ctx = document.createElement('canvas').getContext('2d');
	ctx.canvas.width = segments[0].width || window.innerWidth;
	ctx.canvas.height = segments[0].height || window.innerHeight;
	var font = segments[0].font;
	segments.forEach(segment => {
		var options = segment || {};
		var fontSize = options.fontSize || 32;
		options.font = options.font || font;
		ctx.font = fontSize + 'px ' + options.font;
		ctx.fillStyle = options.fillStyle || 'white';
		ctx.textAlign = options.textAlign || 'center';
		ctx.textBaseline = options.textBaseline || 'middle';
		ctx.shadowColor = options.shadowColor || 'rgba(0,0,0,.5)';
		ctx.shadowBlur = options.shadowBlur || 4;

		var words = options.text.split('\n');
		var line = '';

		var anchor = options.anchor || [.5,.5];
		var x = ctx.canvas.width * anchor[0];
		var y = ctx.canvas.height * anchor[1];

		x += options.offsetX || 0;
		y += options.offsetY || 0;

		// y = ctx.canvas.height - fontSize;
		y -= Math.max(0, words.length - 1) * fontSize / 2;

		for (var n = 0; n < words.length; n++) {
			line = words[n];
			ctx.fillText(line, x, y);
			y += fontSize;
		}
	})

	return ctx.canvas;
}

function createCanvas(rects) {
	var ctx = document.createElement('canvas').getContext('2d');
	ctx.canvas.width = rects[0].width || window.innerWidth;
	ctx.canvas.height = rects[0].height || window.innerHeight;
	rects.forEach(rect => {
		ctx.fillStyle = rect.fillStyle;
		ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
	});
	return ctx.canvas;
}

function textureFromText(segments)
{
	var texture = new THREE.Texture(createTextCanvas(segments));
	texture.needsUpdate = true;
	texture.minFilter = THREE.LinearFilter;
	return texture;
}

function textureFromRect(rects)
{
	var texture = new THREE.Texture(createCanvas(rects));
	texture.needsUpdate = true;
	texture.minFilter = THREE.LinearFilter;
	return texture;
}
