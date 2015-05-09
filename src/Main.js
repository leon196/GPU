
Engine.Setup();
requestAnimFrame( animate );

function animate ()
{
	requestAnimFrame( animate );
	Engine.Update();
}