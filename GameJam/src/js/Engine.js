
var Engine = {}

Engine.renderer
Engine.canvas
Engine.scene
Engine.isReady = false

Engine.Setup = function ()
{
    // Pixi
    Engine.renderer = new PIXI.WebGLRenderer(Screen.size.width, Screen.size.height, {  
        resolution: 1
        // , transparent: true
        // , clearBeforeRender: false
        // , preserveDrawingBuffer: true
    })

    // Main Scene
    Engine.scene = new Scene()

    // Mouse Events
    Engine.scene.touchmove = Engine.scene.mousemove = Input.MouseMove
    Engine.scene.mousedown = Input.MouseDown
    Engine.scene.tap = Input.Tap
    Engine.scene.mouseupoutside = Engine.scene.mouseout = Engine.scene.mouseup = Input.MouseUp

    window.addEventListener("resize", Engine.Resize)

    Asset.LoadAndSetup(function(loader, res)
    {
        Filter.Setup(res)
        Engine.scene.Setup()
        Engine.canvas = document.getElementById("canvas")
        Engine.canvas.appendChild(Engine.renderer.view)
        Engine.isReady = true
    })
}

Engine.Update = function ()
{
    Engine.scene.Update()
    Filter.Update()
    Engine.renderer.render( Engine.scene )
}

Engine.Clear = function ()
{
    Text.Clear()
    Filter.Update()
}

Engine.Resize = function ()
{
    Screen.size.width = window.innerWidth
    Screen.size.height = window.innerHeight

    Engine.scene.Resize()
    Engine.renderer.resize(Screen.size.width, Screen.size.height)
}