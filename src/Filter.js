var Filter = {};

Filter.isReady = false;

Filter.filters = [];
Filter.currentFilterIndex = 0;
Filter.currentParameterCount = 0;

Filter.effect;
Filter.TVFilter;

Filter.Setup = function (res)
{
    Filter.effect = new Effect(res.shader.data);

    Filter.PhotoFilter = new PhotoFilter(res.PhotoFilter.data);

    Filter.TVFilter = new TVFilter(res.TVFilter.data);

	Filter.DistortionFilter = new DistortionFilter(res.DistortionFilter.data);
	
	Filter.filters = 
		[ Filter.PhotoFilter
		, Filter.TVFilter
		, Filter.DistortionFilter ];

	Filter.SetParameterCount();

    Filter.isReady = true;
};

Filter.SetParameterCount = function ()
{
	var currentFilter = Filter.filters[Filter.currentFilterIndex];
	Filter.currentParameterCount = currentFilter.uniforms.uParameterCount.value;
};

Filter.Update = function ()
{
	if (Filter.isReady)
	{
		var currentFilter = Filter.filters[Filter.currentFilterIndex];

		currentFilter.uniforms.uTimeElapsed.value = Time.GetElapsed();
		currentFilter.uniforms.uResolution.value = [Screen.size.width, Screen.size.height];

		if (Filter.currentParameterCount > 0) currentFilter.uniforms.uParameter1.value = Player.parameterList[0];
		if (Filter.currentParameterCount > 1) currentFilter.uniforms.uParameter2.value = Player.parameterList[1];
		if (Filter.currentParameterCount > 2) currentFilter.uniforms.uParameter3.value = Player.parameterList[2];
		if (Filter.currentParameterCount > 3) currentFilter.uniforms.uParameter4.value = Player.parameterList[3];
		if (Filter.currentParameterCount > 4) currentFilter.uniforms.uParameter5.value = Player.parameterList[4];
		if (Filter.currentParameterCount > 5) currentFilter.uniforms.uParameter6.value = Player.parameterList[5];
		if (Filter.currentParameterCount > 6) currentFilter.uniforms.uParameter7.value = Player.parameterList[6];
		if (Filter.currentParameterCount > 7) currentFilter.uniforms.uParameter8.value = Player.parameterList[7];
	}
};