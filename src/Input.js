
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
Input.keyH = false;
Input.keyJ = false;
Input.keyK = false;
Input.keyL = false;
Input.keyI = false;
Input.keyO = false;

Input.keyCodes = [[70, 71], [82, 84], [86, 66], [88, 67], [89, 85], [72, 74], [75, 76], [73, 79]];

Input.Rumble = function ()
{
    Input.keyCodes = shuffle(Input.keyCodes);
};

Input.KeyDown = function (event)
{
	switch (event.keyCode)
	{
        case Input.keyCodes[0][0]: Input.keyF = true; break;
        case Input.keyCodes[0][1]: Input.keyG = true; break;

		case Input.keyCodes[1][0]: Input.keyR = true; break;
        case Input.keyCodes[1][1]: Input.keyT = true; break;

        case Input.keyCodes[2][0]: Input.keyV = true; break;
        case Input.keyCodes[2][1]: Input.keyB = true; break;

        case Input.keyCodes[3][0]: Input.keyX = true; break;
        case Input.keyCodes[3][1]: Input.keyC = true; break;

        case Input.keyCodes[4][0]: Input.keyY = true; break;
        case Input.keyCodes[4][1]: Input.keyU = true; break;

        case Input.keyCodes[5][0]: Input.keyH = true; break;
        case Input.keyCodes[5][1]: Input.keyJ = true; break;

        case Input.keyCodes[6][0]: Input.keyK = true; break;
        case Input.keyCodes[6][1]: Input.keyL = true; break;

        case Input.keyCodes[7][0]: Input.keyI = true; break;
        case Input.keyCodes[7][1]: Input.keyO = true; break;
	}
}

Input.KeyUp = function (event)
{
	switch (event.keyCode)
	{
        case Input.keyCodes[0][0]: Input.keyF = false; break;
        case Input.keyCodes[0][1]: Input.keyG = false; break;

		case Input.keyCodes[1][0]: Input.keyR = false; break;
        case Input.keyCodes[1][1]: Input.keyT = false; break;

        case Input.keyCodes[2][0]: Input.keyV = false; break;
        case Input.keyCodes[2][1]: Input.keyB = false; break;

        case Input.keyCodes[3][0]: Input.keyX = false; break;
        case Input.keyCodes[3][1]: Input.keyC = false; break;

        case Input.keyCodes[4][0]: Input.keyY = false; break;
        case Input.keyCodes[4][1]: Input.keyU = false; break;

        case Input.keyCodes[5][0]: Input.keyH = false; break;
        case Input.keyCodes[5][1]: Input.keyJ = false; break;

        case Input.keyCodes[6][0]: Input.keyK = false; break;
        case Input.keyCodes[6][1]: Input.keyL = false; break;

        case Input.keyCodes[7][0]: Input.keyI = false; break;
        case Input.keyCodes[7][1]: Input.keyO = false; break;
	}
}

// Keyboard Event
window.addEventListener("keydown", Input.KeyDown, false);
window.addEventListener("keyup", Input.KeyUp, false);
