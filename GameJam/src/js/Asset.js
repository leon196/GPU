var Asset = {};

Asset.LoadAndSetup = function (onComplete)
{
    PIXI.loader
    .add("img/image.jpg")
    .add("font/bebas.fnt")

    .add("sound/intro_titre.mp3")
    .add("sound/intro_loop.mp3")
    .add("sound/loop_mystere.mp3")
    .add("sound/sfx_win.mp3")

	.add('shader','js/filters/Effect.frag')
    .add('PhotoFilter','js/filters/PhotoFilter.frag')
    .add('TVFilter','js/filters/TVFilter.frag')
    .add('PCFilter','js/filters/PCFilter.frag')
    .add('PCFilter2','js/filters/PCFilter2.frag')
    .add('PCFilter3','js/filters/PCFilter3.frag')
    .add('LSDFilter','js/filters/LSDFilter.frag')
    .add('LSDFilter2','js/filters/LSDFilter2.frag')
    .add('TitleFilter','js/filters/TitleFilter.frag')
    .add('MenuFilter','js/filters/MenuFilter.frag')
    .add('TestFilter','js/filters/TestFilter.frag')
    
    .once('complete', onComplete)
    .load();
};