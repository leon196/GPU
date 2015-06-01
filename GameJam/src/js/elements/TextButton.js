var TextButton = function (text, style, index) 
{
    // GUI
    PIXI.Text.call(this, text, style)
    this.interactive = true
    this.buttonMode = true
    this.selected = false

    this.mousedown = this.touchstart = this.tap = function (e)
    {
        if (this.selected)
        {
            this.unselect()
        }
        else
        {
            this.select()
        }
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
        this.selected = true
        this.tint = 0xff0000
    }
    this.unselect = function ()
    {
        this.selected = false
        this.tint = 0xffffff
    }
}

TextButton.prototype = Object.create(PIXI.Text.prototype)
TextButton.prototype.constructor = TextButton