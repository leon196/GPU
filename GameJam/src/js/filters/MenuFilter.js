function MenuFilter(fragmentSource)
{
    PIXI.AbstractFilter.call(this,
        // vertex shader
        null,
        // fragment shader
        fragmentSource,
        // set the uniforms
        {
            uTimeElapsed : {type : '1f', value : 0}
            
            , uParameter1 : {type: "1f", value: 0}
            , uParameter2 : {type: "1f", value: 0}
        }
    );
}

MenuFilter.prototype = Object.create(PIXI.AbstractFilter.prototype);
MenuFilter.prototype.constructor = MenuFilter;