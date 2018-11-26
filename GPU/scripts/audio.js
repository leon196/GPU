
var audio = {};
var listener, music, fx;

audio.init = function (camera) {
  listener = new THREE.AudioListener();
  camera.add(listener);
  
  music = new THREE.Audio(listener);
  music.setBuffer(assets['intro_titre']);
  music.setLoop(true);
  music.play();

  fx = new THREE.Audio(listener);
  fx.setBuffer(assets['sfx_win']);
}

audio.playMusic = function () {
  fx.play();
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

audio.playFX = function () {
  fx.stop();
  fx.play();
}