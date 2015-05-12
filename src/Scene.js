var Scene = function() 
{
    // GUI
    PIXI.Container.call(this);
    this.interactive = true;

    // Menu
    this.menu = new Menu();
    this.addChild(this.menu);

    // Photo
    this.photo = new PIXI.Sprite(PIXI.Texture.fromImage("img/image.jpg"));
    this.photo.width = Screen.size.width;
    this.photo.height = Screen.size.height;
    this.photo.visible = false;
    this.addChild(this.photo);

    // Logic
    this.currentLevel = 0;

    this.Setup = function ()
    {
        this.menu.Setup();
    };

    this.Start = function ()
    {
        this.ShowLevel();

        // Add Filters
        this.filters = [Filter.filters[Filter.currentFilterIndex]];
    };

    this.Update = function ()
    {
    };

    this.ShowMenu = function ()
    {
        this.menu.visible = true;
        this.photo.visible = false;
    };

    this.ShowLevel = function ()
    {
        this.menu.visible = false;
        this.photo.visible = true;
    };

    this.Restart = function ()
    {
    };

    this.Resize = function ()
    {
        this.menu.Resize();

        this.photo.width = Screen.size.width;
        this.photo.height = Screen.size.height;
    };

    this.UpdatePhoto = function (image)
    {
        Engine.scene.removeChild(Engine.scene.photo);
        Engine.scene.photo = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(image)));
        Engine.scene.photo.width = Screen.size.width;
        Engine.scene.photo.height = Screen.size.height;
        Engine.scene.addChildAt(Engine.scene.photo, 1);
    };
};

Scene.prototype = Object.create(PIXI.Container.prototype);
Scene.prototype.constructor = Scene;