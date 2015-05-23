
var Engine = {};

Engine.renderer;
Engine.canvas;
Engine.scene;
Engine.isReady = false;
Engine.isPlaying = false;
Engine.isStarting = false;
Engine.isWinning = false;
Engine.isRestarting = false;

Engine.Setup = function ()
{
    // Pixi
    Engine.renderer = new PIXI.WebGLRenderer(Screen.size.width, Screen.size.height, {  resolution: 1.0 });

    // Render Texture
    Engine.renderTexture = new PIXI.RenderTexture(Engine.renderer, Screen.size.width, Screen.size.height); 

    // Main Scene
    Engine.scene = new Scene();

    // Mouse Events
    Engine.scene.touchmove = Engine.scene.mousemove = Input.MouseMove;
    Engine.scene.mousedown = Input.MouseDown;
    Engine.scene.tap = Input.Tap;
    Engine.scene.mouseupoutside = Engine.scene.mouseout = Engine.scene.mouseup = Input.MouseUp;

    // Drag and drop
    Engine.renderer.view.ondragover = ondragover;
    Engine.renderer.view.ondrop = ondrop;

    // Resize Event
    window.addEventListener("resize", Engine.Resize);

    // Load Asset
    Asset.LoadAndSetup(function(loader, res)
    {
        // 
        Text.Setup();

        Control.Init();

        // Setup Filters
        Filter.Setup(res);

        // Setup Scene
        Engine.scene.Setup();

        // Add Canvas
        Engine.canvas = document.getElementById("canvas");
        Engine.canvas.appendChild(Engine.renderer.view);

        // Sound
        Sound.Menu();

        Engine.isReady = true;
    });
};

Engine.Update = function ()
{
    // Update Scene
    Engine.scene.Update();

    // Menu Title
    if (Engine.isPlaying == false && Filter.isReady)
    {
        Control.Update();

        Filter.TitleFilter.uniforms.uTimeElapsed.value = Time.GetElapsed();
        Filter.TitleFilter.uniforms.uParameter1.value = Control.GetParameter(1);
        Filter.TitleFilter.uniforms.uParameter2.value = Control.GetParameter(2);
        
        Filter.MenuFilter.uniforms.uTimeElapsed.value = Time.GetElapsed();
        Filter.MenuFilter.uniforms.uParameter1.value = Control.GetParameter(1);
        Filter.MenuFilter.uniforms.uParameter2.value = Control.GetParameter(2);
    }

    // Play
    if (Engine.isPlaying && Engine.isWinning == false)
    {
        Filter.Update();

        // Introduction
        if (Engine.isStarting)
        {
            var ratioStart = animationRatio(Time.startingStarted, Time.startingDelay, Time.GetElapsed());

            Control.Rumbling(ratioStart);

            if (ratioStart >= 1.0)
            {
                Engine.isStarting = false;
            }
        }
        else
        {
            Control.Update();

            // Check Win
            if (Control.DoesParameterDifferenceIsLessThan(0.05) && Engine.isWinning == false)
            {
                Engine.Win();
            }
        }
    }

    // Start
    else if (Engine.isReady && Engine.scene.menu.startButtonIsPressed && Engine.isPlaying == false)
    {
        Engine.isPlaying = true;
        Engine.StartLevel();
        Sound.Game();
    }

    // Win Animation
    if (Engine.isWinning)
    {
        var ratioWin = animationRatio(Time.winningStarted, Time.winningDelay, Time.GetElapsed());

        Text.DrawText(Text.GetBravo(), smoothstep(0.0, 0.5, ratioWin));

        var currentFilter = Filter.filters[Filter.currentFilterIndex];
        if (currentFilter.uniforms.uParameterFadeOut)
        {
            currentFilter.uniforms.uParameterFadeOut.value = 1.0 - ratioWin;
        }

        if (ratioWin >= 1.0)
        {
            Engine.NextLevel();
        }
    }

    // Hop
    Engine.renderer.render( Engine.scene );
};

Engine.StartLevel = function ()
{
    Engine.scene.Start();
    Control.Rumble();
    Input.Rumble();
    Engine.isStarting = true;
    Time.startingStarted = Time.GetElapsed();
};

Engine.NextLevel = function ()
{
    if (Filter.currentFilterIndex < Filter.filters.length - 1)
    {
        Engine.isWinning = false;
        Filter.currentFilterIndex++;
        Filter.SetParameterCount();
        Engine.scene.Start();
        Control.Rumble();
        Engine.isStarting = true;
        Time.startingStarted = Time.GetElapsed();
    }
    else // game finished
    {
        Engine.isWinning = true;
        Time.winningStarted = Time.GetElapsed();
    }

    Text.Clear();
    Text.NextBravo();
};

Engine.Restart = function ()
{
    Engine.scene.Restart();
    Engine.StartLevel();
    Text.Clear();
};

Engine.Win = function ()
{
    Time.winningStarted = Time.GetElapsed();
    Engine.isWinning = true;
    Engine.Clear();
    Sound.Win();
};

Engine.Clear = function ()
{
    Text.Clear();
    Control.Clear();
    Filter.Update();
};

Engine.Resize = function ()
{
    Screen.size.width = window.innerWidth;
    Screen.size.height = window.innerHeight;

    Engine.scene.Resize();
    Engine.renderer.resize(Screen.size.width, Screen.size.height);
};

// Drag and drop
// Thanks to JKirchartz and robertc
// http://stackoverflow.com/questions/7699987/html5-canvas-ondrop-event-isnt-firing
function ondragover (e) 
{
    e.preventDefault();
    return false;
}

function ondrop (e) 
{
    e.preventDefault();
    var file = e.dataTransfer.files[0],
    reader = new FileReader();
    reader.onload = function(event) 
    {
        var img = new Image();
        img.src = event.target.result;
        img.onload = function(event) 
        {
            Engine.scene.UpdatePhoto(this);
        };
    };
    reader.readAsDataURL(file);
    return false;
};