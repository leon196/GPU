
let textures = {};
let textureLoader = new THREE.TextureLoader();
let textureLoaded = 0;
let textureUrls = [
	{ name:'cursor', url:'images/cursor.png' },
];
let textureCount = textureUrls.length;

let shaders = {};
let shaderLoader = new THREE.FileLoader();
let shaderLoaded = 0;
let shaderUrls = [
	{ name:'title.vert', url:'shaders/title.vert' },
	{ name:'title.frag', url:'shaders/title.frag' },
];
let shaderCount = shaderUrls.length;

var callbackOnLoad = null;

function loadedTexture (key, data) {
	textures[key] = data;
	if (Object.keys(textures).length == textureCount && Object.keys(shaders).length == shaderCount) {
		if (callbackOnLoad != null) {
			callbackOnLoad();
		}
	}
}

function loadedShader (key, data) {
	shaders[key] = data;
	if (Object.keys(textures).length == textureCount && Object.keys(shaders).length == shaderCount) {
		if (callbackOnLoad != null) {
			callbackOnLoad();
		}
	}
}

function load (callback) {
	callbackOnLoad = callback;
	textureUrls.forEach(item => { textureLoader.load(item.url, data => loadedTexture(item.name, data)); });
	shaderUrls.forEach(item => { shaderLoader.load(item.url, data => loadedShader(item.name, data)); });
}