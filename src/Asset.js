var Asset = {};

Asset.LoadAndSetup = function (onComplete)
{
    PIXI.loader
    .add("img/background.jpg")
    .add("img/image.jpg")
    .add("font/bebas.fnt")

    .add("sound/intro_titre.mp3")
    .add("sound/intro_loop.mp3")
    .add("sound/loop_mystere.mp3")
    .add("sound/sfx_win.mp3")

	.add('shader','src/filters/Effect.frag')
    .add('PhotoFilter','src/filters/PhotoFilter.frag')
    .add('TVFilter','src/filters/TVFilter.frag')
    .add('PCFilter','src/filters/PCFilter.frag')
    .add('PCFilter2','src/filters/PCFilter2.frag')
    .add('PCFilter3','src/filters/PCFilter3.frag')
    .add('LSDFilter','src/filters/LSDFilter.frag')
    .add('LSDFilter2','src/filters/LSDFilter2.frag')
    .add('TitleFilter','src/filters/TitleFilter.frag')
    .add('MenuFilter','src/filters/MenuFilter.frag')
    // .add(Asset.Table)
    // .add("img/sprites.png", "img/sprites.json")
    // .add("img/arms.png", "img/arms.json")
    // .add("img/hands.png", "img/hands.json")
    .once('complete', onComplete)
    .load();
};