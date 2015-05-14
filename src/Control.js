var Control = {};

Control.parameterCount = 8;
Control.parameterList = [];
Control.parameterSeedList = [];
// Control.parameterKeys = 

Control.acceleration = 0.01;

Control.minimum = -1.0;
Control.maximum = 1.0;

Control.Init = function ()
{
	for (var p = 0; p < Control.parameterCount; ++p)
	{
		Control.parameterList.push(0);
		Control.parameterSeedList.push(0);
	}
};

Control.GetParameter = function (number)
{
	switch (number)
	{
		case 1 : return Control.parameterList[0]; break;
		case 2 : return Control.parameterList[1]; break;
		case 3 : return Control.parameterList[2]; break;
		case 4 : return Control.parameterList[3]; break;
		case 5 : return Control.parameterList[4]; break;
		case 6 : return Control.parameterList[5]; break;
		case 7 : return Control.parameterList[6]; break;
		case 8 : return Control.parameterList[7]; break;
	}
};

Control.Update = function ()
{
	// DEBUG

	if (Filter.isReady)
	{
		if (Input.keyC) Filter.TestFilter.uniforms.uClear.value = 1.0;
		else Filter.TestFilter.uniforms.uClear.value = 0.0;
	}

	// ARROWS

	if (Input.keyLeft) Control.parameterList[0] = Control.Decrement(Control.parameterList[0]);
	if (Input.keyRight) Control.parameterList[0] = Control.Increment(Control.parameterList[0]);
	if (Input.keyDown) Control.parameterList[1] = Control.Decrement(Control.parameterList[1]);
	if (Input.keyUp) Control.parameterList[1] = Control.Increment(Control.parameterList[1]);

	// CUSTOM BUTTONS

	if (Input.keyR) Control.parameterList[0] = Control.Decrement(Control.parameterList[0]);
	if (Input.keyT) Control.parameterList[0] = Control.Increment(Control.parameterList[0]);

	if (Input.keyG) Control.parameterList[1] = Control.Increment(Control.parameterList[1]);
	if (Input.keyF) Control.parameterList[1] = Control.Decrement(Control.parameterList[1]);

	if (Input.keyV) Control.parameterList[2] = Control.Increment(Control.parameterList[2]);
	if (Input.keyB) Control.parameterList[2] = Control.Decrement(Control.parameterList[2]);

	if (Input.keyX) Control.parameterList[3] = Control.Increment(Control.parameterList[3]);
	if (Input.keyC) Control.parameterList[3] = Control.Decrement(Control.parameterList[3]);

	if (Input.keyY) Control.parameterList[4] = Control.Increment(Control.parameterList[4]);
	if (Input.keyU) Control.parameterList[4] = Control.Decrement(Control.parameterList[4]);
};

Control.Decrement = function (number)
{
	return clamp(number - Control.acceleration, Control.minimum, Control.maximum);
};

Control.Increment = function (number)
{
	return clamp(number + Control.acceleration, Control.minimum, Control.maximum);
};

Control.Rumble = function ()
{
	for (var p = 0; p < Control.parameterCount; ++p)
	{
		Control.parameterSeedList[p] = Math.random() > 0.5 ? 1 : -1;
	}
};

Control.Rumbling = function (ratio)
{
	for (var p = 0; p < Control.parameterCount; ++p)
	{
		Control.parameterList[p] = mix(0.0, Control.parameterSeedList[p], ratio);
	}
};

Control.DoesParameterDifferenceIsLessThan = function (treshold)
{
	for (var p = 0; p < Filter.currentParameterCount; p++)
	{
		if (Math.abs(Control.parameterList[p]) > treshold)
		{
			return false;
		}
	}
	return true;
};

Control.Clear = function ()
{
	for (var p = 0; p < Control.parameterList.length; ++p)
	{
		Control.parameterList[p] = 0;
	}
};
