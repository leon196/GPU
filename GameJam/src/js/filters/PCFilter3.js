function PCFilter3(fragmentSource)
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

            , uParameter1 : {type: "1f", value: 0}
            , uParameter2 : {type: "1f", value: 0}

            , uParameterCount : {type: "1i", value: 2}
        }
    );
}

PCFilter3.prototype = Object.create(PIXI.AbstractFilter.prototype);
PCFilter3.prototype.constructor = PCFilter3;