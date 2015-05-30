var Menu = function() 
{
    // GUI
    PIXI.Container.call(this);
    this.interactive = true;

    // Logic
    this.startButtonIsPressed = false;

    // Containers

    this.titleContainer = new Graphics();
    this.titleContainer.transparent = true;
    this.titleContainer.Resize();
    this.addChild(this.titleContainer);

    this.startContainer = new Graphics();
    this.startContainer.transparent = true;
    this.startContainer.Resize();
    this.addChild(this.startContainer);

    this.textContainer = new PIXI.Container();
    this.addChild(this.textContainer);

    // Texts

    this.title = new PIXI.Text('GPU', {font : '300px Flaticon', fill : '#ffffff', align : 'center'});
    this.title.anchor.x = 0.5;
    this.titleContainer.addChild(this.title);

    this.subTitle = new PIXI.Text('Glitch Processing Unit', {font : '47px Flaticon', fill : '#ffffff', align : 'center'});
    this.subTitle.anchor.x = 0.5;
    this.textContainer.addChild(this.subTitle);

    this.subsubTitle = new PIXI.Text('( easy Keyboard version with 5 levels only )', {font : '25px Flaticon', fill : '#ffffff', align : 'center'});
    this.subsubTitle.anchor.x = 0.5;
    this.textContainer.addChild(this.subsubTitle);

    this.manual = new PIXI.Text('use arrows to calibrate glitches', {font : '67px Flaticon', fill : '#ffffff', align : 'center'});
    this.manual.anchor.x = 0.5;
    this.manual.anchor.y = 0.5;
    this.textContainer.addChild(this.manual);

    this.credits = new PIXI.Text('Tatiana Vilela          Leon Denise\n\nGrande Confiture de Jeux 2015\n', {font : '42px Flaticon', fill : '#ffffff', align : 'center'});
    this.credits.anchor.x = 0.5;
    this.credits.anchor.y = 1.0;
    this.textContainer.addChild(this.credits);

    this.start = new PIXI.Text('START', {font : '100px Flaticon', fill : '#ffffff', align : 'center'});
    this.start.anchor.x = 0.5;
    this.start.anchor.y = 1.0;
    this.startContainer.addChild(this.start);

    // Start Button
    var self = this;
    this.start.interactive = true;
    this.start.buttonMode = true;
    this.start.mousedown = this.start.touchstart = this.start.tap = function (e)
    {
        self.startButtonIsPressed = true;
    };
    this.start.mouseover = function (e)
    {
        self.startContainer.filters = [Filter.TitleFilter];
    };
    this.start.mouseupoutside = this.start.mouseout = this.start.mouseup = function (e)
    {
        self.startContainer.filters = [Filter.MenuFilter];
    };

    this.Setup = function ()
    {
	    this.titleContainer.filters = [Filter.TitleFilter];
	    this.textContainer.filters = [Filter.MenuFilter];	
        self.startContainer.filters = [Filter.MenuFilter];
    };

    this.Update = function ()
    {
        if (Filter.isReady)
        {
            Filter.TitleFilter.uniforms.uTimeElapsed.value = Time.GetElapsed();
            Filter.TitleFilter.uniforms.uParameter1.value = Control.GetParameter(1);
            Filter.TitleFilter.uniforms.uParameter2.value = Control.GetParameter(2);
            
            Filter.MenuFilter.uniforms.uTimeElapsed.value = Time.GetElapsed();
            Filter.MenuFilter.uniforms.uParameter1.value = Control.GetParameter(1);
            Filter.MenuFilter.uniforms.uParameter2.value = Control.GetParameter(2);
        }
    };

    this.Resize = function ()
    {
        this.titleContainer.Resize();
        this.startContainer.Resize();

        this.title.x = Screen.size.width / 2;
        this.title.y = 0;

        this.subTitle.x = Screen.size.width / 2;
        this.subTitle.y = this.title.y + this.title.height;

        this.subsubTitle.x = Screen.size.width / 2;
        this.subsubTitle.y = this.subTitle.y + this.subTitle.height + this.subsubTitle.height / 2;

        this.manual.x = Screen.size.width / 2;
        this.manual.y = Screen.size.height / 2;

        this.start.x = Screen.size.width / 2;
        this.start.y = Screen.size.height * 3 / 4;//this.manual.y + this.manual.height;

        this.credits.x = Screen.size.width / 2;
        this.credits.y = Screen.size.height;
    };

    this.Resize();
};

Menu.prototype = Object.create(PIXI.Container.prototype);
Menu.prototype.constructor = Menu;