function TVFilter(fragmentSource)
{
    PIXI.AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        fragmentSource,
        // set the uniforms
        {
            uTimeElapsed : {type : '1f', value : 0}
            , uResolution : {type : '2f', value: [0, 0]}
            
            , uParameter1 : {type : '1f', value: 0}
            , uParameter2 : {type : '1f', value: 0}
            
            , uParameterFadeOut : {type : '1f', value: 1.0}

            , uParameterCount : {type: "1i", value: 2}
        }
    );
}

TVFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
TVFilter.prototype.constructor = TVFilter;