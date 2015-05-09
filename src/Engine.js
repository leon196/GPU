
var Engine = {};

Engine.renderer;
Engine.canvas;
Engine.scene;
Engine.isRestarting = false;

Engine.Setup = function ()
{
    // Pixi
    Engine.renderer = new PIXI.WebGLRenderer(Screen.size.width, Screen.size.height,
    {
        resolution: 1.0
    });

    // Main Scene
    Engine.scene = new Scene();

    // Mouse Events
    Engine.scene.touchmove = Engine.scene.mousemove = Input.MouseMove;
    Engine.scene.mousedown = Input.MouseDown;
    Engine.scene.tap = Input.Tap;
    Engine.scene.mouseupoutside = Engine.scene.mouseout = Engine.scene.mouseup = Input.MouseUp;

    // Resize Event
    window.addEventListener("resize", function ()
    {
        Screen.size.width = window.innerWidth;
        Screen.size.height = window.innerHeight;

        Engine.scene.Resize();

        Engine.renderer.resize(Screen.size.width, Screen.size.height);
    });

    // Load Asset
    Asset.LoadAndSetup(function(loader, res)
    {
        // Setup Scene
        Engine.scene.Setup();

        // Setup Filters
        Filter.Setup(res);

        // Add Filters
        Engine.scene.filters = [Filter.TVFilter];

        // Add Canvas
        Engine.canvas = document.getElementById("canvas");
        Engine.canvas.appendChild(Engine.renderer.view);
    });
};

Engine.Update = function ()
{
    Player.Update();

    Engine.scene.Update();

    Filter.Update();

    Engine.renderer.render( Engine.scene );
};
