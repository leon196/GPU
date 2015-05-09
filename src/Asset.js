var Asset = {};

Asset.LoadAndSetup = function (onComplete)
{
    PIXI.loader
    .add("img/background.jpg")
    .add("img/image.jpg")
	.add('shader','src/filters/Effect.frag')
    .add('TVFilter','src/filters/TVFilter.frag')
    // .add(Asset.Table)
    // .add("img/sprites.png", "img/sprites.json")
    // .add("img/arms.png", "img/arms.json")
    // .add("img/hands.png", "img/hands.json")
    .once('complete', onComplete)
    .load();
};