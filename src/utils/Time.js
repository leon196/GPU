var Time = {};

Time.scale = 1000.0;
Time.started = new Date();

Time.startingStarted = 0;
Time.startingDelay = 2.0;

Time.winningStarted = 0;
Time.winningDelay = 5.0;

Time.GetElapsed = function ()
{
	return (new Date() - Time.started) / Time.scale;
}