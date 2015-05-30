var Scene = function() 
{
    // GUI
    PIXI.Container.call(this)
    this.interactive = true

    // Background
    this.background = new Graphics()
    this.addChild(this.background)

    // Equaducation
    this.equationSelected = 0
    this.equationList = []
    this.equationNameList = [
        'cos(x * (1.0 + 2.0 * mouse.x)) * 0.1'
        , '1.0 / (1.0 + exp(mouse.x * 2.0 * (x - 0.5)))'
    ]
    this.textMargin = vec2(8, 8)
    for (var i = this.equationNameList.length - 1; i >= 0; --i) 
    {
        var equation = new Equation(this.equationNameList[i], {font : '30px bitstream_vera_sans_monoroman', fill : '#ffffff', align : 'left'})
        equation.x = this.textMargin.x
        equation.y = i * (equation.height + this.textMargin.y) + this.textMargin.y
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
        , 'plane spheres'
        , 'cube land'
    ]
    for (var i = this.sceneNameList.length - 1; i >= 0; --i) 
    {
        var scene = new Equation(this.sceneNameList[i], {font : '30px bitstream_vera_sans_monoroman', fill : '#ffffff', align : 'right'})
        scene.anchor.x = 1.0
        scene.anchor.y = 1.0
        scene.x = Screen.size.width - this.textMargin.x
        scene.y = Screen.size.height - i * (scene.height + this.textMargin.y) - this.textMargin.y
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
    }
}

Scene.prototype = Object.create(PIXI.Container.prototype)
Scene.prototype.constructor = Scene