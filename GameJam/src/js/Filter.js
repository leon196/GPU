
var Filter = {}

Filter.Raymarching
Filter.isReady = false

Filter.Setup = function (res)
{
    Filter.Raymarching = new Raymarching(res.Raymarching.data)
    Filter.isReady = true
}

Filter.Update = function ()
{
	if (Filter.isReady)
	{
		Filter.Raymarching.uniforms.uTimeElapsed.value = Time.GetElapsed()
		Filter.Raymarching.uniforms.uResolution.value = [Screen.size.width, Screen.size.height]
		Filter.Raymarching.uniforms.uMouse.value = [Input.mousePosition.x, Input.mousePosition.y];
	}
}