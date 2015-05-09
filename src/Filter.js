var Filter = {};

Filter.isReady = false;

Filter.effect;
Filter.TVFilter;

Filter.Setup = function (res)
{
    Filter.effect = new Effect(res.shader.data);
    Filter.TVFilter = new TVFilter(res.TVFilter.data);

    Filter.isReady = true;
};

Filter.Update = function ()
{
	if (Filter.isReady)
	{
		Filter.TVFilter.uniforms.uTimeElapsed.value = Time.GetElapsed();

		Filter.TVFilter.uniforms.uParameter1.value = Player.parameter1;
		Filter.TVFilter.uniforms.uParameter2.value = Player.parameter2;
		Filter.TVFilter.uniforms.uParameter3.value = Player.parameter3;
		Filter.TVFilter.uniforms.uParameter4.value = Player.parameter4;
		Filter.TVFilter.uniforms.uParameter5.value = Player.parameter5;
		Filter.TVFilter.uniforms.uParameter6.value = Player.parameter6;
	}
};