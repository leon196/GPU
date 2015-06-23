var glslify = require('glslify')
var settings        = require('./settings')


var menuContainerElement = document.getElementById('menu')
exports.menuContainerElement = menuContainerElement

///////////
// VIDEO //
///////////

var videoList = 
[ 
  { 
    title: 'VH1 Classic'
    , url: 'src/video/vh1.ogv' 
  }
  , { 
    title: 'Iron'
    , url: 'src/video/Iron.webm' 
  }
  , { 
    title: 'Dance Ozlem Kahraman'
    , url: 'src/video/DanceOzlemKahraman.mp4' 
  }
  // , { 
  //   title: 'Rock'
  //   , url: 'src/video/Rock.mp4' 
  // }
  , { 
    title: 'Depeche Mode'
    , url: 'src/video/DepecheMode.mp4' 
  }
]

// Create Menu Video
var videoListElement = document.createElement('SELECT')
for (var i = 0; i < videoList.length; ++i)
{
  var videoInfo = videoList[i]
  var option = document.createElement('option')
  option.text = videoInfo.title
  videoListElement.options.add(option)
  document.getElementById('menuVideo').appendChild(videoListElement)
}

exports.videoList = videoList
exports.videoListElement = videoListElement

exports.GetVideoURL = function ()
{
  return videoList[videoListElement.selectedIndex].url
}

// Video Control
var videoSlider = document.getElementById('sliderVideo')
exports.videoSlider = videoSlider

////////////
// SHADER //
////////////

var shaderList = 
[ 
  { 
    title: 'Planet'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Planet.frag')
  }
  , { 
    title: 'Hop'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Hop.frag')
  }
  , { 
    title: 'Color Direction'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Artefact3.frag')
  }
  , { 
    title: 'Fake Data Moshing'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Artefact1.frag')
  }
  , { 
    title: 'Pixel Expansion'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Artefact4.frag')
  }
  , { 
    title: 'Pixel Rain'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Artefact2.frag')
  }
  , { 
    title: 'Water Painting'
    , infos: 'Use mouse to change direction'
    , source: glslify(__dirname + '/../shaders/gallery/Painting1.frag')
  }
  , { 
    title: 'Edge Fire'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Fire1.frag')
  }
  , { 
    title: 'Full Fire'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Fire2.frag')
  }
  , { 
    title: 'Fire Walk With Me'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/FireWalkWithMe.frag')
  }
  , { 
    title: 'Hahein'
    , infos: ''
    , source: glslify(__dirname + '/../shaders/gallery/Hahein.frag')
  }
  // , { 
  //   title: 'Game Of Life'
  //   , infos: ''
  //   , source: glslify(__dirname + '/../shaders/gallery/GameOfLife.frag')
  // }
]

// Create Menu Shader
var shaderListElement = document.createElement('SELECT')
for (var i = 0; i < shaderList.length; ++i)
{
  var shaderInfo = shaderList[i]
  var option = document.createElement('option')
  option.text = shaderInfo.title
  shaderListElement.options.add(option)
  document.getElementById('menuShader').appendChild(shaderListElement)
}

exports.shaderList = shaderList
exports.shaderListElement = shaderListElement

exports.GetShaderSelected = function ()
{
  return shaderListElement.selectedIndex
}

exports.GetShaderInfo = function ()
{
  return shaderList[shaderListElement.selectedIndex].infos
}

exports.GetFragmentSource = function ()
{
  return shaderList[shaderListElement.selectedIndex].source
}


// Interaction

var buttonInteraction = document.getElementById('buttonInteraction')
buttonInteraction.addEventListener('click', function (e)
{
  exports.isInteractionEnabled = !exports.isInteractionEnabled

  if (exports.isInteractionEnabled)
  {
    exports.buttonInteraction.style.textDecoration = 'none'
  }
  else
  {
    exports.buttonInteraction.style.textDecoration = 'line-through'
  }
})

exports.buttonInteraction = buttonInteraction
exports.isInteractionEnabled = true


var MenuOption = function ( id, optionName )
{
  this.id = id
  this.optionName = optionName
  this.button = document.getElementById('button' + id)
  this.slider = document.getElementById('slider' + id)
  this.slider.value = 500
  this.isEnabled = true
  var self = this
  this.set = function (enable)
  {
    this.isEnabled = enable
    this.update()
  }
  this.toggle = function ()
  {
    this.isEnabled = !this.isEnabled
    this.update()
  }
  this.update = function ()
  {
    if (this.isEnabled)
    {
      this.slider.style.display = 'block'
      this.button.innerHTML = 'Disable ' + this.optionName
    }
    else
    {
      this.slider.style.display = 'none'
      this.button.innerHTML = 'Enable ' + this.optionName
    }
  }

  this.button.addEventListener('click', function (e)
  {
    self.toggle()
  })

  return this
}

// Shader Options
exports.buttonClear = document.getElementById('buttonClear')
exports.buttonBlur = document.getElementById('buttonBlur')
exports.buttonBlur.innerHTML = 'Enable Blur'
exports.isBlurEnabled = false;
exports.buttonBlur.addEventListener('click', function (e)
{
  exports.isBlurEnabled = !exports.isBlurEnabled

  if (exports.isBlurEnabled)
  {
    exports.buttonBlur.innerHTML = 'Disable Blur'
  }
  else
  {
    exports.buttonBlur.innerHTML = 'Enable Blur'
  }
})


exports.optionTreshold = new MenuOption('Treshold', 'Manual Treshold')
exports.optionRGBOffset = new MenuOption('RGB', 'RGB Offset')
exports.optionTreshold.set(true)
exports.optionRGBOffset.set(true)
// exports.optionRGBOffset.slider.value = 100

menuContainerElement.style.visibility = 'visible'

// Video
var buttonPlay = document.getElementById('buttonPlay')
exports.buttonPlay = buttonPlay
// Video
var buttonPause = document.getElementById('buttonPause')
exports.buttonPause = buttonPause

// Create Fbo Size
var bufferSizeList = [ 128, 256, 512, 1024 ]
var bufferSizeListElement = document.createElement('SELECT')
for (var i = 0; i < bufferSizeList.length; ++i)
{
  var videoInfo = bufferSizeList[i]
  var option = document.createElement('option')
  option.text = videoInfo
  bufferSizeListElement.options.add(option)
  document.getElementById('menuBufferSize').appendChild(bufferSizeListElement)
}

exports.bufferSizeList = bufferSizeList
exports.bufferSizeListElement = bufferSizeListElement
exports.bufferSizeListElement.selectedIndex = bufferSizeList.indexOf(settings.fbo.width)

exports.GetBufferSize = function ()
{
  return bufferSizeList[bufferSizeListElement.selectedIndex]
}