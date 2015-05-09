function Effect(fragmentSource)
{
    PIXI.AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        fragmentSource,
        // set the uniforms
        {
            uTimeElapsed : {type : '1f', value : 0}
        }
    );
}

Effect.prototype = Object.create(PIXI.AbstractFilter.prototype);
Effect.prototype.constructor = Effect;