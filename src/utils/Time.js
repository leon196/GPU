var Time = {};

Time.scale = 1000.0;
Time.started = new Date();

Time.GetElapsed = function ()
{
	return (new Date() - Time.started) / Time.scale;
}