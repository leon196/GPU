var Equation = function (text, style, index) 
{
    // GUI
    PIXI.Text.call(this, text, style)
    this.interactive = true
    this.buttonMode = true
    this.selected = false
    this.index = index
    this.isScene = false

    this.mousedown = this.touchstart = this.tap = function (e)
    {
        this.select()
    }
    this.mouseup = function (e)
    {

    }
    this.mouseover = function (e)
    {
        if (this.selected == false)
        { 
            this.tint = 0xffcc00
        }
    }
    this.mouseupoutside = this.mouseout = function (e)
    {
        if (this.selected == false)
        {
            this.tint = 0xffffff
        }
    }
    this.select = function ()
    {
        if (this.isScene == false)
        {
            Engine.scene.deselectEquation()
            Engine.scene.equationSelected = this.index
        }
        else
        {
            Engine.scene.deselectScene()
            Engine.scene.sceneSelected = this.index
        }
        this.selected = true
        this.tint = 0xff0000
    }
    this.unselect = function ()
    {
        this.selected = false
        this.tint = 0xffffff
    }
}

Equation.prototype = Object.create(PIXI.Text.prototype)
Equation.prototype.constructor = Equation