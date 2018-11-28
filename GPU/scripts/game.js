
window.onload = function () {

	var renderer, scene, sceneStart, sceneTransition, camera, uniforms, state, video, frame, cursor, timer, round, total;
	var State = {
		Title: 0,
		TitleTransition: 1,
		Game: 2,
		Video: 3,
		Transition: 4,
		Over: 5,
		OverTransition: 6,
	}
	
	state = State.Title;
	round = 1;
	total = 9;
	timer = 0;

	var shaders = [
		{ name:'fullscreen', url:'shaders/fullscreen.vert' },
		{ name:'text', url:'shaders/text.frag' },
		{ name:'transition', url:'shaders/transition.frag' },
		{ name:'transition-buffer', url:'shaders/transition-buffer.frag' },];

	for (var i = 1; i <= total; i++) {
		shaders.push({ name:'glitch-'+i, url:'shaders/glitch-'+i+'.frag' });
	}

	load([
		{ name:'cursor', url:'images/cursor.png' },
		],shaders,[
		{ name:'intro_loop', url:'sounds/intro_loop.mp3' },
		{ name:'intro_titre', url:'sounds/intro_titre.mp3' },
		{ name:'loop_mystere', url:'sounds/loop_mystere.mp3' },
		{ name:'sfx_win', url:'sounds/sfx_win.mp3' },
		], start);

	function start () {

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);

		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
		camera.position.z = 1;

		audio.init(camera);

		uniforms = {
			uTime: { value: 0 },
			uResolution: { value: 0 },
			uVideo: { value: 0 },
			uText: { value: 0 },
			uTextMask: { value: 0 },
			uTextWin: { value: 0 },
			uHover: { value: 0 },
			uCursor: { value: 0 },
			uTransition: { value: 0 },
			uFrame: { value: 0 },
			uGameOver: { value: 0 },
		}

		sceneStart = new THREE.Scene();
		sceneTransition = new THREE.Scene();

		add('fullscreen', 'text', new THREE.PlaneGeometry(1,1), sceneStart);
		add('fullscreen', 'transition', new THREE.PlaneGeometry(1,1), sceneTransition);

		scene = new THREE.Mesh(new THREE.PlaneGeometry(1,1), new THREE.ShaderMaterial({
			vertexShader: assets['fullscreen'],
			fragmentShader: assets['glitch-1'],
		}));
		scene.material.uniforms = uniforms;

		video = document.createElement('video');
		video.src = 'videos/video.mp4';
		video.muted = true;
		video.autoplay = true;
		video.loop = true;
		document.body.appendChild(video);

		uniforms.uVideo.value = new THREE.VideoTexture(video);
		uniforms.uVideo.value.minFilter = THREE.NearestFilter;
		uniforms.uVideo.value.magFilter = THREE.NearestFilter;

		var options = {
			material: new THREE.ShaderMaterial({
				vertexShader: assets['fullscreen'],
				fragmentShader: assets['transition-buffer'],
			}),
			min: THREE.NearestFilter,
			mag: THREE.NearestFilter,
		}
		options.material.uniforms = uniforms;
		frame = new FrameBuffer(options);

		cursor = [0, 0];
		uniforms.uCursor.value = [0, 0];

		updateGlitch();

		resize();
		window.addEventListener('resize', resize, false);
		document.body.addEventListener('keydown', Keyboard.onKeyDown, false);
		document.body.addEventListener('keyup', Keyboard.onKeyUp, false);
		requestAnimationFrame( update );
	}

	function add (vert, frag, geo, scn) {
		var geometry = geo || new THREE.PlaneGeometry(1,1);
		var material = new THREE.ShaderMaterial({
			vertexShader: assets[vert],
			fragmentShader: assets[frag],
		});
		material.uniforms = uniforms;
		scn = scn || scene;
		scn.add(new THREE.Mesh(geometry, material));
	}

	function update (elapsed) {
		requestAnimationFrame( update );

		elapsed /= 1000;
		var dt = Math.max(0.01, Math.min(1., elapsed - uniforms.uTime.value));
		uniforms.uTime.value = elapsed;

		var anyKey = Keyboard.Left.down || Keyboard.Up.down || Keyboard.Right.down || Keyboard.Down.down;

		// restart at 60 secondes

		if (state == State.Title) {

			uniforms.uTransition.value = 1.-Math.max(0., Math.min(1., (elapsed - timer) / 3.));

			if (anyKey) {
				state = State.TitleTransition;
				timer = elapsed;
				audio.playMusic();
			}
			
			renderer.render(sceneStart, camera);

		} else if (state == State.TitleTransition) {

			uniforms.uTransition.value = Math.max(0., Math.min(1., (elapsed - timer) / 3.));
			renderer.render(sceneStart, camera);

			if (uniforms.uTransition.value == 1.) {
				state = State.Game;
				timer = elapsed;
				video.play();
			}

		} else if (state == State.Game) {

			uniforms.uTransition.value = Math.max(0., Math.min(1., (elapsed - timer) / 3.));

			// var x = Math.abs(point[0]-mouse.x/window.innerWidth);
			// var y = Math.abs(point[1]-mouse.y/window.innerHeight);
			var speed = 2.;
			cursor[0] += (Keyboard.Right.down ? speed * dt : 0.);
			cursor[0] -= (Keyboard.Left.down ? speed * dt : 0.);
			cursor[1] += (Keyboard.Up.down ? speed * dt : 0.);
			cursor[1] -= (Keyboard.Down.down ? speed * dt : 0.);

			var x = Math.cos(cursor[0]) * .5 + .5;
			var y = Math.cos(cursor[1]) * .5 + .5;

			uniforms.uCursor.value[0] = x;
			uniforms.uCursor.value[1] = y;

			if (x + y < .005) {
				state = State.Video;
				cursor = [0, 0];
				uniforms.uCursor.value[0] = 0;
				uniforms.uCursor.value[1] = 0;
				timer = elapsed;
			}

			renderer.render(scene, camera);

		} else if (state == State.Video) {

			var t = Math.max(0., Math.min(1., (elapsed - timer) / 1.));
			if (t == 1.) {
				state = State.Transition;
				timer = elapsed;
				frame.setSize(window.innerWidth+1, window.innerHeight+1);
				frame.setSize(window.innerWidth, window.innerHeight);
				frame.record(renderer, scene, camera);
				uniforms.uFrame.value = frame.getTexture();
				audio.playFX();
			}
			renderer.render(scene, camera);

		} else if (state == State.Transition) {

			var t = Math.max(0., Math.min(1., (elapsed - timer) / 10.));

			uniforms.uTransition.value = 1.-smoothstep(.9, 1., t);

			// for (var step = 0; step < 3; ++step) {
				frame.update(renderer);
				uniforms.uFrame.value = frame.getTexture();
			// }

			renderer.render(sceneTransition, camera);

			if (t == 1.) {
				state = State.Game;
				round += 1;
				timer = elapsed;
				video.play();
				if (round > total) {
					state = State.Over;
					uniforms.uGameOver.value = 1.;
				} else {
					updateGlitch();
				}
				buildTextures(uniforms);
			}

		} else if (state == State.Over) {

			uniforms.uTransition.value = Math.max(0., Math.min(1., (elapsed - timer) / 3.));

			// for (var step = 0; step < 3; ++step) {
				frame.update(renderer);
				uniforms.uFrame.value = frame.getTexture();
			// }

			if (uniforms.uTransition.value == 1) {
				if (anyKey) {
					state = State.OverTransition;
					timer = elapsed;
					audio.playFX();
				}
			}

			renderer.render(sceneTransition, camera);

		} else if (state == State.OverTransition) {

			uniforms.uTransition.value = 1.-Math.max(0., Math.min(1., (elapsed - timer) / 3.));

			// for (var step = 0; step < 3; ++step) {
				frame.update(renderer);
				uniforms.uFrame.value = frame.getTexture();
			// }

			if (uniforms.uTransition.value == 0) {
				state = State.Title;
				timer = elapsed;
				cursor = [0, 0];
				round = 1;
				uniforms.uGameOver.value = 0.;
				updateGlitch();
				buildTextures(uniforms);
			}

			renderer.render(sceneTransition, camera);
		}

	}

	function updateGlitch() {
		scene.material.fragmentShader = assets['glitch-' + round];
		scene.material.needsUpdate = true;
	}

	function resize () {
		var width = window.innerWidth;
		var height = window.innerHeight;
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
		uniforms.uResolution.value = [width, height];
		frame.setSize(width, height);
		buildTextures(uniforms);
	}
}