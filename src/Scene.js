var Scene = function() 
{
    // GUI
    PIXI.Container.call(this);
    this.interactive = true;

    // 
    this.background = new PIXI.Graphics();
    this.background.beginFill(0x00ff00);
    this.background.drawRect(0, 0, Screen.size.width, Screen.size.height);
    this.background.endFill();
    this.addChild(this.background);

    //
    this.photo = new PIXI.Sprite(PIXI.Texture.fromImage("img/image.jpg"));
    this.photo.width = Screen.size.width;
    this.photo.height = Screen.size.height;
    this.addChild(this.photo);

    // Logic
    this.currentLevel = 0;

    this.Setup = function ()
    {
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
        this.background.clear();
        this.background.beginFill(0x00ff00);
        this.background.drawRect(0, 0, Screen.size.width, Screen.size.height);
        this.background.endFill();
        
        this.photo.width = Screen.size.width;
        this.photo.height = Screen.size.height;
    };
};

Scene.prototype = Object.create(PIXI.Container.prototype);
Scene.prototype.constructor = Scene;