function TitleFilter(fragmentSource)
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

TitleFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
TitleFilter.prototype.constructor = TitleFilter;