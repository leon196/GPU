

function lerp(v0, v1, t) { return v0*(1-t)+v1*t; } 
function closestPowerOfTwo (num) { return Math.pow(2, Math.ceil(Math.log(num) / Math.log(2))); } 
function distanceFrom (a, b) { return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)); } 
function distNoSqrt (a, b) { return ((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)); } 
function vectorFrom (a,b) {
  return [(b.x-a.x), (b.y-a.y)];
}
function directionFrom (a,b) {
  var len = Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
  return [(b.x-a.x)/len, (b.y-a.y)/len];
}
function shuffle (array) { for (var i = array.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var temp = array[i]; array[i] = array[j]; array[j] = temp; } return array; }
function smoothstep (edge0, edge1, x) { var t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0))); return t * t * (3 - 2 * t); }
var defaultUV = [0, 1, 1, 1, 0, 0, 1, 0];


window.onload = function () {

  var renderer, scene, camera, screen, mouse, player, agents, colliders;
  const screenRangeNoSqrt = 64;

  load(start);

  function start () {

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 100);
    camera.position.z = 5;

    mouse = { x: 0, y: 0, clic: false };

    agents = [];
    addAgent(50);

    player = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(1,1),
      new THREE.MeshBasicMaterial({
        map: textures['cursor'],
        transparent: true,
      }));
    updateFrame(player, [1,4], [0,1]);
    scene.add(player);

    colliders = [];
    addColliders(2);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, {passive: false});
    document.addEventListener('touchstart', onTouchDown, {passive: false});
    document.addEventListener('touchend', onTouchUp, {passive: false});
    window.addEventListener('resize', resize, false);

    resize();
    requestAnimationFrame( update );
  }

  function update (elapsed) {
    requestAnimationFrame( update );

    elapsed /= 1000;

    var offset = new THREE.Vector3();
    var dir, dist, otherAgent;

    // player control
    if (mouse.clic) {
      dir = vectorFrom(mouse, screen.center);
      dist = distNoSqrt(mouse, screen.center);
      dist = smoothstep(0., screen.height, dist);

      // colliders
      for (var index = 0; index < colliders.length; ++index) {
        var collider = colliders[index];
        var scale = collider.scale;

        // recycle with teleporting
        var ds = distNoSqrt(collider.position, player.position);
        var dr = vectorFrom(player.position, collider.position);
        if (ds > screenRangeNoSqrt) {
          collider.position.x = player.position.x - dr[0] * .95;
          collider.position.y = player.position.y - dr[1] * .95;
        }

        // collision
        var insideRectangle = Math.abs(player.position.x - collider.position.x) < (scale.x+player.scale.x)/2 && Math.abs(player.position.y - collider.position.y) < (scale.y+player.scale.y)/2;
        if (insideRectangle) {
          if (player.position.x < collider.position.x-scale.x/2) dir[0] = Math.max(dir[0], 0);
          else if (player.position.x > collider.position.x+scale.x/2) dir[0] = Math.min(dir[0], 0);
          else if (player.position.y < collider.position.y-scale.y/2) dir[1] = Math.min(dir[1], 0);
          else if (player.position.y > collider.position.y+scale.y/2) dir[1] = Math.max(dir[1], 0);
        }
      }

      // move player
      player.position.x += -dir[0] * .0005 * dist;
      player.position.y += dir[1] * .0005 * dist;
      camera.position.x = player.position.x;
      camera.position.y = player.position.y;
    }

    for (var index = 0; index < agents.length; ++index) {
      var agent = agents[index];
      offset.set(0,0,0);

      // goto target
      dist = distNoSqrt(agent.position, agent.target);
      dir = vectorFrom(agent.position, agent.target);
      offset.x += dir[0]*dist * .05;
      offset.y += dir[1]*dist * .05;

      // avoid other
      for (var other = 0; other < agents.length; ++other) {
        if (other != index) {
          otherAgent = agents[other];
          dist = smoothstep(1., .5, distNoSqrt(agent.position, otherAgent.position));
          dir = vectorFrom(otherAgent.position, agent.position);
          offset.x += dir[0] * dist * .05;
          offset.y += dir[1] * dist * .05;
        }
      }

      otherAgent = player;
      dist = distNoSqrt(agent.position, otherAgent.position);
      dir = vectorFrom(otherAgent.position, agent.position);
      
      // recycle with teleporting
      if (dist > screenRangeNoSqrt) {
        agent.position.x = player.position.x - dir[0] * .95;
        agent.position.y = player.position.y - dir[1] * .95;
        agent.target.x = agent.position.x + .001;
        agent.target.y = agent.position.y + .001;
      }

      // avoid player
      dist = smoothstep(2., 1., dist);
      offset.x += dir[0] * dist * .1;
      offset.y += dir[1] * dist * .1;

      // inertia
      offset.multiplyScalar(.1);
      agent.velocity.add(offset);
      agent.velocity.multiplyScalar(.99);
      agent.position.add(agent.velocity);
    }

    renderer.render(scene, camera);
  }

  function onMove (x, y) {
    mouse.x = x;
    mouse.y = y;
  }

  function onClic (x, y) {
    mouse.x = x;
    mouse.y = y;
    mouse.clic = true;
    updateFrame(player, [1,4], [0,2]);
  }

  function onUnclic () {
    mouse.clic = false;
    updateFrame(player, [1,4], [0,1]);
  }

  function addAgent (count) {
    for (var index = 0; index < count; ++index) {
      var agent = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1,1),
        new THREE.MeshBasicMaterial({
          map: textures['cursor'],
          transparent: true,
        }));
      agent.position.x = (Math.random() * 2 - 1) * 5;
      agent.position.y = (Math.random() * 2 - 1) * 5;
      agent.target = new THREE.Vector3(agent.position.x + .0001, agent.position.y + .0001, agent.position.z);
      agent.velocity = new THREE.Vector3();
      updateFrame(agent, [1,4], [0,1]);
      scene.add(agent);
      agents.push(agent);
    }
  }

  function addColliders (count) {
    for (var index = 0; index < count; ++index) {
      var collider = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1,1),
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
      }));
      collider.position.x = (Math.random() * 2 - 1) * 5;
      collider.position.y = (Math.random() * 2 - 1) * 5;
      collider.scale.x = 2;
      collider.scale.y = 4;
      scene.add(collider);
      colliders.push(collider);
    }
  }

  function randomTarget () {
    for (var index = 0; index < agents.length; ++index) {
      var agent = agents[index];
      agent.target = new THREE.Vector3(
        player.position.x + (Math.random() * 2 - 1) * 5,
        player.position.y + (Math.random() * 2 - 1) * 5,
        agent.position.z);
    }
  }

  function updateFrame (mesh, slices, offset) {
    var uvs = mesh.geometry.attributes.uv.array;
    for (var index = 0; index < uvs.length; ++index) {
      uvs[index] = (defaultUV[index] + offset[index%2]) / slices[index%2];
    }
    mesh.geometry.attributes.uv.needsUpdate = true;
  }

  function onMouseMove (event) { onMove(event.clientX, event.clientY); }
  function onMouseDown (event) { onClic(event.clientX, event.clientY) }
  function onMouseUp (event)   { onUnclic(); }
  function onTouchMove (event) {
    event.preventDefault();
    onMove(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
  }
  function onTouchDown (event) {
    event.preventDefault();
    onClic(event.changedTouches[0].pageX, event.changedTouches[0].pageY);
  }
  function onTouchUp (event) {
    event.preventDefault();
    onUnclic();
  }

  function resize () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    screen = {
      width: width,
      height: height,
      center: { x: width / 2, y: height / 2 },
    };
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
  }
}