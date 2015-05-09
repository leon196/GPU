
var Input = {};

Input.mousePosition = vec2(0,0);

// State
Input.mousePressed = false;

// Triggered once
Input.mouseClic = false;

// Input Events

Input.MouseMove = function(mouseData)
{
    Input.mousePosition = mouseData.data.getLocalPosition(Engine.scene);
};

Input.MouseDown = function(mouseData)
{
    Input.mousePosition = mouseData.data.getLocalPosition(Engine.scene);
    Input.mousePressed = true;
    Input.mouseClic = true;
};

Input.Tap = function(mouseData)
{
    Input.mousePosition = mouseData.data.getLocalPosition(Engine.scene);
    if (Input.mousePressed)
    {
        Input.mousePressed = false;
    }
    else
    {
        Input.mousePressed = true;
    }
    Input.mouseClic = true;
};

Input.MouseUp = function(mouseData)
{
    Input.mousePosition = mouseData.data.getLocalPosition(Engine.scene);
    Input.mousePressed = false;
};

// Keys
Input.keyF = false;
Input.keyG = false;
Input.keyR = false;
Input.keyT = false;
Input.keyV = false;
Input.keyB = false;
Input.keyX = false;
Input.keyC = false;
Input.keyY = false;
Input.keyU = false;

Input.KeyDown = function (event)
{
	switch (event.keyCode)
	{
        case 70: Input.keyF = true; break;
        case 71: Input.keyG = true; break;
		case 82: Input.keyR = true; break;
        case 84: Input.keyT = true; break;
        case 86: Input.keyV = true; break;
        case 66: Input.keyB = true; break;
        case 88: Input.keyX = true; break;
        case 67: Input.keyC = true; break;
        case 89: Input.keyY = true; break;
        case 85: Input.keyU = true; break;
	}

    console.log(event.keyCode);
}

Input.KeyUp = function (event)
{
	switch (event.keyCode)
	{
        case 70: Input.keyF = false; break;
        case 71: Input.keyG = false; break;
		case 82: Input.keyR = false; break;
        case 84: Input.keyT = false; break;
        case 86: Input.keyV = false; break;
        case 66: Input.keyB = false; break;
        case 88: Input.keyX = false; break;
        case 67: Input.keyC = false; break;
        case 89: Input.keyY = false; break;
        case 85: Input.keyU = false; break;
	}
}

// Keyboard Event
window.addEventListener("keydown", Input.KeyDown, false);
window.addEventListener("keyup", Input.KeyUp, false);
