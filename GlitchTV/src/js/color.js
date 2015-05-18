
var ndarray 	= require("ndarray")
var fill 		= require("ndarray-fill")
var settings 	= require("./settings")

var black = ndarray( 
	new Uint8Array ( settings.fbo.width * settings.fbo.height * 4 )
	, [ settings.fbo.width , settings.fbo.height , 4 ] )

fill( black, function(x,y,c) 
{
	if (c === 3) return 255
	return 0
})

exports.Black = black

