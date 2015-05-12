var Sound = {};

Sound.introTitle = new Howl({
    urls: ['sound/intro_titre.mp3']
    , autoplay: false
    , loop: true
    , volume: 0.5
});

Sound.loopMyster = new Howl({
    urls: ['sound/loop_mystere.mp3']
    , autoplay: false
    , loop: true
    , volume: 0.5
});

Sound.introLoop = new Howl({
    urls: ['sound/intro_loop.mp3']
    , autoplay: false
    , loop: false
    , volume: 0.5
    , onend: function() {
        Sound.loopMyster.play();
    }
});

Sound.sfxWin = new Howl({
    urls: ['sound/sfx_win.mp3']
    , autoplay: false
    , loop: false
    , volume: 0.25
});

Sound.Menu = function ()
{
    Sound.introTitle.play();
};

Sound.Game = function ()
{
    Sound.introTitle.stop();
    Sound.introLoop.play();
};

Sound.Win = function ()
{
    Sound.sfxWin.play();
};