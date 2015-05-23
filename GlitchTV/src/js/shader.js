
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
		gl.uniform1i( gl.getUniformLocation( this.shader.program, "fbo" ), 0 )

		// Uniform index for picture
		gl.uniform1i( gl.getUniformLocation( this.shader.program, "picture" ), 4 )

		// Uniform index for video
		gl.uniform1i( gl.getUniformLocation( this.shader.program, "video" ) , 7 )

		// Resolution
		gl.uniform2fv(gl.getUniformLocation(this.shader.program, "bufferSize" ), new Float32Array([ settings.fbo.width , settings.fbo.height ]))
		gl.uniform2fv(gl.getUniformLocation(this.shader.program, "screenSize" ), new Float32Array([ settings.screen.width , settings.screen.height ]))

		// Uniform laplacian filter
		// From Anton Roy -> https://www.shadertoy.com/view/Xs23DG
		var uLaplacianFilter5x5 = [
			-1,-1,-1,-1,-1,
			-1,-1,-1,-1,-1, 
			-1,-1,24,-1,-1, 
			-1,-1,-1,-1,-1, 
			-1,-1,-1,-1,-1];
		gl.uniform1fv(gl.getUniformLocation(this.shader.program, "filter5x5"), new Float32Array(uLaplacianFilter5x5));

		// http://homepages.inf.ed.ac.uk/rbf/HIPR2/log.htm
		var uLaplacianFilter9x9 = [
			0,1,1,2,2,2,1,1,0,
			1,2,4,5,5,5,4,2,1,
			1,4,5,3,0,3,5,4,1,
			2,5,3,-12,-24,-12,3,5,2,
			2,5,0,-24,-40,-24,0,5,2,
			2,5,3,-12,-24,-12,3,5,2,
			1,4,5,3,0,3,5,4,1,
			1,2,4,5,5,5,4,2,1,
			0,1,1,2,2,2,1,1,0];
		gl.uniform1fv(gl.getUniformLocation(this.shader.program, "filter9x9"), new Float32Array(uLaplacianFilter9x9));

		//
		// var uBlurFilter5x5 = [
		// 	0.0,0.05,0.05,0.05,0.0,
		// 	0.05,0.1,0.1,0.1,0.05, 
		// 	0.05,0.1,0.2,0.1,0.05, 
		// 	0.05,0.1,0.1,0.1,0.05, 
		// 	0.0,0.05,0.05,0.05,0.0];
		// gl.uniform1fv(gl.getUniformLocation(this.shader.program, "uBlurFilter5x5"), new Float32Array(uBlurFilter5x5));
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
	    this.shader.uniforms.mouse = [mouseX, mouseY]
	    this.shader.uniforms.isInteractive = 1
	    this.shader.uniforms.isAutomatic = 0
	    this.shader.uniforms.time = timeElapsed
	}

    this.updateTreshold = function ( menuOption )
    {
    	this.shader.uniforms.sliderTreshold = menuOption.slider.value / 1000
    }

    this.updateRGBOffset = function ( menuOption )
    {
    	this.shader.uniforms.sliderRGBOffset = menuOption.slider.value / 1000
    }

	this.updateBuffer = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE0)
	    this.shader.uniforms.fbo = sampler2D
	}

	this.updatePicture = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE4)
	    this.shader.uniforms.picture = sampler2D
	}

	this.updateVideo = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE7)
	    this.shader.uniforms.video = sampler2D
	}

  	this.resize = function ()
  	{
	    this.shader.bind()  
	    this.shader.uniforms.screenSize = [ settings.screen.width , settings.screen.height ]
  	}

	this.setup()

  	return this
}

exports.Simple = function ( gl )
{
	this.gl = gl
	this.shader = createShader(gl
		, glslify(__dirname + '/../shaders/simple.vert')
		, glslify(__dirname + '/../shaders/simple.frag'))

	this.shader.attributes.aPosition.location = 0

	this.shader.bind()

	// Uniform index for buffer
	gl.uniform1i( gl.getUniformLocation( this.shader.program, "uBuffer" ), 1 )

	// Uniform index for video
	gl.uniform1i( gl.getUniformLocation( this.shader.program, "uVideo" ) , 6 )

	this.bind = function ()
	{
		this.shader.bind()
	}

	this.updateBuffer = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE1)
		this.shader.uniforms.uBuffer = sampler2D
	}

	this.updateVideo = function ( sampler2D )
	{
	    this.gl.activeTexture(this.gl.TEXTURE6)
		this.shader.uniforms.uVideo = sampler2D
	}

	return this
}