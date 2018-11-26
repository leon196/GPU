
var assets = {};
var assetsLoaded = 0;
var assetCount;

var textureLoader = new THREE.TextureLoader();
var shaderLoader = new THREE.FileLoader();
var audioLoader = new THREE.AudioLoader();

var callbackOnLoad = null;

function loaded (key, data) {
	assets[key] = data;
	if (Object.keys(assets).length == assetCount) {
		if (callbackOnLoad != null) {
			callbackOnLoad();
		}
	}
}

function load (textureUrls, shaderUrls, audioUrls, callback) {
	callbackOnLoad = callback;
	assetCount = textureUrls.length + shaderUrls.length + audioUrls.length;
	textureUrls.forEach(item => { textureLoader.load(item.url, data => loaded(item.name, data)); });
	shaderUrls.forEach(item => { shaderLoader.load(item.url, data => loaded(item.name, data)); });
	audioUrls.forEach(item => { audioLoader.load(item.url, data => loaded(item.name, data)); });
}