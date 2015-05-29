function Raymarching(fragmentSource)
{
    PIXI.AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        fragmentSource,
        // set the uniforms
        {
            uTimeElapsed : {type : '1f', value : 0}
            , uMouse : {type: "2f", value: [0, 0]}
            , uResolution : {type : '2f', value: [0, 0]}

            , uParameter1 : {type: "1f", value: 0}
            , uParameter2 : {type: "1f", value: 0}
        }
    );
}

Raymarching.prototype = Object.create(PIXI.AbstractFilter.prototype);
Raymarching.prototype.constructor = Raymarching;