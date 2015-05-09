var Asset = {};

Asset.LoadAndSetup = function (onComplete)
{
    PIXI.loader
    .add("img/background.jpg")
    .add("img/image.jpg")
    .add("font/generallySpeaking.fnt")
	.add('shader','src/filters/Effect.frag')
    .add('PhotoFilter','src/filters/PhotoFilter.frag')
    .add('TVFilter','src/filters/TVFilter.frag')
    .add('DistortionFilter','src/filters/DistortionFilter.frag')
    // .add(Asset.Table)
    // .add("img/sprites.png", "img/sprites.json")
    // .add("img/arms.png", "img/arms.json")
    // .add("img/hands.png", "img/hands.json")
    .once('complete', onComplete)
    .load();
};