
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
		Filter.Raymarching.uniforms.uEquationSelected.value = Engine.scene.equationSelected;
		Filter.Raymarching.uniforms.uEquationCount.value = Engine.scene.equationList.length;
		Filter.Raymarching.uniforms.uSceneSelected.value = Engine.scene.sceneSelected;
		Filter.Raymarching.uniforms.uSceneCount.value = Engine.scene.sceneList.length;
	}
}