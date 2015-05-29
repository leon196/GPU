var Scene = function() 
{
    // GUI
    PIXI.Container.call(this);
    this.interactive = true;

    // Background
    this.background = new Graphics();
    this.addChild(this.background);

    this.Setup = function ()
    {
        this.filters = [Filter.Raymarching];
    };

    this.Update = function ()
    {
    };

    this.Resize = function ()
    {
        this.background.Resize();
    };
};

Scene.prototype = Object.create(PIXI.Container.prototype);
Scene.prototype.constructor = Scene;