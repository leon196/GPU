function DistortionFilter(fragmentSource)
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
            , uParameter3 : {type : '1f', value: 0}
            , uParameter4 : {type : '1f', value: 0}
            , uParameter5 : {type : '1f', value: 0}
            , uParameter6 : {type : '1f', value: 0}
        }
    );
}

DistortionFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
DistortionFilter.prototype.constructor = DistortionFilter;