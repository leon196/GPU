
    // "prepublish": "browserify src/js/main.js | uglifyjs -cm > bundle.min.js"

var canvas        = document.body.appendChild(document.createElement('canvas'))
var shell	        = require("gl-now")()
var now           = require('right-now')
var mat4          = require('gl-mat4')
var glslify       = require('glslify')
var createBuffer  = require('gl-buffer')
var createTexture2d = require('gl-texture2d')
var createFBO     = require("gl-fbo")
var ndarray       = require("ndarray")
var fill          = require("ndarray-fill")
var fillScreen    = require("a-big-triangle")
var baboon        = require("baboon-image")
var engine        = require('./engine')

var buffer, shaderUpdate, shaderDraw
var fboList, current = 0
var texture, picture, textureVideo, uPicture
var textureReady = false
var videoReady = false
var videoElement = document.getElementById('video')
var intervalID

shell.on("gl-init", function ()
{
  var gl = shell.gl

  gl.disable(gl.DEPTH_TEST)

  engine.hello()

  shaderUpdate = glslify({
    frag: '../shaders/shader.frag',
    vert: '../shaders/shader.vert'
  })(gl)

  shaderDraw = glslify({
    frag: '../shaders/draw.frag',
    vert: '../shaders/draw.vert'
  })(gl)

  //Allocate buffers

  var width = 512
  var height = 512

  fboList = [ createFBO(gl, [width, height]), createFBO(gl, [width, height]) ]

  //Initialize fboList buffer
  var initial_conditions = ndarray(new Uint8Array(width*height*4), [width, height, 4])
  fill(initial_conditions, function(x,y,c) {
    if(c === 3) {
      return 255
    }
    return 0
  //   return Math.random() > 0.9 ? 255 : 0
  })
  fboList[0].color[0].setPixels(initial_conditions)


  //Set up vertex pointers
  shaderDraw.attributes.aPosition.location = shaderUpdate.attributes.aPosition.location = 0

  // http://learningwebgl.com/blog/?p=507
  var picture = gl.createTexture()
  picture.image = new Image()
  picture.image.onload = function() {
    texture = createTexture2d(gl, [picture.image.width, picture.image.height])
    texture.setPixels(picture.image)

    // fboList[0].color[0].setPixels(picture.image)

    shaderUpdate.bind()    
    uPicture = gl.getUniformLocation(shaderUpdate.handle, "uPicture")
    gl.uniform1i(uPicture, 4)

    shaderUpdate.uniforms.uPicture = texture.bind()
    textureReady = true
  }

  picture.image.src = "src/img/image.png"

  videoElement.addEventListener("canplaythrough", startVideo, true)
  videoElement.addEventListener("ended", videoDone, true)
  video.preload = "auto"
  video.loop = true
  videoElement.src = "src/vh1.ogv"

  // console.log(shell)
})

function startVideo() 
{
  var gl = shell.gl
  videoElement.play()
  // console.log("hi")
  shaderUpdate.bind()    
  var uVideo = gl.getUniformLocation(shaderUpdate.handle, "uVideo")
  gl.uniform1i(uVideo, 7)
  textureVideo = createTexture2d(gl, [videoElement.videoWidth, videoElement.videoHeight])
  textureVideo.setPixels(videoElement)
  shaderUpdate.uniforms.uVideo = textureVideo.bind()
  videoReady = true
    // fboList[0].color[0].setPixels(videoElement)
}
function videoDone() {
}



shell.on("gl-error", function (e)
{
  throw new Error("WebGL not supported :(")
})

