
var createTexture2d = require('gl-texture2d')

exports.Picture = function ( gl, imageURL )
{
	this.isReady = false
	this.texture = gl.createTexture()
	this.image = new Image()

	var self = this
	this.image.onload = function () 
	{
		// Texture Element
		self.texture = createTexture2d( gl, [ self.image.width, self.image.height ] )
		self.texture.setPixels( self.image )

		self.isReady = true
	}

	this.image.src = imageURL
}

exports.Video = function ( gl, domElement, videoURL )
{
	this.isReady = false
	this.domElement = domElement

	var self = this
	this.domElement.addEventListener(
		"canplaythrough", function () 
		{	
			if ( self.isReady == false )
			{
				// Video Element
				self.domElement.currentTime = Math.random() * self.domElement.duration
				self.domElement.play()

				// Texture Element
				self.texture = createTexture2d( gl, [ self.domElement.videoWidth , self.domElement.videoHeight ] )
				self.texture.setPixels( self.domElement )

				self.isReady = true
			}
		}
		, true
	)

	this.domElement.preload = "auto"
	this.domElement.loop = true
	this.domElement.muted = true
	this.domElement.src = videoURL

	this.update = function ()
	{
		this.texture.setPixels(this.domElement)
	}

	return this
}

  // "src/video/Depeche Mode - Enjoy The Silence (Low).mp4"
  // "src/video/Blip Standard Player - Found Footage Festival Pet Rock.mp4"