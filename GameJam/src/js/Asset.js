var Asset = {}

Asset.LoadAndSetup = function (onComplete)
{
    PIXI.loader
	.add('Raymarching','js/filters/Raymarching.frag')
    .once('complete', onComplete)
    .load()
}