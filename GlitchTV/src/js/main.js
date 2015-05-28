
var canvas          = document.body.appendChild(document.createElement('canvas'))
var shell	          = require('gl-now')()
var createFBO       = require('gl-fbo')
var glslify         = require('glslify')
var GIF             = require('gl-gif')
var now             = require('right-now')
var fillScreen      = require('a-big-triangle')
var ndarray   = require("ndarray")
var fill    = require("ndarray-fill")
var shader          = require('./shader')
var data            = require('./data')
var color           = require('./color')
var menu            = require('./menu')
var settings        = require('./settings')

window.addEventListener('resize', function (e)
{
  require('canvas-fit')(canvas)

  settings.screen.width = window.innerWidth
  settings.screen.height = window.innerHeight

  glitchShader.resize()
}, false)

var glitchShader, simpleShader
var fboList, current = 0
var picture, video
var shouldClearBuffer
var isTicking = true

shell.on('gl-init', function ()
{
  var gl = shell.gl

  // Picture
  picture = new data.Picture( gl, 'src/img/image.jpg' )

  // Video
  video = new data.Video( gl, document.getElementById('video'), menu.GetVideoURL() )

  // Glitch
  glitchShader = new shader.Glitch(gl, menu.GetFragmentSource())
  menu.buttonInteraction.innerHTML = menu.GetShaderInfo()

  // Draw Shader
  simpleShader = new shader.Simple(gl)

  //Allocate buffers
  fboList = [ createFBO(gl, [settings.fbo.width, settings.fbo.height]), createFBO(gl, [settings.fbo.width, settings.fbo.height]) ]

  //Initialize fboList buffer
  fboList[0].color[0].setPixels( color.Black )

  // Keyboard
  shell.bind('restart', 'R')
  shell.bind('nextTick', 'N')

  // Menu Video
  menu.videoListElement.addEventListener('change', function()
  {
    video = new data.Video( gl, document.getElementById('video'), menu.GetVideoURL() )
  })

  // Menu Shader
  menu.shaderListElement.addEventListener('change', function()
  {
    glitchShader.rebuild(menu.GetFragmentSource())
    menu.buttonInteraction.innerHTML = menu.GetShaderInfo()
  })

  menu.bufferSizeListElement.addEventListener('change', function()
  {
    settings.fbo = { width: menu.GetBufferSize(), height: menu.GetBufferSize() }
    fboList = [ createFBO(gl, [settings.fbo.width, settings.fbo.height]), createFBO(gl, [settings.fbo.width, settings.fbo.height]) ]
    glitchShader.resize()
    simpleShader.resize()
  })

  // Video Control
  menu.videoSlider.addEventListener('click', function (e)
  {
  })

  menu.videoSlider.addEventListener('change', function (e)
  {
    video.domElement.currentTime = Math.floor(video.domElement.duration * menu.videoSlider.value / 1000)
  })

  // Clear
  menu.buttonClear.addEventListener('click', function (e)
  {
    shouldClearBuffer = true
  })

  //
  menu.buttonPlay.addEventListener('click', function (e)
  {
    video.domElement.play()
  })

  //
  menu.buttonPause.addEventListener('click', function (e)
  {
    video.domElement.pause()
  })

  // 
  gl.disable(gl.DEPTH_TEST)
})
      
      var hop = ndarray( 
      new Uint8Array ( settings.fbo.width * settings.fbo.height * 4 )
      , [ settings.fbo.width , settings.fbo.height , 4 ] )

      fill( hop, function(x,y,c) 
      {
      if (c === 3) return 255
      return Math.floor(Math.random() * 255)
      })

shell.on('tick', function() 
{
  if (picture.isReady && video.isReady) 
  {
    var gl = shell.gl

    if (isTicking || shell.wasDown('nextTick'))
    {
      var previousFbo = fboList[current]
      var currentFbo = fboList[current ^= 1]

      if(shouldClearBuffer || shell.wasDown('restart')) 
      {
        shouldClearBuffer = false
        previousFbo.color[0].setPixels( color.Black )
      } 

      currentFbo.bind()
      glitchShader.bind()  


      glitchShader.updateBuffer( previousFbo.color[0].bind() )
      glitchShader.updatePicture( picture.texture.bind() )
      glitchShader.updateVideo( video.texture.bind() )

      glitchShader.update( now() / 1000, menu, shell.mouseX, shell.mouseY )
      
      glitchShader.updateTreshold( menu.optionTreshold )
      glitchShader.updateRGBOffset( menu.optionRGBOffset )

    fillScreen( gl )
    }
  }
})

shell.on('gl-render', function (t)
{
  var gl = shell.gl

  if (picture.isReady && video.isReady) 
  {
    video.update()

      // Render contents of buffer to screen
      simpleShader.bind()
      simpleShader.update( menu )
      simpleShader.updateVideo( video.texture.bind() )
      simpleShader.updateBuffer( fboList[current].color[0].bind() )
      fillScreen(gl)
  }
  else
  {
    // Show html background
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }
})

shell.on('gl-error', function (e)
{
  throw new Error('WebGL not supported :(')
})


