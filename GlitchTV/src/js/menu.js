
var menuContainerElement = document.getElementById('menu')
exports.menuContainerElement = menuContainerElement

///////////
// VIDEO //
///////////

var videoList = 
[ 
  { 
    title: 'Depeche Mode'
    , url: 'src/video/Depeche Mode - Enjoy The Silence (Low).mp4' 
  }
  , { 
    title: 'Dance Ozlem Kahraman'
    , url: 'src/video/Dance from ozlem kahraman from vimeo.mp4' 
  }
  , { 
    title: 'Iron'
    , url: 'src/video/Iron.webm' 
  }
  // , { 
  //   title: 'Vince Mcmahons'
  //   , url: 'src/video/vince.ogv' 
  // }
  , { 
    title: 'VH1 Classic'
    , url: 'src/video/vh1.ogv' 
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
    title: 'Laplacian Fire'
    , infos: ''
  }
  , { 
    title: 'Lossy Data'
    , infos: ''
  }
  , { 
    title: 'Pixel Rain'
    , infos: ''
  }
  , { 
    title: 'Painting'
    , infos: 'Use mouse to change direction'
  }
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

exports.optionTreshold = new MenuOption('Treshold', 'Manual Treshold')
exports.optionRGBOffset = new MenuOption('RGB', 'RGB Offset')
exports.optionTreshold.set(false)
exports.optionRGBOffset.set(false)

menuContainerElement.style.visibility = 'visible'
