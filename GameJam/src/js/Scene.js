var Scene = function() 
{
    // GUI
    PIXI.Container.call(this);
    this.interactive = true;

    // Background
    this.background = new Graphics();
    this.background.transparent = true;
    this.background.Resize();
    this.addChild(this.background);

    // Menu
    this.menu = new Menu();
    this.addChild(this.menu);

    // Photo
    this.photo = new PIXI.Sprite(PIXI.Texture.fromImage("img/image.jpg"));
    this.photo.width = Screen.size.width;
    this.photo.height = Screen.size.height;
    this.photo.visible = false;
    this.addChild(this.photo);

    // this.sprite = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(Engine.renderer.view.toDataURL())));
    // Engine.renderTexture.render(this.menu);

    // Logic
    this.currentLevel = 0;

    this.Setup = function ()
    {
        this.menu.Setup();

        // Filter.TestFilter.uniforms.uBackbuffer.value = Engine.renderTexture;
        // this.menu.filters = [Filter.TestFilter];
        // this.filters = [Filter.TestFilter];
    };

    this.Start = function ()
    {
        this.ShowLevel();

        // Add Filters
        this.filters = [Filter.filters[Filter.currentFilterIndex]];
    };

    this.Update = function ()
    {
        // if (Filter.isReady)
        // {
        //     Filter.TestFilter.uniforms.uTimeElapsed.value = Time.GetElapsed();
        //     Filter.TestFilter.uniforms.uResolution.value = [Screen.size.width, Screen.size.height];
        //     Filter.TestFilter.uniforms.uParameter1.value = Control.GetParameter(1);
            // Engine.renderTexture.render(this.sprite);
        // }
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
        this.background.Resize();
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