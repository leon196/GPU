var Scene = function() 
{
    // GUI
    PIXI.Container.call(this)
    this.interactive = true

    // Background
    this.background = new Graphics()
    this.addChild(this.background)

    this.textMargin = vec2(8, 8)

    // Title
    // this.title = new PIXI.Text("Raymarching with distorsion equations for Gamelier by Leon", {font : '30px bitstream_vera_sans_monoroman', fill : '#ffffff', align : 'center'})
    // this.title.anchor.x = 0.5
    // this.title.x = Screen.size.width / 2
    // this.title.y = this.textMargin.y
    // this.addChild(this.title)

    // Equaducation
    this.equationSelected = 0
    this.equationList = []
    this.equationNameList = [
        'cos(x * (1.0 + 2.0)) * 0.1'
        , '1.0 / (1.0 + exp(2.0 * (x - 0.5)))'
        , '(x * x + sin(3.0 * x)) * 0.2'
        , 'pow(0.25, x - 1.0)'    
        , '1.0 + x + x * cos(x);'
        , '10.0 / (50.0 * sin(PI * (10.0 * x) / 10.0) + 51.0)'
    ]
    for (var i = this.equationNameList.length - 1; i >= 0; --i) 
    {
        var equation = new Equation(this.equationNameList[i], {font : '20px bitstream_vera_sans_monoroman', fill : '#ffffff', align : 'left'})
        equation.anchor.y = 1.0
        equation.x = this.textMargin.x
        equation.y = Screen.size.height - (this.equationNameList.length - i - 1) * (equation.height + this.textMargin.y) - this.textMargin.y
        equation.index = i
        this.addChild(equation)
        this.equationList.push(equation)
        if (i == 0)
        {
            equation.selected = true
            equation.tint = 0xff0000
        }
    }

    // Raymarching scene
    this.sceneSelected = 0
    this.sceneList = []
    this.sceneNameList = [
        'spheres repeat'
        , 'cubes ground'
    ]
    for (var i = this.sceneNameList.length - 1; i >= 0; --i) 
    {
        var scene = new Equation(this.sceneNameList[i], {font : '20px bitstream_vera_sans_monoroman', fill : '#ffffff', align : 'right'})
        scene.anchor.x = 1.0
        scene.anchor.y = 1.0
        scene.x = Screen.size.width - this.textMargin.x
        scene.y = Screen.size.height - (this.sceneNameList.length - i - 1) * (scene.height + this.textMargin.y) - this.textMargin.y
        scene.index = i
        scene.isScene = true
        this.addChild(scene)
        this.sceneList.push(scene)
        if (i == 0)
        {
            scene.selected = true
            scene.tint = 0xff0000
        }
    }

    this.deselectEquation = function ()
    {
        for (var i = this.equationList.length - 1; i >= 0; --i) 
        {
            var equation = this.equationList[i]
            equation.unselect()
        }
    }

    this.deselectScene = function ()
    {
        for (var i = this.sceneList.length - 1; i >= 0; --i) 
        {
            var scene = this.sceneList[i]
            scene.unselect()
        }
    }

    this.Setup = function ()
    {
        this.background.filters = [Filter.Raymarching]
    }

    this.Update = function ()
    {
    }

    this.Resize = function ()
    {
        this.background.Resize()


        this.title.x = Screen.size.width / 2

        for (var i = this.equationList.length - 1; i >= 0; --i) 
        {
            var equation = this.equationList[i]
            equation.x = this.textMargin.x
            equation.y = Screen.size.height - i * (equation.height + this.textMargin.y) - this.textMargin.y
        }

        for (var i = this.sceneList.length - 1; i >= 0; --i) 
        {
            var scene = this.sceneList[i]
            scene.x = Screen.size.width - this.textMargin.x
            scene.y = Screen.size.height - i * (scene.height + this.textMargin.y) - this.textMargin.y
        }
    }
}

Scene.prototype = Object.create(PIXI.Container.prototype)
Scene.prototype.constructor = Scene