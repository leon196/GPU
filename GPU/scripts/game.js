
window.onload = function () {

  var renderer, scene, sceneStart, sceneTransition, camera, uniforms, state, frame, point, timer, round, listener, music, audio;

  load([
    { name:'cursor', url:'images/cursor.png' },
  ],[
    { name:'fullscreen', url:'shaders/fullscreen.vert' },
    { name:'text', url:'shaders/text.frag' },
    { name:'glitch-1', url:'shaders/glitch-1.frag' },
    { name:'glitch-2', url:'shaders/glitch-2.frag' },
    { name:'glitch-3', url:'shaders/glitch-3.frag' },
    { name:'transition', url:'shaders/transition.frag' },
    { name:'transition-buffer', url:'shaders/transition-buffer.frag' },
  ],[
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

    listener = new THREE.AudioListener();
    camera.add(listener);
    music = new THREE.Audio(listener);
    audio = new THREE.Audio(listener);
    music.setBuffer(assets['intro_titre']);
    music.setLoop(true);
    music.play();
    audio.setBuffer(assets['sfx_win']);

    camera.position.z = 5;

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

    var video = document.createElement('video');
    video.src = 'videos/talking-heads.mp4';
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.currentTime = 10.;
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

    point = [Math.random(), Math.random()];
    point = [.5, .5];
    uniforms.uCursor.value = [
      Math.abs(point[0]-mouse.x/window.innerWidth),
      Math.abs(point[1]-mouse.y/window.innerHeight)
    ];

    state = 0;
    round = 1;
    timer = 0;
    updateGlitch();

    resize();
    window.addEventListener('resize', resize, false);
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
    uniforms.uTime.value = elapsed;

    if (state == 0) {

      if (Math.abs(mouse.x - window.innerWidth / 2) - window.innerWidth / 10 < 0
        && Math.abs(mouse.y - window.innerHeight + window.innerHeight / 4) - window.innerHeight / 10 < 0) {
        uniforms.uHover.value = lerp(uniforms.uHover.value, 1, .1);
        document.body.style.cursor = 'pointer';
        if (mouse.clic) {
          state = 1000;
          timer = elapsed;
          document.body.style.cursor = 'default';
          audio.play();
          music.stop();
          music.setBuffer(assets['intro_loop']);
          music.setLoop(false);
          music.play();
          music.source.onended = function() {
            music.stop();
            music.setBuffer(assets['loop_mystere']);
            music.setLoop(true);
            music.play();
            music.source.onended = null;            
          }
        }
      } else {
        uniforms.uHover.value *= .9;
        document.body.style.cursor = 'default';
      }
      
      renderer.render(sceneStart, camera);

    } else if (state == 1000) {

      uniforms.uTransition.value = Math.max(0., Math.min(1., (elapsed - timer) / 3.));
      renderer.render(sceneStart, camera);

      if (uniforms.uTransition.value == 1.) {
        state = 1;
        timer = elapsed;
      }

    } else if (state == 1) {

      uniforms.uTransition.value = Math.max(0., Math.min(1., (elapsed - timer) / 3.));

      var x = Math.abs(point[0]-mouse.x/window.innerWidth);
      var y = Math.abs(point[1]-mouse.y/window.innerHeight);

      uniforms.uCursor.value[0] = x;
      uniforms.uCursor.value[1] = y;

      if (x + y < .01) {
        state = 2;
        timer = elapsed;
        frame.record(renderer, scene, camera);
        frame.swap();
        frame.record(renderer, scene, camera);
        uniforms.uFrame.value = frame.getTexture();
        audio.stop();
        audio.play();
      }

      renderer.render(scene, camera);

    } else if (state == 2) {

      uniforms.uTransition.value = Math.max(0., Math.min(1., (elapsed - timer) / 10.));

      for (var step = 0; step < 3; ++step) {
        frame.update(renderer);
        uniforms.uFrame.value = frame.getTexture();
      }

      renderer.render(sceneTransition, camera);

      if (uniforms.uTransition.value == 1.) {
        state = 1;
        round += 1;
        timer = elapsed;
        if (round == 3) {
          state = 3;
          uniforms.uGameOver.value = 1.;
        } else {
          updateGlitch();
        }
        buildTextures();
      }

    } else if (state == 3) {

      uniforms.uTransition.value = 1.-Math.max(0., Math.min(1., (elapsed - timer) / 10.));

      for (var step = 0; step < 3; ++step) {
        frame.update(renderer);
        uniforms.uFrame.value = frame.getTexture();
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
    buildTextures();
  }

  function buildTextures () {

    uniforms.uText.value = textureFromText([{
      text: 'GPU',
      font: 'bebasneue',
      fontSize: window.innerHeight/3,
      textBaseline: 'top',
      anchor: [.5, 0],
    },{
      text: 'GLITCH PROCESSING UNIT',
      font: 'bebasneue',
      fontSize: window.innerHeight/21,
      textBaseline: 'top',
      offsetY: window.innerHeight/3,
      anchor: [.5, 0],
    },{
      text: 'USE BUTTONS TO RECALIBRATE GLITCHES',
      font: 'bebasneue',
      fontSize: window.innerHeight/15,
    },{
      text: 'START',
      font: 'bebasneue',
      fontSize: window.innerHeight/10,
      anchor: [.5, .75],
    },{
      text: 'TATIANA VILELA & LEON DENISE',
      font: 'bebasneue',
      textBaseline: 'bottom',
      fontSize: window.innerHeight/20,
      offsetY: -window.innerHeight/40,
      anchor: [.5, 1.],
    }])

    uniforms.uTextMask.value = textureFromRect([{
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight,
      fillStyle: 'black',
    },{
      x: 0,
      y: 0,
      width: window.innerWidth,
      height: window.innerHeight / 3,
      fillStyle: 'red',
    }])

    if (uniforms.uGameOver.value == 0.) {
      uniforms.uTextWin.value = textureFromText([{
        text: 'YES',
        font: 'bebasneue',
        fontSize: window.innerHeight/3,
      }]);
    } else {
      uniforms.uTextWin.value = textureFromText([{
        text: 'THANKS FOR PLAYING',
        font: 'bebasneue',
        textBaseline: 'top',
        fontSize: window.innerHeight/10,
        anchor: [.5, .05],
      },{
        text: 'PRESS BUTTON TO RESTART',
        font: 'bebasneue',
        textBaseline: 'bottom',
        fontSize: window.innerHeight/15,
        anchor: [.5, .95],
      }]);
    }
  }
}