
var canvas          = document.body.appendChild(document.createElement('canvas'))
var shell	          = require('gl-now')()
var createFBO       = require('gl-fbo')
var glslify         = require('glslify')
var now             = require('right-now')
var fillScreen      = require('a-big-triangle')
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
  }
  , false
)

var glitchShader, simpleShader
var fboList, current = 0
var picture, video
var shouldClearBuffer

var menuElement

shell.on('gl-init', function ()
{
  var gl = shell.gl

  // Picture
  picture = new data.Picture( gl, 'src/img/image.jpg' )

  // Video
  video = new data.Video( gl, document.getElementById('video'), menu.GetVideoURL() )

  // Glitch
  glitchShader = new shader.Glitch(gl, glslify(__dirname + '/../shaders/gallery/Painting1.frag'))
  menu.buttonInteraction.innerHTML = menu.GetShaderInfo()

  // Draw Shader
  simpleShader = new shader.Simple(gl)

  //Allocate buffers
  fboList = [ createFBO(gl, [settings.fbo.width, settings.fbo.height]), createFBO(gl, [settings.fbo.width, settings.fbo.height]) ]

  //Initialize fboList buffer
  fboList[0].color[0].setPixels( color.Black )

  // Keyboard
  shell.bind('restart', 'R')

  // Menu Video
  menu.videoListElement.addEventListener('change', function()
  {
    video = new data.Video( gl, document.getElementById('video'), menu.GetVideoURL() )
  })

  // Menu Shader
  menu.shaderListElement.addEventListener('change', function()
  {
    switch (menu.GetShaderSelected())
    {
      case 0: 
        glitchShader.rebuild(glslify(__dirname + '/../shaders/gallery/Painting1.frag')) 
        break
      case 1: 
        glitchShader.rebuild(glslify(__dirname + '/../shaders/gallery/Artefact1.frag')) 
        break
      case 2: 
        glitchShader.rebuild(glslify(__dirname + '/../shaders/gallery/Artefact2.frag')) 
        break
    }
    menu.buttonInteraction.innerHTML = menu.GetShaderInfo()
  })

  // Clear
  menu.buttonClear.addEventListener('click', function (e)
  {
    shouldClearBuffer = true
  })

  gl.disable(gl.DEPTH_TEST)
})

shell.on('tick', function() 
{
  if (picture.isReady && video.isReady) 
  {
    var gl = shell.gl
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

    glitchShader.update( now(), menu.isInteractionEnabled, shell.mouseX, shell.mouseY )
    
    glitchShader.updateTreshold( menu.optionTreshold )
    glitchShader.updateRGBOffset( menu.optionRGBOffset )

    fillScreen( gl )
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


