

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
    Filter.PCFilter = new PCFilter(res.PCFilter.data);
    Filter.PCFilter2 = new PCFilter2(res.PCFilter2.data);
    Filter.PCFilter3 = new PCFilter3(res.PCFilter3.data);
    Filter.LSDFilter = new LSDFilter(res.LSDFilter.data);
    Filter.TitleFilter = new TitleFilter(res.TitleFilter.data);
    Filter.MenuFilter = new MenuFilter(res.MenuFilter.data);
	Filter.LSDFilter2 = new LSDFilter2(res.LSDFilter2.data);

	Filter.TestFilter = new TestFilter(res.TestFilter.data);
	
	Filter.filters = 
		[ Filter.TestFilter
		, Filter.PCFilter2
		, Filter.PCFilter
		, Filter.TVFilter
		, Filter.PCFilter3
		, Filter.LSDFilter ];

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

		if (Filter.currentParameterCount > 0) currentFilter.uniforms.uParameter1.value = Control.GetParameter(1);
		if (Filter.currentParameterCount > 1) currentFilter.uniforms.uParameter2.value = Control.GetParameter(2);
		if (Filter.currentParameterCount > 2) currentFilter.uniforms.uParameter3.value = Control.GetParameter(3);
		if (Filter.currentParameterCount > 3) currentFilter.uniforms.uParameter4.value = Control.GetParameter(4);
		if (Filter.currentParameterCount > 4) currentFilter.uniforms.uParameter5.value = Control.GetParameter(5);
		if (Filter.currentParameterCount > 5) currentFilter.uniforms.uParameter6.value = Control.GetParameter(6);
		if (Filter.currentParameterCount > 6) currentFilter.uniforms.uParameter7.value = Control.GetParameter(7);
		if (Filter.currentParameterCount > 7) currentFilter.uniforms.uParameter8.value = Control.GetParameter(8);
	}
};