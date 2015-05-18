
var glslify  = require('glslify')
var settings = require('./settings')

exports.Glitch = function ( gl )
{
	this.gl = gl

	// Shader Program
	this.glslify = glslify({
	    frag: '../shaders/glitch.frag',
	    vert: '../shaders/glitch.vert'
  	})(gl)

	// Attribute index for vertex position
	this.glslify.attributes.aPosition.location = 0

	this.glslify.bind()

	// Uniform index for buffer
	gl.uniform1i( gl.getUniformLocation( this.glslify.handle, "uBuffer" ), 0 )

	// Uniform index for picture
	gl.uniform1i( gl.getUniformLocation( this.glslify.handle, "uPicture" ), 4 )

	// Uniform index for video
	gl.uniform1i( gl.getUniformLocation( this.glslify.handle, "uVideo" ) , 7 )

	// Resolution
	this.glslify.bind()  
	this.glslify.uniforms.uResolution = [ settings.screen.width , settings.screen.height ]
	this.glslify.uniforms.uBufferResolution = [ settings.fbo.width , settings.fbo.height ]

	this.bind = function ()
	{
		this.glslify.bind()
	}

	this.update = function ( timeElapsed, mouseX, mouseY )
	{
	    this.glslify.uniforms.uMouse = [mouseX, mouseY]
	    this.glslify.uniforms.uTimeElapsed = timeElapsed
	}

	this.updateBuffer = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE0)
	    this.glslify.uniforms.uBuffer = sampler2D
	}

	this.updatePicture = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE4)
	    this.glslify.uniforms.uPicture = sampler2D
	}

	this.updateVideo = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE7)
	    this.glslify.uniforms.uVideo = sampler2D
	}

  	this.resize = function ()
  	{
	    this.glslify.bind()  
	    this.glslify.uniforms.uResolution = [ settings.screen.width , settings.screen.height ]
  	}

  	return this
}

exports.Simple = function ( gl )
{
	this.glslify = glslify({
	    frag: '../shaders/simple.frag',
	    vert: '../shaders/simple.vert'
	})(gl)

	this.bind = function ()
	{
		this.glslify.bind()
	}

	this.updateBuffer = function ( sampler2D )
	{
		this.glslify.uniforms.uBuffer = sampler2D
	}

	return this
}