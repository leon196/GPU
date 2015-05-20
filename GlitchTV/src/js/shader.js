
var createShader 	= require('gl-shader')
var glslify  		= require('glslify')
var settings 		= require('./settings')

exports.Glitch = function ( gl, fragmentSource )
{
	this.gl = gl

	// Shader Program
	this.shader = createShader(gl
		, glslify(__dirname + '/../shaders/simple.vert')
		, fragmentSource)

	this.setup = function ()
	{
		// Attribute
		this.shader.attributes.aPosition.location = 0

		this.shader.bind()

		// Uniform index for buffer
		gl.uniform1i( gl.getUniformLocation( this.shader.program, "uBuffer" ), 0 )

		// Uniform index for picture
		gl.uniform1i( gl.getUniformLocation( this.shader.program, "uPicture" ), 4 )

		// Uniform index for video
		gl.uniform1i( gl.getUniformLocation( this.shader.program, "uVideo" ) , 7 )

		// Resolution
		gl.uniform2fv(gl.getUniformLocation(this.shader.program, "uBufferResolution" ), new Float32Array([ settings.fbo.width , settings.fbo.height ]))
		gl.uniform2fv(gl.getUniformLocation(this.shader.program, "uResolution" ), new Float32Array([ settings.screen.width , settings.screen.height ]))
	}

	this.bind = function ()
	{
		this.shader.bind()
	}

	this.rebuild = function ( fragmentSource )
	{
		this.shader.update(glslify(__dirname + '/../shaders/simple.vert'), fragmentSource)
		this.setup()
	}

	this.update = function ( timeElapsed, isInteractionEnabled, mouseX, mouseY )
	{
	    this.shader.uniforms.uMouse = [mouseX, mouseY]
	    this.shader.uniforms.uInteractionEnabled = isInteractionEnabled ? 1 : 0
	    this.shader.uniforms.uTimeElapsed = timeElapsed
	}

    this.updateTreshold = function ( menuOption )
    {
    	this.shader.uniforms.uEnableTresholdAuto = menuOption.isEnabled ? 0 : 1
    	this.shader.uniforms.uSliderTreshold = menuOption.slider.value / 100
    }

    this.updateRGBOffset = function ( menuOption )
    {
    	this.shader.uniforms.uEnableRGBOffset = menuOption.isEnabled ? 1 : 0
    	this.shader.uniforms.uSliderRGBOffset = menuOption.slider.value / 100
    }

	this.updateBuffer = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE0)
	    this.shader.uniforms.uBuffer = sampler2D
	}

	this.updatePicture = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE4)
	    this.shader.uniforms.uPicture = sampler2D
	}

	this.updateVideo = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE7)
	    this.shader.uniforms.uVideo = sampler2D
	}

  	this.resize = function ()
  	{
	    this.shader.bind()  
	    this.shader.uniforms.uResolution = [ settings.screen.width , settings.screen.height ]
  	}

	this.setup()

  	return this
}

exports.Simple = function ( gl )
{
	this.glslify = createShader(gl
		, glslify(__dirname + '/../shaders/simple.vert')
		, glslify(__dirname + '/../shaders/simple.frag'))

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