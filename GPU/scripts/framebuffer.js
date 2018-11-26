
function FrameBuffer (options) {
	options = options || {};
	this.renderTextures = [];
	this.currentIndex = 0;
	this.count = options.count || 2;
	for (var i = 0; i < this.count; ++i) {
		this.renderTextures.push(new THREE.WebGLRenderTarget(
			options.width || window.innerWidth,
			options.height || window.innerHeight, {
				format: options.format || THREE.RGBAFormat,
				type: options.type || THREE.FloatType,
				minFilter: options.min || THREE.LinearFilter,
				magFilter: options.mag || THREE.LinearFilter,
				stencilBuffer: options.stencil || true,
				depthBuffer: options.depth || true
			}));
	}

	this.scene = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), options.material);
	this.camera = new THREE.PerspectiveCamera(75, 1, 0.01, 100);
	this.camera.position.z = 5;

	this.update = function (renderer) {
		this.swap();
		renderer.render(this.scene, this.camera, this.getRenderTarget(), true);
	}

	this.record = function (renderer, scene, camera) {
		renderer.render(scene, camera, this.getRenderTarget(), true);
		this.swap();
		renderer.render(scene, camera, this.getRenderTarget(), true);
	}

	this.getRenderTarget = function () {
		return this.renderTextures[this.currentIndex];
	}

	this.getTexture = function () {
		return this.renderTextures[this.currentIndex].texture;
	}

	this.swap = function () {
		this.currentIndex = (this.currentIndex + 1) % this.count;
	}

	this.setSize = function (width, height) {
		for (var i = 0; i < this.count; ++i) {
			this.renderTextures[i].setSize(width, height);
		}
	}

	this.dispose = function () {
		for (var i = 0; i < this.count; ++i) {
			this.renderTextures[i].dispose();
		}
	}
}