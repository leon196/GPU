
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
    title: 'Depeche Mode'
    , url: 'src/video/Depeche Mode - Enjoy The Silence (Low).mp4' 
  }
  , { 
    title: 'Vince Mcmahons'
    , url: 'src/video/vince.ogv' 
  }
  , { 
    title: 'Dance Ozlem Kahraman'
    , url: 'src/video/Dance from ozlem kahraman from vimeo.mp4' 
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

////////////
// SHADER //
////////////

var shaderList = 
[ 
  { 
    title: 'Liquid Painting'
    , infos: 'Interaction<br/>Mouse to change force direction'
  }
  , { 
    title: 'Fake Data Moshing'
    , infos: ''
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

exports.GetShaderSelected = function ()
{
  return shaderListElement.selectedIndex
}

exports.GetShaderInfo = function ()
{
  return shaderList[shaderListElement.selectedIndex].infos
}

exports.shaderList = shaderList
exports.shaderListElement = shaderListElement
exports.shaderInfoElement = document.getElementById('infoShader')

var videoTresholdSlider = document.getElementById('videoTresholdSlider')
var autoTresholdCheckbox = document.getElementById('autoTresholdCheckbox')

function toggleSlider ()
{
  if (autoTresholdCheckbox.checked)
  {
    videoTresholdSlider.style.display = 'none'
  }
  else
  {
    videoTresholdSlider.style.display = 'block'
  }
}

autoTresholdCheckbox.checked = true
videoTresholdSlider.value = 50
toggleSlider()

autoTresholdCheckbox.addEventListener('change', function (e)
{
  toggleSlider()
})

exports.videoTresholdSlider = videoTresholdSlider
exports.autoTresholdCheckbox = autoTresholdCheckbox

menuContainerElement.style.visibility = 'visible'
