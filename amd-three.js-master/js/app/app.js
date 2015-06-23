define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene", "video", "time"],
function ( THREE, camera, controls, geometry, light, material, renderer, scene, video, time ) {
  var app = {
    init: function () 
    {
      material.shader.uniforms.uTimeElapsed.value = new THREE.Vector2( window.innerWidth, window.innerHeight );

      var plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
      quad = new THREE.Mesh( plane, material.shader );
      quad.position.z = -100;
      scene.add( quad );
    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();
      material.shader.uniforms.uTimeElapsed.value = time.now();
      renderer.render( scene, camera );
    }
  };
  return app;
} );
