var Player = {};

Player.parameter1 = 0.0;
Player.parameter2 = 0.0;
Player.parameter3 = 0.0;
Player.parameter4 = 0.0;
Player.parameter5 = 0.0;
Player.parameter6 = 0.0;

Player.acceleration = 0.01;

Player.minimum = -1.0;
Player.maximum = 1.0;

Player.Update = function ()
{
	if (Input.keyR) Player.parameter1 = Player.Decrement(Player.parameter1);
	if (Input.keyT) Player.parameter1 = Player.Increment(Player.parameter1);
	if (Input.keyG) Player.parameter2 = Player.Increment(Player.parameter2);
	if (Input.keyF) Player.parameter2 = Player.Decrement(Player.parameter2);
	if (Input.keyV) Player.parameter3 = Player.Increment(Player.parameter3);
	if (Input.keyB) Player.parameter3 = Player.Decrement(Player.parameter3);
	if (Input.keyX) Player.parameter4 = Player.Increment(Player.parameter4);
	if (Input.keyC) Player.parameter4 = Player.Decrement(Player.parameter4);
	if (Input.keyY) Player.parameter5 = Player.Increment(Player.parameter5);
	if (Input.keyU) Player.parameter5 = Player.Decrement(Player.parameter5);
};

Player.Decrement = function (number)
{
	return clamp(number - Player.acceleration, Player.minimum, Player.maximum);
};

Player.Increment = function (number)
{
	return clamp(number + Player.acceleration, Player.minimum, Player.maximum);
};