var Scene = function() 
{
    // GUI
    PIXI.Container.call(this);
    this.interactive = true;

    // Background
    this.background = new PIXI.Graphics();
    this.background.beginFill(0x000000);
    this.background.drawRect(0, 0, Screen.size.width, Screen.size.height);
    this.background.endFill();
    this.addChild(this.background);

    // Menu
    this.menu = new PIXI.Container();
    this.addChild(this.menu);

    // Title Container
    this.title = new PIXI.Graphics();
    this.title.beginFill(0x000000);
    this.title.drawRect(0,0,Screen.size.width,Screen.size.height);
    this.title.endFill();
    this.menu.addChild(this.title);

    // Title
    this.titleText = new PIXI.Text('GPU', {font : '500px Flaticon', fill : '#ffffff', align : 'center'});
    this.titleText.anchor.x = this.titleText.anchor.y = 0.5;
    this.titleText.x = Screen.size.width / 2;
    this.titleText.y = Screen.size.height / 2;
    this.title.addChild(this.titleText);

    // SubTitle
    this.subTitle = new PIXI.Text('Glitch Processing Unit', {font : '75px Flaticon', fill : '#ffffff', align : 'center'});
    this.subTitle.anchor.x = this.subTitle.anchor.y = 0.5;
    this.subTitle.x = Screen.size.width / 2;
    this.subTitle.y = Screen.size.height / 2 + this.titleText.height / 2 + this.subTitle.height / 2;
    this.menu.addChild(this.subTitle);

    // Credits
    this.credits = new PIXI.Text('made by @MechBird and @leondenise\nfor Grande Confiture de Jeux 2015', {font : '32px Flaticon', fill : '#ffffff', align : 'center'});
    this.credits.anchor.x = this.credits.anchor.y = 0.5;
    this.credits.x = Screen.size.width / 2;
    this.credits.y = this.subTitle.y + this.subTitle.height + this.credits.height / 2;
    this.menu.addChild(this.credits);

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
        this.title.filters = [Filter.TitleFilter];
        this.subTitle.filters = [Filter.MenuFilter];
        this.credits.filters = [Filter.MenuFilter];
    };

    this.Start = function ()
    {
        this.menu.visible = false;
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
        this.background.clear();
        this.background.beginFill(0x000000);
        this.background.drawRect(0, 0, Screen.size.width, Screen.size.height);
        this.background.endFill();

        this.photo.width = Screen.size.width;
        this.photo.height = Screen.size.height;
    };
};

Scene.prototype = Object.create(PIXI.Container.prototype);
Scene.prototype.constructor = Scene;