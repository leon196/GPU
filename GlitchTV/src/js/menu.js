
///////////
// VIDEO //
///////////

var videoList = 
[ 
  { 
    title: "VH1"
    , url: "src/video/vh1.ogv" 
  }
  , { 
    title: "Dance"
    , url: "src/video/Dance from ozlem kahraman from vimeo.mp4" 
  }
  , { 
    title: "Vince"
    , url: "src/video/vince.ogv" 
  }
]

// Create Menu Video
var videoListElement = document.createElement("SELECT")
for (var i = 0; i < videoList.length; ++i)
{
  var videoInfo = videoList[i]
  var option = document.createElement("option")
  option.text = videoInfo.title
  videoListElement.options.add(option)
  document.getElementById("menuVideo").appendChild(videoListElement)
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
    title: "1"
    , name: "../shaders/gallery/1" 
  }
]

// Create Menu Shader
var shaderListElement = document.createElement("SELECT")
for (var i = 0; i < shaderList.length; ++i)
{
  var shaderInfo = shaderList[i]
  var option = document.createElement("option")
  option.text = shaderInfo.title
  shaderListElement.options.add(option)
  document.getElementById("menuShader").appendChild(shaderListElement)
}

exports.shaderList = shaderList
exports.shaderListElement = shaderListElement