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
            , uParameter1 : {type : '1f', value: 0}
            , uParameter2 : {type : '1f', value: 0}
            , uParameter3 : {type : '1f', value: 0}
            , uParameter4 : {type : '1f', value: 0}
            , uParameter5 : {type : '1f', value: 0}
            , uParameter6 : {type : '1f', value: 0}
        }
    );
}

TVFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
TVFilter.prototype.constructor = TVFilter;