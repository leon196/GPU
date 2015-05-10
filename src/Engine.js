
var Engine = {};

Engine.renderer;
Engine.canvas;
Engine.scene;
Engine.isPlaying = false;
Engine.isStarting = false;
Engine.isWinning = false;
Engine.isRestarting = false;

Engine.Setup = function ()
{
    // Pixi
    Engine.renderer = new PIXI.WebGLRenderer(Screen.size.width, Screen.size.height,
    {
        resolution: 1.0
    });
    Engine.renderer.view.ondragover = function(e) {
        e.preventDefault();
        return false;
    };
    Engine.renderer.view.ondrop = function(e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0],
            reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image(),
                imgStr = event.target.result;
            //state.innerHTML += ' Image Uploaded: <a href="' +
                //imgStr + '" target="_blank">view image</a><br />';
            img.src = event.target.result;
            img.onload = function(event) {
                Engine.scene.removeChild(Engine.scene.photo);
                Engine.scene.photo = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(this)));
                Engine.scene.photo.width = Screen.size.width;
                Engine.scene.photo.height = Screen.size.height;
                Engine.scene.addChildAt(Engine.scene.photo, 1);
                //state.innerHTML += ' Canvas Loaded: <a href="' + canvas.toDataURL() + '" target="_blank">view canvas</a><br />';
            };
        };
        reader.readAsDataURL(file);
        return false;
    };

    // Main Scene
    Engine.scene = new Scene();

    // Render Texture
    Engine.renderTexture = new PIXI.RenderTexture(Engine.renderer, Screen.size.width, Screen.size.height); 

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
        // 
        Text.Setup();

        Player.Init();

        // Setup Filters
        Filter.Setup(res);

        // Setup Scene
        Engine.scene.Setup();

        // Add Canvas
        Engine.canvas = document.getElementById("canvas");
        Engine.canvas.appendChild(Engine.renderer.view);
    });
};

Engine.Update = function ()
{
    // Update Scene
    Engine.scene.Update();

    // Play
    if (Engine.isPlaying && Engine.isWinning == false)
    {
        // Update
        Player.Update();
        Filter.Update();

        // Introduction
        if (Engine.isStarting)
        {
            var ratioStart = animationRatio(Time.startingStarted, Time.startingDelay, Time.GetElapsed());

            Player.Rumbling(ratioStart);

            if (ratioStart >= 1.0)
            {
                Engine.isStarting = false;
            }
        }
        // Check Win
        else if (Input.keyR || (Player.DoesParameterDifferenceIsLessThan(0.05) && Engine.isWinning == false))
        {
            Engine.Win();
        }
    }

    // Start
    else if (Input.mousePressed && Engine.isPlaying == false)
    {
        Engine.isPlaying = true;
        Engine.StartLevel();
    }

    // Win Animation
    if (Engine.isWinning)
    {
        var ratioWin = animationRatio(Time.winningStarted, Time.winningDelay, Time.GetElapsed());

        Text.DrawText(Text.GetBravo(), smoothstep(0.0, 0.25, ratioWin));

        if (ratioWin >= 1.0)
        {
            Engine.NextLevel();
        }
    }

    Engine.renderer.render( Engine.scene );
};

Engine.StartLevel = function ()
{
    Engine.scene.Start();
    Player.Rumble();
    Input.Rumble();
    Engine.isStarting = true;
    Time.startingStarted = Time.GetElapsed();
};

Engine.NextLevel = function ()
{
    // Game Finished
    if (Filter.currentFilterIndex < Filter.filters.length - 1)
    {
        Engine.isWinning = false;
        Filter.currentFilterIndex++;
        Filter.SetParameterCount();
        Engine.scene.Start();
        Player.Rumble();
        Engine.isStarting = true;
        Time.startingStarted = Time.GetElapsed();
        
    }
    else
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
    Text.Clear();
    Player.Clear();
    Filter.Update();
};