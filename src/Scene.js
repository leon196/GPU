var Scene = function() 
{
    // GUI
    PIXI.Container.call(this);
    this.interactive = true;

    // Background
    this.background = new PIXI.Sprite(PIXI.Texture.fromImage("img/background.jpg"));
    this.background.width = Screen.size.width;
    this.background.height = Screen.size.height;
    this.addChild(this.background);

    // Photo
    this.photo = new PIXI.Sprite(PIXI.Texture.fromImage("img/image.jpg"));
    this.photo.width = Screen.size.width;
    this.photo.height = Screen.size.height;
    this.photo.visible = false;
    this.addChild(this.photo);

    // Menu
    this.title = new PIXI.Text('GPU PANIC', {font : '96px Arial', fill : 0x000000, align : 'center'});
    this.title.anchor.x = this.title.anchor.y = 0.5;
    this.title.x = Screen.size.width / 2;
    this.title.y = Screen.size.height / 2;
    this.addChild(this.title);

    // Logic
    this.currentLevel = 0;

    this.Setup = function ()
    { 
    };

    this.Start = function ()
    {
        this.title.visible = false;
        this.photo.visible = true;

        // Add Filters
        this.filters = [Filter.filters[Filter.currentFilterIndex]];
    };

    this.Update = function ()
    {
        Input.mouseClic = false;
    };

    this.Restart = function ()
    {
    };

    this.Resize = function ()
    {
        this.background.width = Screen.size.width;
        this.background.height = Screen.size.height;

        this.photo.width = Screen.size.width;
        this.photo.height = Screen.size.height;
    };
};

Scene.prototype = Object.create(PIXI.Container.prototype);
Scene.prototype.constructor = Scene;