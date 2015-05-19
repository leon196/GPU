
var glslify  	= require('glslify')
var settings 	= require('./settings')

exports.Glitch = function ( gl, fileName )
{
	this.gl = gl

	// Shader Program
	this.program = glslify({
	    frag: '../shaders/gallery/1.frag',
	    vert: '../shaders/simple.vert'
	})(gl)

	// Attribute index for vertex position
	this.program.attributes.aPosition.location = 0

	this.program.bind()

	// Uniform index for buffer
	gl.uniform1i( gl.getUniformLocation( this.program.handle, "uBuffer" ), 0 )

	// Uniform index for picture
	gl.uniform1i( gl.getUniformLocation( this.program.handle, "uPicture" ), 4 )

	// Uniform index for video
	gl.uniform1i( gl.getUniformLocation( this.program.handle, "uVideo" ) , 7 )

	// Resolution
	this.program.bind()  
	this.program.uniforms.uResolution = [ settings.screen.width , settings.screen.height ]
	this.program.uniforms.uBufferResolution = [ settings.fbo.width , settings.fbo.height ]

	this.bind = function ()
	{
		this.program.bind()
	}

	this.update = function ( timeElapsed, mouseX, mouseY )
	{
	    this.program.uniforms.uMouse = [mouseX, mouseY]
	    this.program.uniforms.uTimeElapsed = timeElapsed
	}

	this.updateBuffer = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE0)
	    this.program.uniforms.uBuffer = sampler2D
	}

	this.updatePicture = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE4)
	    this.program.uniforms.uPicture = sampler2D
	}

	this.updateVideo = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE7)
	    this.program.uniforms.uVideo = sampler2D
	}

  	this.resize = function ()
  	{
	    this.program.bind()  
	    this.program.uniforms.uResolution = [ settings.screen.width , settings.screen.height ]
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