shell.on("tick", function() {
  var gl = shell.gl
  var prevState = fboList[current]
  var curState = fboList[current ^= 1]

  //Switch to fboList fbo
  curState.bind()

  //Run update shader
  shaderUpdate.bind()    
  gl.activeTexture(gl.TEXTURE0)
  shaderUpdate.uniforms.uFramebuffer = prevState.color[0].bind()
  gl.activeTexture(gl.TEXTURE4)
  if (textureReady) shaderUpdate.uniforms.uPicture = texture.bind()
  gl.activeTexture(gl.TEXTURE7)
  if (videoReady) shaderUpdate.uniforms.uVideo = textureVideo.bind()
  shaderUpdate.uniforms.uResolution = [window.innerWidth, window.innerHeight]
  shaderUpdate.uniforms.uMouse = [shell.mouseX, shell.mouseY]
  shaderUpdate.uniforms.uTimeElapsed = now()
  fillScreen(gl)

})

shell.on("gl-render", function (t)
{
  var gl = shell.gl

  if (videoReady) textureVideo.setPixels(videoElement)

  //Render contents of buffer to screen
  shaderDraw.bind()
  shaderDraw.uniforms.uBuffer = fboList[current].color[0].bind()
  fillScreen(gl)

})

/*
var triangleMatrix   = mat4.create()
var squareMatrix     = mat4.create()
var projectionMatrix = mat4.create()

var triangle = {
  vertices: glBuffer(gl, new Float32Array([
    +0.0, +1.0, +0.0,
    -1.0, -1.0, +0.0,
    +1.0, -1.0, +0.0
  ])),
  colors: glBuffer(gl, new Float32Array([
    +0.0, +0.0, +0.0,
    +0.0, +1.0, +0.0,
    +0.0, +0.0, +1.0
  ])),
  length: 3
}

var square = {
  vertices: glBuffer(gl, new Float32Array([
    +1.0, +1.0, +0.0,
    -1.0, +1.0, +0.0,
    +1.0, -1.0, +0.0,
    -1.0, -1.0, +0.0
  ])),
  colors: glBuffer(gl, new Float32Array([
    +0.5, +0.5, +1.0,
    +0.5, +0.5, +1.0,
    +0.5, +0.5, +1.0,
    +0.5, +0.5, +1.0
  ])),
  length: 4
}

var currTime = now()
var lastTime = now()
var rSquare  = 0.5
var rTri     = 0.5
var elapsed  = 0
function animate() {
  currTime = now()
  elapsed  = currTime - lastTime

  lastTime = currTime
  rTri += (90 * elapsed) / 15000
  rSquare += (75 * elapsed) / 15000
}

function render() {
  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  animate()

  // Clear the screen and set the viewport before
  // drawing anything
  clear(gl)
  gl.viewport(0, 0, width, height)

  // Calculate projection matrix
  mat4.perspective(projectionMatrix, Math.PI / 4, width / height, 0.1, 100)
  // Calculate triangle's modelView matrix
  mat4.identity(triangleMatrix)
  mat4.translate(triangleMatrix, triangleMatrix, [-1.5, 0, -7])
  mat4.rotate(triangleMatrix, triangleMatrix, rTri, [0, 1, 0])
  // Calculate squares's modelView matrix
  mat4.identity(squareMatrix)
  mat4.translate(squareMatrix, squareMatrix, [1.5, 0, -7])
  mat4.rotate(squareMatrix, squareMatrix, rSquare, [1, 0, 0])

  // Bind the shader
  shader.bind()
  shader.uniforms.uProjection = projectionMatrix

  // Draw the triangle
  shader.uniforms.uModelView = triangleMatrix
  triangle.vertices.bind()
  shader.attributes.aPosition.pointer()
  triangle.colors.bind()
  shader.attributes.aColor.pointer()
  gl.drawArrays(gl.TRIANGLES, 0, triangle.length)

  // Draw the square
  shader.uniforms.uModelView = squareMatrix
  square.vertices.bind()
  shader.attributes.aPosition.pointer()
  square.colors.bind()
  shader.attributes.aColor.pointer()
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}
*/
// Resize the canvas to fit the screen
window.addEventListener('resize'
  , require('canvas-fit')(canvas)
  , false
)
