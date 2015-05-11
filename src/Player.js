var Player = {};

Player.parameterCount = 8;
Player.parameterList = [];
Player.parameterSeedList = [];
// Player.parameterKeys = 

Player.acceleration = 0.01;

Player.minimum = -1.0;
Player.maximum = 1.0;

Player.Init = function ()
{
	for (var p = 0; p < Player.parameterCount; ++p)
	{
		Player.parameterList.push(0);
		Player.parameterSeedList.push(0);
	}
};

Player.Update = function ()
{
	if (Input.keyR) Player.parameterList[0] = Player.Decrement(Player.parameterList[0]);
	if (Input.keyT) Player.parameterList[0] = Player.Increment(Player.parameterList[0]);

	if (Input.keyG) Player.parameterList[1] = Player.Increment(Player.parameterList[1]);
	if (Input.keyF) Player.parameterList[1] = Player.Decrement(Player.parameterList[1]);

	if (Input.keyV) Player.parameterList[2] = Player.Increment(Player.parameterList[2]);
	if (Input.keyB) Player.parameterList[2] = Player.Decrement(Player.parameterList[2]);

	if (Input.keyX) Player.parameterList[3] = Player.Increment(Player.parameterList[3]);
	if (Input.keyC) Player.parameterList[3] = Player.Decrement(Player.parameterList[3]);

	if (Input.keyY) Player.parameterList[4] = Player.Increment(Player.parameterList[4]);
	if (Input.keyU) Player.parameterList[4] = Player.Decrement(Player.parameterList[4]);
};

Player.Decrement = function (number)
{
	return clamp(number - Player.acceleration, Player.minimum, Player.maximum);
};

Player.Increment = function (number)
{
	return clamp(number + Player.acceleration, Player.minimum, Player.maximum);
};

Player.Rumble = function ()
{
	for (var p = 0; p < Player.parameterCount; ++p)
	{
		Player.parameterSeedList[p] = Math.random() > 0.5 ? 1 : -1;
	}
};

Player.Rumbling = function (ratio)
{
	for (var p = 0; p < Player.parameterCount; ++p)
	{
		Player.parameterList[p] = mix(0.0, Player.parameterSeedList[p], ratio);
	}
};

Player.DoesParameterDifferenceIsLessThan = function (treshold)
{
	for (var p = 0; p < Filter.currentParameterCount; p++)
	{
		if (Math.abs(Player.parameterList[p]) > treshold)
		{
			return false;
		}
	}
	return true;
};

Player.Clear = function ()
{
	for (var p = 0; p < Player.parameterList.length; ++p)
	{
		Player.parameterList[p] = 0;
	}
};
