 var Text = {};

Text.container;
Text.bitmapText = null;
Text.bitmapTextWhite = null;
Text.spriteRenderTexture = null;

Text.Setup = function ()
{
	Text.container = new PIXI.Container();
};


Text.DrawText = function (textToDraw, ratio)
{
	if (Text.bitmapText != null)
	{
		Text.container.removeChild(Text.bitmapText);
	}

	if (Text.bitmapTextWhite != null)
	{
		Engine.scene.removeChild(Text.bitmapTextWhite);
	}

	var scale = 16.0 + Math.floor(ratio * 512.0);

	Text.bitmapText = new PIXI.extras.BitmapText(textToDraw, { font: scale + "px Generally Speaking", tint: ColorHex.GetRainbow(1.0 - ratio)}); 
	Text.bitmapTextWhite = new PIXI.extras.BitmapText(textToDraw, { font: scale + "px Generally Speaking", tint: 0xffffff}); 

	Text.bitmapText.x = Screen.size.width / 2 - Text.bitmapText.textWidth / 2;
	Text.bitmapText.y = mix(Screen.size.height, Screen.size.height / 2 - Text.bitmapTextWhite.textHeight / 2, ratio);

	Text.bitmapTextWhite.x = Text.bitmapText.x;
	Text.bitmapTextWhite.y = Text.bitmapText.y;

	Text.container.addChild(Text.bitmapText);

    Engine.renderTexture.render(Text.container);

    if (Text.spriteRenderTexture != null)
    {
    	Engine.scene.removeChild(Text.spriteRenderTexture);
    }

    Text.spriteRenderTexture = new PIXI.Sprite(Engine.renderTexture);
    Engine.scene.addChild(Text.spriteRenderTexture);
	Engine.scene.addChild(Text.bitmapTextWhite);
};

Text.Clear = function ()
{
	Engine.renderTexture.clear();

    if (Text.spriteRenderTexture != null)
    {
    	Engine.scene.removeChild(Text.spriteRenderTexture);
		Engine.scene.removeChild(Text.bitmapTextWhite);
    }
};

/*
Text.textList = [];
Text.DrawText = function (textToDraw)
{
	var text = new PIXI.Text('WOoOOOOoW', { font : '32px Arial', fill : Color.Rainbow() });
	text.anchor.x = text.anchor.y = 0.5;
	text.x = Screen.size.width / 2;
	text.y = Screen.size.height / 2;

	Text.textList.push(text);
	Text.container.addChild(text);
};

Text.Update = function (scale)
{
	for (var i = Text.textList.length - 1; i >= 0; --i) 
	{
		var text = Text.textList[i];
		text.scale.x = text.scale.y = scale;
	};
};

Text.Clear = function ()
{
	Text.container.removeChildren();
	Text.textList = [];
};
*/